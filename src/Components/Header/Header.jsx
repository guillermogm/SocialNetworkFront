import React from 'react'
import { CNavigator } from '../CNavigator/CNavigator.jsx'

export const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <CNavigator className="navbar-brand" path="/" id="Title" content="Social Network" />
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <CNavigator className="nav-item nav-link active" path="/" content="Home" />
                </div>
            </div>
        </nav>
    )
}
