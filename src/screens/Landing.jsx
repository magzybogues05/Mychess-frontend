import React from 'react'
import { useNavigate } from 'react-router-dom';

const Landing = () => {
    const navigate=useNavigate();
  return (
    <div className='flex justify-center flex-row'>
        <h1 className='text-4xl font-bold mb-4'>Lets explore the chess with us</h1>
        <button onClick={()=>{navigate("/game")}} className='bg-green-500'>Play Online</button>
    </div>
  );
}

export default Landing;