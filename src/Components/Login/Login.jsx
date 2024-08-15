import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState(
        {
            email: "",
            password: ""
        }
    )
    const handleChange = (e) => {
        setCredentials(prevState => (
            {
                ...prevState,
                [e.target.name]: e.target.value
            }
        ))
    }
    return (
        <>
            <div class="card mx-auto">
                <div class="card-body">
                    <h1 className="text-center mt-2">Login</h1>
                    <div className="container">
                        <form>
                            <label className="col-form-label">Email:</label>
                            <input type="email" name="email" className="form-control" onChange={handleChange} />
                            <label className="col-form-label">Password:</label>
                            <input type="password" name="password" className="form-control" onChange={handleChange} />
                            <div className="text-center mt-4">
                                <input type="button" name="send" className="btn btn-primary" value="Login" />
                            </div>
                        </form>
                        <div className="text-center">
                            <h2></h2>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
