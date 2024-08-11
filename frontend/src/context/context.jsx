"use client"
import { createContext, useContext, useState } from "react";

const StateContext = createContext();
const StateProvider = (props) => {
    const addItems = async (category, fileType, desc) => {
        const requestData = await fetch(`http://localhost:8000/routes/files/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("auth_token"),
            },
            body: JSON.stringify({ category, fileType, desc })
        });

        const response = await requestData.json();
        return response;
    }

    const signup = async (name, email, password, image, city) => {
        const requestData = await fetch(`http://localhost:8000/routes/users/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password, image, city })
        });

        const response = await requestData.json();
        return response;
    }

    const login = async (email, password) => {
        const requestData = await fetch(`http://localhost:8000/routes/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const response = await requestData.json();
        return response;
    }

    const getUser = async () => {
        const requestData = await fetch(`http://localhost:8000/routes/users/oneUser`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("auth_token"),
            }
        });

        const response = await requestData.json();
        return response;
    }

    const getUsers = async () => {
        const requestData = await fetch(`http://localhost:8000/routes/users/allUsers`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const response = await requestData.json();
        return response;
    }


    const addLike = async (id) => {
        const response = await fetch(`http://localhost:8000/routes/files/likes`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("auth_token")
            },
            body: JSON.stringify({ id }),
        });
        const result = await response.json();
        return result;
    };


    const deleteUser = async (id) => {
        const requestData = await fetch(`http://localhost:8000/routes/files/delete`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id })
        });

        const response = await requestData.json();
        return response;
    }

    const addComment = async (comments, id) => {
        const requestData = await fetch(`http://localhost:8000/routes/files/comments`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("auth_token")
            },
            body: JSON.stringify({ comments, id })
        });

        const response = await requestData.json();
        return response;
    }


    const savePost = async (id) => {
        const requestData = await fetch(`http://localhost:8000/routes/files/saveposts`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("auth_token")
            },
            body: JSON.stringify({ id })
        });

        const response = await requestData.json();
        return response;
    }


    const getItems = async (url) => {
        let apiUrl = url
        const requestData = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const response = await requestData.json();
        return response
    }

    const getSaved = async (url) => {
        let apiUrl = url
        const requestData = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("auth_token")
            }
        });

        const response = await requestData.json();
        return response
    }

    return <StateContext.Provider value={{ getSaved, addItems, getItems, savePost, deleteUser, addComment, addLike, signup, login, getUsers, getUser }}>
        {props.children}
    </StateContext.Provider>
}

const useGlobalContext = () => {
    return useContext(StateContext)
}

export { StateProvider, useGlobalContext }