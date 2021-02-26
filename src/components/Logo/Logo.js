import React from 'react';
import Tilt from 'react-tilt'; //https://www.npmjs.com/package/react-tilt
import logoIMG from './brain(2).png'
import './Logo.css'

const Logo = () => {
    return (
        <div className='ma4 mt0'>
            <Tilt className="Tilt br2 shadow-2" options={{ max : 35 }} style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner pa3">
                    <img src={logoIMG} alt='brain logo'style={{paddingTop: '5px'}}/>
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;