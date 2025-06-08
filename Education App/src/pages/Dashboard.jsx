import React from 'react'
import { Link } from "react-router-dom";
import ImageSlider from '../components/ImageSlider';
import Couse from '../components/Couse';


const Dashboard = () => {
  return (
    <>
    {/* <div>Dashboard Login</div> */}
        {/* <Main/> */}
        {/* <button>
        <Link to="/logout">Logout</Link>
        </button> */}
        <br/>
        <ImageSlider/>
        <br/>
        <Couse/>
    </>
  )
}

export default Dashboard