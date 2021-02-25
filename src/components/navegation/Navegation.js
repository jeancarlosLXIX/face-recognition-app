import React from 'react';

const Navegation = ({onRouteChange}) => {
    return (
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
            <p className='f3 link dim black underline pa3 pointer' 
            onClick={() => onRouteChange('signin')}>Sign Out</p>
        </nav>
    )
}

export default Navegation