import React from 'react'
import {Link} from 'react-router-dom'
import './landingPage.css'

export default function LandingPage(){
    return(
        <div>
            <h1>Welcome to Dogs</h1>
            <Link to='home'>
                <button> Ingresar </button>
            </Link>
        </div>
    )
}