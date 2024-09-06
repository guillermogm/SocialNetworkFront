import React, { useEffect, useState } from "react";
import { deletePostById, deleteUserById, getAllUsers, getPosts } from "../../Services/apiCalls";
import "./Admin.css";
import { useAuth } from "../../context/tokenContext";

export const Admin = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [update, setUpdate] = useState(false);
  const { fullToken } = useAuth();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const token = fullToken.token;
    const bringAllUsers = async () => {
      const allUsers = await getAllUsers(token);
      if (allUsers.success) {
        setUsers(allUsers.data);
      } else {
        setError("Error getting user.");
      }
    };
    bringAllUsers();
  }, [update]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setError("");
        const response = await getPosts();
        if (response.success) {
          if (response.data == []) {
            setError("No posts found.");
          }
          setPosts(response.data);
        } else {
          setError("Error loading Posts.");
        }
      } catch (error) {
        setError("Something unexpected happened.");
      }
    };
    fetchData();
  }, [update]);

  const deleteUserHandler = async (e) => {
    const token = fullToken.token;
    const res = await deleteUserById(e, token);
    if (res.success) {
      setError("");
      setUpdate(!update);
    } else {
      setError("Error deleting user.");
    }
  };

  const deleteHandler = async (postId) => {
    const response = await deletePostById(postId, fullToken.token);
    if (response.success) {
      setUpdate(!update);
    } else {
      setError("Error deleting this post.");
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6 col-sm-12">
            <h1 className="text-center mt-5 mb-5">Users</h1>
            <table className="table mb-5">
              <thead className="table-dark">
                <tr className="text-center">
                  <th scope="col">id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email Address</th>
                  <th scope="col">Role</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {users.length &&
                  users.map((user) => {
                    return (
                      <tr key={user._id} className="text-center">
                        <th scope="row">{user._id}</th>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>
                          <input
                            type="button"
                            className="delete btn btn-danger"
                            onClick={() => deleteUserHandler(user._id)}
                            name={user.id}
                            value="🛇"
                          />
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          <div className="col-lg-6 col-sm-12">
            <h1 className="text-center mt-5 mb-5">Posts</h1>
            {posts.map((post, index) => {
              return (
                <div key={index} className={`mt-4 mb-5`}>
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title text-center">{post.title}</h5>
                      <p className="card-text">{post.content}</p>
                      <button className="btn btn-primary disabled">
                        {post.likes.length} <span>Likes</span>
                      </button>
                      <button
                        className="btn btn-danger float-end"
                        onClick={() => deleteHandler(post._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <h1 className="text-center mt-5 mb-5">{error}</h1>
    </>
  );
};
