import React from 'react'
import './Home.css'
import { Login } from '../../Components/Login/Login'

export const Home = () => {
  return (
    <>
      <div className='container'>
        <div className='row'>
        <div className='col-sm mt-5'>
            <div className="card mx-auto">
              <div className="card-body">
                This is some text within a card body.
              </div>
            </div>
          </div>
          <div className='col-sm-5 mt-5'>
            <Login/>
          </div>
        </div>
      </div>
    </>
  )
}
