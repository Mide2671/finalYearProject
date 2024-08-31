import  axios from 'axios'
import backgroundImage from '../assets/image/bg.jpg';
import  { useState, useEffect } from 'react';


function Main() {
 const [buttonStatus, setButtonStatus] = useState('Start Tracking')
 let h = {data :"lets kill the president"}
 
  return (
    <>

   <div className="relative h-96">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div> {/* Semi-transparent black overlay */}
      
      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
        <h1 className="text-5xl tracking-widest text-center logo md:text-8xl">DwSrapper</h1>
        <h2 className="mt-5 text-center text-xl w- tracking-wider md:text-3xl">Stay Ahead of Cyber Threats With <br /> AI-Enhanced  Dark Web Monitoring</h2>

      
      </div>
    </div>
  
    </>
    
   
  )
}

export default Main