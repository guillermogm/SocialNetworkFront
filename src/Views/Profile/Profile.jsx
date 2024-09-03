import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Profile.css'
import { useAuth } from '../../context/tokenContext'
import { getProfile, updateProfile } from '../../Services/apiCalls'

export const Profile = () => {
    const navigate = useNavigate()
    const {fullToken} = useAuth()

    const [profileData, setProfileData] = useState({
        name: "",
        email: ""
    })
    const [editing, setEditing] = useState(false)
    const [editData, setEditData] = useState({
        name: "",
        email: ""
    })

    function editingButtonHandler() {
        setEditData({
            name: profileData.name,
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
                const response = await getProfile(fullToken.token)
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
                        <h4 className={editing ? "hidden" : "mb-2"}>First Name: {profileData.name ? profileData.name : "No available"}</h4>
                        <input type='text' name='firstName' placeholder='First Name' className={editing ? "mb-2 form-control" : "hidden"} onChange={editInputHandler} />
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
