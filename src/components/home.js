import React, { useState, useEffect, useContext } from 'react';
import { DateTime } from 'luxon';
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import HomeCard from './homeCard';
import { Link } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthContext';
import '../styling/main.css';

const Homepage = () => {

    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(null);

    const {user} = useContext(AuthContext);

    const navigate = useNavigate();

    //check if user logged in
    useEffect(() => {
        const loggedInUser = localStorage.getItem('authenticated');
        if(loggedInUser) {
            setAuthenticated(loggedInUser)
        };
    }, [])

    //fetch all posts
    useEffect(() => {
        fetch('https://qa7680-blog-api.onrender.com/api/posts', {mode:'cors', method:'GET'})
            .then(res => res.json())
            .then(data => {
                setPosts(data.all_posts.map(post => {
                    return {...post, time: DateTime.fromISO(post.time).setLocale('en').toFormat('ff')}
                }))
                setIsLoading(false);
            });
    }, [posts]);

    //publish/unpublish function
    const postPublished = (post) => {
        fetch(`https://qa7680-blog-api.onrender.com/api/posts/${post._id}`, {
            mode: 'cors', method: 'PUT', headers: {'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.token}, body: JSON.stringify({
                published: !post.published
            })  
        })
            .then(res => res.json())
            .then(data => console.log(`success, ${data}`))
    };
    
    //check if a user is authenticated or not. if not redirect to login page
    if(!authenticated){
        navigate('/login')
    };

    return(
        <div className='p-3 mb-2 text-dark' style={{ display: 'flex', flexDirection: 'column'}}>
             {isLoading == true ? <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}><CircularProgress/></div> :
             <div>
        <HomeCard />
        <div style={{display: 'flex' , justifyContent: 'center', gap: '1rem', flexWrap: 'wrap'}} >
            {posts.map((post) => {
            return (              
                    <Card style = {{width: '18rem', border: '1px solid black'}}>
                        <Card.Body style={{display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center'}}>
                            <Card.Title>{post.title}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted"> { post.time }</Card.Subtitle>
                            {post.published == true ? <p>Published by Admin</p> : <p>Unpublished</p>}
                            <Link to = {`/posts/${post._id}`} style={{ textDecoration: 'none', color:'inherit'}}>
                            <button type="button" class="btn btn-primary">View and Edit Blog Post!</button>
                            </Link>
                            {post.published == true ? <button onClick={() => postPublished(post)} 
                            class = "btn btn-danger">Unpublish</button> :
                            <button onClick={() => postPublished(post)} class="btn btn-success">Publish</button>}                       
                        </Card.Body>
                    </Card>
            )            
        })}
       </div>
       </div>
        }
       </div>
    )
    ;
};

export default Homepage;