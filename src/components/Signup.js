import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"

const Signup = (props) => {
    const [ credentials, setCredentials ] = useState({name: "", email: "", password: "", cpassword: ""})

    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        const {name, email, password} = credentials;

        // API Call
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name, email, password}) // body data type must match "Content-Type" header
        });
        // eslint-disable-next-line
        const json = await response.json(); // parses JSON response into native JavaScript objects

        if (json.success) {
            // Save the auth-token and redirect
            localStorage.setItem('token', json.authToken)
            navigate("/");
            props.showAlert("success","Account Created Successfully")
        } else {
            props.showAlert("danger", "Invalid Credentials!")
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className="container">
            <h1 style={{ margin: "25px 0px 35px" }}>SignUp</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" value={credentials.name} onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={credentials.email} onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword" value={credentials.cpassword} onChange={onChange} minLength={5} required/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
