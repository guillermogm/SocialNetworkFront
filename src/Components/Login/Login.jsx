import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../../Services/apiCalls.js'
import { jwtDecode } from 'jwt-decode'
import { isTokenValid } from '../../Utils/functions.js'

export const Clogin = () => {
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
    const login = async () => {
        try {
          setError("")
          const response = await loginUser(credentials)
          if (response.success) {
            navigate("/")
            const decodedToken =jwtDecode(response.token)
            const fullToken={
              token:response.token,
              tokenData:decodedToken
            }
            localStorage.setItem("fullToken", JSON.stringify(fullToken))
            window.location.reload();
            isTokenValid(fullToken.tokenData.exp)
          } else {
            setError("Error login user.")
          }
    
        } catch (error) {
          setError("Somenthing unexpected happend.")
        }
      }
    return (
        <>
            <div className="card mx-auto">
                <div className="card-body">
                    <h1 className="text-center mt-2">Login</h1>
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
                                <input type="button" name="send" className="btn btn-primary" value="Login" onClick={login}/>
                            </div>
                        </form>
                        <div className="text-center">
                            <h3>{error}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
