import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Profile.css'
import { useAuth } from '../../context/tokenContext'

export const Profile = () => {
    const navigate = useNavigate()
    const [fullToken, setFullToken] = useAuth()
    let token

    const [profileData, setProfileData] = useState({
        firstName: "",
        lastName: "",
        email: ""
    })
    const [editing, setEditing] = useState(false)
    const [editData, setEditData] = useState({
        firstName: "",
        lastName: "",
        email: ""
    })

    function editingButtonHandler() {
        setEditData({
            firstName: profileData.firstName,
            lastName: profileData.lastName,
            email: profileData.email
        })
        setEditing(!editing)
    }

    function editInputHandler(e) {

        setEditData({
            ...editData,
            [e.target.name]: e.target.value,
        })
    }

    useEffect(() => {
        if (!fullToken) {
            navigate("/login")
        } else {
            const bringProfile = async () => {
                token = fullToken.token
                const response = await getProfile(token)
                setProfileData(response.data)
            }
            bringProfile()
        }

    }, [])

    const confirmButtonHandler = async()=>{
        const response =await updateProfile(editData,fullToken.token)
        if(response.success){
           const newData= await getProfile(fullToken.token)
           setProfileData(newData.data)
           setEditing(!editing)
        }
    }
    return (
        <>
            <h1 className="text-center mt-5 mb-5">Profile</h1>
            <div className="container">
                <div className="row d-flex justify-content-center text-center">
                    <div className={editing ? "col-2" : "col-8"}>
                        <h4 className={editing ? "hidden" : "mb-2"}>First Name: {profileData.firstName ? profileData.firstName : "No available"}</h4>
                        <input type='text' name='firstName' placeholder='First Name' className={editing ? "mb-2 form-control" : "hidden"} onChange={editInputHandler} />
                    </div>
                </div>
                <div className="row d-flex justify-content-center text-center">
                    <div className={editing ? "col-2" : "col-8"}>
                        <h4 className={editing ? "hidden" : "mb-2"}>Surname: {profileData.lastName ? profileData.lastName : "No available"}</h4>
                        <input type='text' name='lastName' placeholder='Surname' className={editing ? "mb-2 form-control" : "hidden"} onChange={editInputHandler} />
                    </div>
                </div>
                <div className="row d-flex justify-content-center text-center">
                    <div className={editing ? "col-2" : "col-8"}>
                        <h4 className={editing ? "hidden" : "mb-2"}>Email: {profileData.email ? profileData.email : "No available"}</h4>
                        <input type='text' name='email' placeholder='email' className={editing ? "mb-2 form-control" : "hidden"} onChange={editInputHandler} />
                    </div>
                </div>
                <div className="text-center mt-4">
                    <input type="button" name="Edit" className="btn btn-primary" value={editing ? "Cancel" : "Edit"} onClick={editingButtonHandler} />
                </div>
                <div className="text-center mt-2">
                    <input type="button" name="Save" value="Save Changes"  className={editing ? "btn btn-primary" : "hidden"} onClick={confirmButtonHandler} />
                </div>
            </div>
        </>
    )
}
