import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from "axios"

const Register = () => {
    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        password: "",
    })
    const [err, setError] = useState(null);

    const navigate = useNavigate()

    const handleChange = e => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async e => {
        e.preventDefault();

        if (!(inputs.username && inputs.email && inputs.password)) {
            setError("Enter all details!")
        }
        else {
            try {
                await axios.post("http://localhost:8080/api/auth/register", inputs)
                navigate("/movie");
            } catch (err) {
                setError(err.response.data)
                navigate("/login");
            }
        }
    }

    return (
        <div className='auth'>
            <h1>Register</h1>
            <form>
                <input reqired type="text" placeholder='username' name='username' onChange={handleChange} />
                <input reqired type="email" placeholder='email' name='email' onChange={handleChange} />
                <input reqired type="password" placeholder='password' name='password' onChange={handleChange} />
                <button onClick={handleSubmit}>Register</button>
                {err && <p>{err}</p>}

                <span>
                    Do you have an account?
                    <Link to="/login"> Login here</Link>
                </span>
            </form>
        </div>
    )
}

export default Register