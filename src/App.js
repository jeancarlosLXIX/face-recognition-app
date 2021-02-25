// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import Navegation from './components/Navegation/Navegation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai'
import './App.css';

const app = new Clarifai.App({
    apiKey: 'you know where it is'
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
            box: {}
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

        
    

    render() {
        return (
            <div className="App">
                <Particles params={paramsOptions} className="particles" />
                <Navegation />
                <Logo />
                <Rank />
                <ImageLinkForm
                    onInputChange={this.onInputChange}
                    submitButton={this.submitButton}
                />

                <FaceRecognition imageURL={this.state.imageURL} box={this.state.box}/>
            </div>
        );
    }
}

export default App;
