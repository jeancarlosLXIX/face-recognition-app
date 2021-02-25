import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, submitButton}) => {
    return (
        <div>
           <p className='f3'>
               {'This magic will detect faces'}
           </p>
           <div className='center'>
               <div className= 'form center pa4 br3 shadow-5'>
               <input type='text' placeholder='Please paste link here' className='f4 pa2 center w-70' onChange={onInputChange}/>
               <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-green'
               onClick={submitButton}
               >Detect</button>
               </div>
           </div>
        </div>
        
    )
}

export default ImageLinkForm;