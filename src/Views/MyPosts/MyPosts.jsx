import React, { useEffect, useState } from "react";
import { createPost, getOwnPosts, likePost } from "../../Services/apiCalls";
import { useAuth } from "../../context/tokenContext";

export const MyPosts = () => {
  const { fullToken } = useAuth();
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [like, setLike] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError("");
        const response = await getOwnPosts(fullToken.token);
        if (response.success) {
          if (response.data == [""]) {
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
  }, [like]);

  const likeHandler = async (postId) => {
    try {
      const response = await likePost(postId, fullToken.token);
      if (response.success) {
        setLike(!like);
      } else {
        setError("Error liking this post.");
      }
    } catch (error) {
      setError("Something unexpected happened liking this post.");
    }
  };
  function editInputHandler(e) {
    setNewPost({
      ...newPost,
      [e.target.name]: e.target.value,
    });
  }
  const confirmButtonHandler = async () => {
    const response = await createPost(newPost, fullToken.token);
    if (response.success) {
      setNewPost({
        title: "",
        content: "",
      });
      setLike(!like);
    }else{
      setError("Error creating this post.");
    }
  };
  return (
    <>
      <div className="container">
        <h1 className="text-center mt-5">MY POSTS</h1>
        <div className="card">
          <div className="card-body">
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="mb-2 form-control"
              value={newPost.title}
              onChange={editInputHandler}
            />
            <input
              type="text"
              name="content"
              placeholder="Content"
              className="mb-2 form-control"
              value={newPost.content}
              onChange={editInputHandler}
            />
            <div className="d-flex justify-content-center">
              <button
                className="btn btn-primary"
                onClick={() => confirmButtonHandler()}
              >
                Create Post
              </button>
            </div>
          </div>
        </div>
        {posts.map((post, index) => {
          return (
            <div key={index} className={`mt-4 mb-5`}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title text-center">{post.title}</h5>
                  <p className="card-text">{post.content}</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => likeHandler(post._id)}
                  >
                    {post.likes.length} <span>Likes</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        <h3 className="text-center mt-5">{error}</h3>
      </div>
    </>
  );
};
