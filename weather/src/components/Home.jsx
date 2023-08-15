import React from 'react'
import {Link} from "react-router-dom"

export default function Home() {
    document.body.style.backgroundImage="url('https://cdn.britannica.com/74/182174-050-6755AB49/balloon-sky.jpg')"
    return (
        <>
            <div className="container my-5">
                <div className="row">
                    <div className="col my-5">
                        <h1 className='text-center'><strong>Weather Foreacst</strong></h1>
                        <hr style={{width: '30%', marginLeft: '35%',  color: 'black'}}/>
                        <br/>
                        <br/>
                        <p className='text-center'><strong>Get ahead of the weather with our detailed forecasts providing </strong></p>
                        <p className='text-center'><strong>you with everything you need to know. Let's help you plan your day ahead.</strong></p>
                        <br/>
                        <br/>
                        <div className="text-center">
                            <Link to="/checkweather" type="button" className="btn btn-outline-success">Get Started !</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
