import { React, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from "axios"
import { AuthContext } from '../context/authContext'
axios.defaults.withCredentials = true
const Login = () => {
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    })
    const [err, setError] = useState(null);

    const navigate = useNavigate()

    const { login } = useContext(AuthContext);

    const handleChange = e => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            await login(inputs)
            navigate("/movie");
        } catch (err) {
            setError(err.response.data)
        }
    }

    return (
        <div className='auth'>
            <h1>Login</h1>
            <form>
                <input required type="text" placeholder='email' name='email' onChange={handleChange} />
                <input required type="password" placeholder='password' name='password' onChange={handleChange} />
                <button onClick={handleSubmit}>Login</button>
                {err && <p>{err}</p>}
                <span> If you don't have an account,
                    <Link to="/register"> Register here</Link>
                </span>
            </form>
        </div>
    )
}

export default Login