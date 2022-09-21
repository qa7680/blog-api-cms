import { useEffect, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../Contexts/AuthContext';

const NavbarComponent = () => {

    const [ username, setUsername ] = useState('');
    const auth = localStorage.getItem('username');

    const { user } = useContext(AuthContext);

    return (
        <Navbar bg = "dark" variant = "dark" style={{display: 'flex', justifyContent: 'space-between', paddingRight: '2rem',
        paddingLeft: '2rem'}}>              
                    <Navbar.Brand className='fs-2 fw-bold' style={{marginLeft: '2rem'}}><Link to = "/" style={{textDecoration: 'none',
                color: 'inherit'}}>BlogApi CMS</Link></Navbar.Brand>
                    {user ?
                <div>
                     <Navbar.Brand className='fs-5 fw-normal' style={{marginLeft: '2rem'}}><Link to = "/create-post" style={{textDecoration: 'none',
                color: 'inherit'}}>Create Post</Link></Navbar.Brand>
                    <Navbar.Brand className='fs-5 fw-normal' style={{marginLeft: '2rem'}}><Link to = "/" style={{textDecoration: 'none',
                color: 'inherit'}}>Welcome Back {user.user.username}</Link></Navbar.Brand>
                    <Navbar.Brand onClick={() => localStorage.clear()} className='fs-5 fw-normal' style={{marginLeft: '2rem'}} href = "/">Logout</Navbar.Brand>
                </div>
                :
                <div>
                    <Navbar.Brand className='fs-5 fw-normal' style={{marginLeft: '2rem'}}><Link to = "/login"
                    style={{textDecoration: 'none',
                    color: 'inherit'}}>Login</Link></Navbar.Brand>
                </div>
                }
        </Navbar>
    );
};

export default NavbarComponent;