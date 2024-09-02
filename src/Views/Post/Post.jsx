import React, { useEffect, useState } from 'react'
import { getPosts } from '../../Services/apiCalls';

export const Post = () => {
    const [posts, setPosts] = useState([])
    const [error, setError] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            try {
                setError('');
                const response = await getPosts();
                if (response.success) {
                    if(response.data == []){
                        setError('No posts found.')
                    }
                    setPosts(response.data);
                } else {
                    setError('Error loading Services.');
                }
            } catch (error) {
                setError('Something unexpected happened.');
            }
        };
        fetchData();
    }, []);
    return (
        <>
            <div className="container">
                <h1 className='text-center mt-5'>POST</h1>
                {
                    posts.map((post, index) => { 
                        return (
                            <div key={post.id} className={`mt-4 mb-5`}>
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title text-center">{post.title}</h5>
                                        <p className="card-text">{post.content}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
                <h3>{error}</h3>
            </div>
        </>
    )
}
