import React, { useEffect, useState } from 'react'
import { deleteUserById, getAllUsers } from '../../Services/apiCalls'
import "./Admin.css"
import { useAuth } from '../../context/tokenContext'

export const Admin = () => {
    const [users, setUsers] = useState([])
    const [error, setError] = useState("")
    const [update, setUpdate] = useState(false)
    const { fullToken } = useAuth();
    useEffect(() => {
        const token = fullToken.token
        const bringAllUsers = async () => {
            const allUsers = await getAllUsers(token)
            if (allUsers.success) {
                setUsers(allUsers.data)
            }
            else{
                setError("Error getting user.")
            }
        }
        bringAllUsers()
    }, [update])

    const deleteUserHandler = async (e) => {
        const token = fullToken.token
        const res = await deleteUserById(e, token)
        if (res.success) {
            setError("")
            setUpdate(!update)
        }else{
            setError("Error deleting user.")
        }
    }

    return (
        <>
            <h1 className='text-center mt-5 mb-5'>Users</h1>
            <div className="container">
                <table className="table mb-5">
                    <thead className="table-dark">
                        <tr className="text-center" >
                            <th scope="col">id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email Address</th>
                            <th scope="col">Role</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length && users.map((user) => {
                            return (
                                <tr key={user._id} className="text-center">
                                    <th scope="row">{user._id}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.roleId == 1 ? "User" : "Admin"}</td>
                                    <td>
                                        <input type="button" className="delete btn btn-danger" onClick={() => deleteUserHandler(user._id)} name={user.id} value="🛇" />
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <h1 className='text-center mt-5 mb-5'>{error}</h1>
        </>
    )
}