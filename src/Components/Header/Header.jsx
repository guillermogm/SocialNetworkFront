import React from 'react'
import { CNavigator } from '../CNavigator/CNavigator.jsx'
import './Header.css'
import { useAuth } from '../../context/tokenContext.jsx'
import { useNavigate } from 'react-router-dom'

export const Header = () => {
    const navigate = useNavigate();
    const {fullToken, setFullToken} = useAuth()
    const Logout = () => {
        localStorage.removeItem("fullToken");
        setFullToken(null);
        navigate("/");
    };
    console.log(fullToken);
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <CNavigator className="navbar-brand" path="/" id="Title" content="Socialize" />
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav ms-auto">
                    <CNavigator className="nav-item nav-link active" path="/" content="Home" />
                    <CNavigator className="nav-item nav-link active" path="/posts" content="All Posts" />
                    {
                        fullToken ? (
                            <input className="nav-item nav-link active" onClick={Logout} value="Logout" />

                        ) : (
                            <>
                                <CNavigator className="nav-item nav-link active" path="/login" content="Login" />
                                <CNavigator className="nav-item nav-link active" path="/register" content="Register" />
                            </>

                        )
                    }
                </div>
            </div>
        </nav>
    )

    
}
