const URL = "http://localhost:4010"

export const loginUser = async (credentials) => {

    if (credentials.email === "" || credentials.password === "") {
        return console.log("No Email or Password");
    }

    const request = await fetch(`${URL}/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: credentials.email, password: credentials.password }),
    });

    const result = await request.json();

    return result;
}

export const registerUser = async (credentials) => {

    if (credentials.email === "" || credentials.password === "") {
        return console.log("No Email or Password");
    }

    const request = await fetch(`${URL}/api/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: credentials.email, password: credentials.password }),
    });

    const result = await request.json();

    return result;
}

export const getPosts = async () => {
    const response = await fetch(`${URL}/api/posts/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    })
    return await response.json()
}

export const getProfile = async (token) => {
    const response = await fetch(`${URL}/api/users/profile`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    })
    return await response.json()
}


export const updateProfile = async (changes, token) => {
    const response = await fetch(`${URL}/api/users/profile`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(changes)
    })
    return await response.json()
}

export const getOwnPosts = async (token) => {
    const response = await fetch(`${URL}/api/posts/own`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    })
    return await response.json()
}
export const likePost = async (postId, token) => {
    const response = await fetch(`${URL}/api/posts/like/${postId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    })
    return await response.json()
}