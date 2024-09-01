import React, { useState } from 'react'
import { registerUser } from '../../Services/apiCalls.js'
import { useNavigate } from 'react-router-dom'

export const Register = () => {
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


    const register = async () => {
        try {
            setError("")
            const response = await registerUser(credentials)
            if (response.success) {
                navigate("/login")

            } else {
                setError("Error registering User.")
            }

        } catch (error) {
            setError("Something unexpected happend.")
        }
    }
    return (
        <>
            <div className='container'>
                <div className='row mt-5'>
                    <div className='col-sm-5 mx-auto'>
                        <div className='card'>
                            <div className="card-body">
                                <h1 className="text-center mt-2">Register</h1>
                                <div className="container">
                                    <form>
                                        <label className="col-form-label">Email:</label>
                                        <div className='col-sm'>
                                            <input type="email" placeholder='Email' name="email" className="form-control" onChange={handleChange} />
                                        </div>
                                        <label className="col-form-label">Password:</label>
                                        <div className='col-sm'>
                                            <input type="password" name="password" placeholder='Password' className="form-control" onChange={handleChange} />
                                        </div>
                                        <div className="text-center mt-4">
                                            <input type="button" name="send" className="btn btn-primary" value="Sign In" onClick={register} />
                                        </div>
                                    </form>
                                    <div className="text-center">
                                        <h3>{error}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
