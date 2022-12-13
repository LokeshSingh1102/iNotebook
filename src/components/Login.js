import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const Login = (e) => {
    const [credentials, setCredentials] = useState({ email: '', password: '' })

    let navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault(); //using this the page will not reload

        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "email": credentials.email, 'password': credentials.password })
        })
        const result = await response.json()
        console.log(result);
        if (result.success) {
            localStorage.setItem('auth', result.authtoken)
            console.log(result.success);
            // to navigate from one location to another 
            navigate('/');
        }
        else {
            alert("wromg credentials");
        }
    }
    // {
    //     [1]   name: 'lokesh new',
    //     [1]   email: 'lokesh343434@gmail.com',
    //     [1]   password: '12354456789878797'
    //     [1] }
    const Onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <>
            <div className="container">
                <h1>Login</h1>
                <form onSubmitCapture={handleLogin} >
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" value={credentials.email} name='email' id="email" aria-describedby="emailHelp" onChange={Onchange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" value={credentials.password} name='password' id="password" onChange={Onchange} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    )
}

export default Login
