import React from 'react'
import './Home.css'
import { Clogin } from '../../Components/Login/Login'

export const Home = () => {
  return (
    <>
      <div className='container'>
        <div className='row'>
        <div className='col-sm mt-5'>
            <div className="card mx-auto">
              <div className="card-body">
                <h2 className='text-center'>Welcome to Socialize</h2>
                <p>
                  Connect with friends, family, and like-minded individuals from around the world. Share your thoughts, experiences, and passions with our vibrant community. 
                  <br></br>Discover new interests, join meaningful conversations, and make lasting connections.<br></br>
                  We're excited to have you on board! Take a look around, customize your profile, and start socializing today! 
                </p>
              </div>
            </div>
          </div>
          <div className='col-sm-5 mt-5'>
            <Clogin/>
          </div>
        </div>
      </div>
    </>
  )
}
