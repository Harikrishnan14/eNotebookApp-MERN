import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"

const Login = (props) => {

    const [ credentials, setCredentials ] = useState({email: "", password: ""})

    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        // API Call
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password}), // body data type must match "Content-Type" header
        });
        // eslint-disable-next-line
        const json = await response.json(); // parses JSON response into native JavaScript objects

        if (json.success) {
            // Save the auth-token and redirect
            localStorage.setItem('token', json.authToken)
            props.showAlert("success", "Logged in Successfully")
            navigate("/");
        } else {
            props.showAlert("danger", "Invalid Login Credentials!")
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className="container">
            <h1 style={{ margin: "25px 0px 35px" }}>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" name="email" id="email" aria-describedby="emailHelp" value={credentials.email} onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="Password" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" id="password" value={credentials.password} onChange={onChange}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
