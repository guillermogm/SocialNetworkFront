import React, { useEffect, useState } from "react";
import { getOwnPosts, likePost } from "../../Services/apiCalls";
import { useAuth } from "../../context/tokenContext";

export const MyPosts = () => {
  const { fullToken } = useAuth();
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [like, setLike] = useState(false);

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
          setError("Error loading Services.");
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
  return (
    <>
      <div className="container">
        <h1 className="text-center mt-5">MY POSTS</h1>
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
