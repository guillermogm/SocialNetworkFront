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
                <p>Socialize is a new social network that will change your
                  mind on what you think about social networks. <br/>
                  To access the full experience of Socialize you can register
                  in the button of the nav bar or if you are a user login
                  on the form to the rigth. 
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
