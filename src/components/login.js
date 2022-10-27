import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../Contexts/AuthContext';
import ProfileLogo from '../images/profileLogo.png'
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [authenticated, setauthenticated] = useState(localStorage.getItem(localStorage.getItem("authenticated")|| false));
    const [errorMsg, setErrorMsg ]= useState('');

    const {user, setUser} = useContext(AuthContext);
    
    const navigate = useNavigate();

    const onUserChange = (e) => setUsername(e.target.value);
    const onPassChange = (e) => setPassword(e.target.value);

    //handle login form
    const handleLogin = (e) => {
        e.preventDefault();
        fetch('https://qa7680-blog-api.onrender.com/api/user/login', {
            mode: 'cors', method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({
                username: username,
                password: password
            })
        })
            .then(res => res.json())
            .then(data => {
                if(data.user !== false){
                setUser(data);
                setauthenticated(true)
                localStorage.setItem("authenticated", true);
                navigate('/')
            }else{
                setErrorMsg('bad login try again')
            }
            })
    };

    return(
        <section style={{display: 'flex', alignItems: 'center', padding: '10rem', flexDirection:'column' }}>
            <div class="card" style={{width: "25rem", padding: '2rem', border: '1px solid lightgrey', gap: '1rem'}}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <img style={{width: '96px', height: '96px'}} src={ProfileLogo} />
                <h2>Sign In</h2>
            </div>
            <form onSubmit={handleLogin}>
                <div class="mb-3">
                    <label for = "username" class="form-label">Username: </label>
                    <input value={username} onChange={onUserChange} required="true" type = "text" class = "form-control" id = "username" />
                </div>
                <div class="mb-3">
                    <label for = "password" class="form-label">Password: </label>
                    <input value={password} onChange={onPassChange} required="true" type = "password" class = "form-control" id = "password" />
                </div>
                <button style={{width: '100%'}} class="btn btn-primary" type="submit">Login</button>
            </form>
            {errorMsg && <div class="alert alert-danger" role="alert">Username or password incorrect. Please try again.</div>}
            </div>
        </section>
    );
};

export default Login;