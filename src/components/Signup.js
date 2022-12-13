import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Singup = () => {
    const [credentials, setCredentials] = useState({ name: '', email: '', password: '', Cpassword: "" })
    let navigate = useNavigate();

    const handleSingup = async (e) => {
        e.preventDefault(); //using this the page will not reload

        if (credentials.password === credentials.Cpassword) {

            const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "name": credentials.name, "email": credentials.email, 'password': credentials.password })
            })
            const result = await response.json()
            console.log(result);
            if (result.success) {
                localStorage.setItem('auth', result.token)
                navigate('/');
            }
            else {
                alert("user already exist")
                setCredentials({ name: '', email: '', password: '', Cpassword: "" })
            }
        }
        else {
            alert("write correct password");
        }

    }

    const Onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <>
            <div className="container">
                <h1>Singup</h1>
                <form onSubmit={handleSingup}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" name='name' aria-describedby="emailHelp" value={credentials.name} onChange={Onchange} />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" value={credentials.email} onChange={Onchange} />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="Password" className="form-label">Password</label>
                        <input type="password" className="form-control" value={credentials.password} id="password" name='password' onChange={Onchange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Cpassword" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" value={credentials.Cpassword} id="Cpassword" name='Cpassword' onChange={Onchange} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    )
}

export default Singup
