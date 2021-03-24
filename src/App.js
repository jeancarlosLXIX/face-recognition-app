// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import Navegation from './components/navegation/Navegation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Registrer';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';

import './App.css';



const paramsOptions = {
    "particles": {
        "number": {
            "value": 80,
            "density": {
                "enable": false
            }
        },
        "size": {
            "value": 5,
            "random": true,
            "anim": {
                "speed": 4,
                "size_min": 0.3
            }
        },
        "line_linked": {
            "enable": false
        },
        "move": {
            "random": true,
            "speed": 5,
            "direction": "top",
            "out_mode": "out"
        }
    },
    "interactivity": {
        "events": {
            "onhover": {
                "enable": true,
                "mode": "bubble"
            },
            "onclick": {
                "enable": true,
                "mode": "repulse"
            }
        },
        "modes": {
            "bubble": {
                "distance": 250,
                "duration": 2,
                "size": 0,
                "opacity": 0
            },
            "repulse": {
                "distance": 400,
                "duration": 4
            }
        }
    }
}

const initialState = {
        input: '',
        imageURL: '',
        box: {},
        route: 'signin',
        isSignIn: false,
        user: {
            id: '',
            name: '',
            email: '',
            password: '',
            entries: 0,
            joined: ''
        }
    };

class App extends Component {
    constructor() {
        super()
        this.state = initialState;
    };

    loadUser = data =>{
        this.setState({user:{
                id: data.id,
                name: data.name,
                email: data.email,
                password: data.password,
                entries: data.entries,
                joined: data.joined
        }})
    }

    calculeteFaceLocation = data => {
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('inputimage');
        const width = Number(image.width); //to ensure it is a number
        const height = Number(image.height);

        return {
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - (clarifaiFace.right_col * width),
            bottomRow: height - (clarifaiFace.bottom_row * height),
        }
    }

    displayFaceBox = (box) => {
        console.log(box);
        this.setState({box})

    }

    onInputChange = (event) => {
        this.setState({input: event.target.value})
    }

    submitButton = () => {
        this.setState({imageURL: this.state.input})
        fetch('https://immense-meadow-46158.herokuapp.com/imageurl',{
                method: 'post',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    input: this.state.input
                })
            })
        .then(response => response.json())
        .then(responde => {
            fetch('https://immense-meadow-46158.herokuapp.com/image',{
                method: 'put',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    id: this.state.user.id
                })
            })
            .then(response => response.json())
            .then(count => {
                console.log('this is count: ', count);
                return this.setState(Object.assign(this.state.user, {entries: count}))
            })
            this.displayFaceBox(this.calculeteFaceLocation(responde))
        })
        .catch(err => console.log(err))
    }

        onRouteChange = (route) => {
            if(route === 'signout'){
                this.setState(initialState)
            } else if(route === 'home'){
                this.setState({isSignIn: true})
            }
            this.setState({route: route})
        }
    

    render() {
        //to make our code clean here we'll use destructuring so we don't need to use this.state.propertyName
       const  {imageURL, box, isSignIn, route} = this.state;
        return (
            <div className="App">
                <Particles params={paramsOptions} className="particles" />
                <Navegation 
                isSignIn={isSignIn}
                onRouteChange={this.onRouteChange}/>
                { route === 'home'
                ? <div> 
                <Logo />
                <Rank name={this.state.user.name} entries={this.state.user.entries}/>
                <ImageLinkForm
                    onInputChange={this.onInputChange}
                    submitButton={this.submitButton}
                />
                <FaceRecognition imageURL={imageURL} box={box}/>
                </div>
                
                : (
                    route === 'signin'
                    ?<Signin onRouteChange={this.onRouteChange}  loadUser={this.loadUser}/>
                    :<Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
                )
                //because there are multiple elements we use return them in a div 
                } 
            </div>
        );
    }
}

export default App;
