import React from 'react'

export default function Navbar(props) {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark shadow-5-strong" >
            <div className="container my-3">
                <h4 style={{color:'white'}}>{props.title}</h4>
            </div>
        </nav>
    )
}
