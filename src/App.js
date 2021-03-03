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
import Clarifai from 'clarifai'
import './App.css';

const app = new Clarifai.App({
    
})

const paramsOptions = {
    "particles": {
        "number": {
            "value": 160,
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
            "speed": 3,
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

/* Particles maybe will be delete, I'll see later*/

class App extends Component {
    constructor() {
        super()
        this.state = {
            input: '',
            imageURL: '',
            box: {},
            route: 'signin',
            isSignIn: false
        };
    };

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
        app.models
        .predict(
        Clarifai.FACE_DETECT_MODEL, 
        this.state.input)
        .then(responde => this.displayFaceBox(this.calculeteFaceLocation(responde)))
        .catch(err => console.log(err))
    }

        onRouteChange = (route) => {
            if(route === 'signout'){
                this.setState({isSignIn: false})
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
                <Rank />
                <ImageLinkForm
                    onInputChange={this.onInputChange}
                    submitButton={this.submitButton}
                />
                <FaceRecognition imageURL={imageURL} box={box}/>
                </div>
                
                : (
                    route === 'signin'
                    ?<Signin onRouteChange={this.onRouteChange}/>
                    :<Register onRouteChange={this.onRouteChange}/>
                )
                //because there are multiple elements we use return them in a div 
                } 
            </div>
        );
    }
}

export default App;
