import { useContext, React } from 'react';
import { AuthContext } from '../context/authContext.js';
import { Link } from 'react-router-dom'

const Navbar = () => {
    const { currentUser, logout } = useContext(AuthContext);
    return (
        <div className='navbar'>
            <div className='container'>
                <div className='logo'>
                    <Link to="/" className='link'>
                        Movie App
                    </Link>
                </div>
                <div className='links'>
                    <span>{currentUser?.username}</span>
                    {currentUser ? (
                        <Link onClick={logout} className='log' to='/'>Logout</Link>
                    ) : (
                        <Link className='log' to="/login">
                            Login
                        </Link>
                    )}

                </div>
            </div>
        </div>
    )
}

export default Navbar