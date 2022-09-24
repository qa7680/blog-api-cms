import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from 'react';
import { DateTime } from "luxon";
import DeleteConfirmation from "./deleteModal";
import { useNavigate } from "react-router-dom";
import EditComment from "./editComment";
import { Link } from "react-router-dom";
import { AuthContext } from '../Contexts/AuthContext';

const BlogPost = () => {

    const { postId } = useParams();
    const [ post, setPost ] = useState([]);
    const [ comments, setComments ] = useState([]);
    const [ usernameField, setUsernameField ] = useState('');
    const [ commentField, setCommentField ] = useState('');
    const [ show, setShow ] = useState(false);
    const [ showEdit, setShowEdit ] = useState(false);
    const [ deleteCommentId, setDeleteCommentId ] = useState('');
    const [ blogOrComment, setBlogOrComment ] = useState('');
    const [ commentObject, setCommentObject ] = useState({});

    const {user} = useContext(AuthContext);

    const navigate = useNavigate();
    
    //fetch single post using url param
    useEffect(() => {
        fetch(`https://powerful-sands-70177.herokuapp.com/api/posts/${postId}`, {mode: 'cors', method: 'GET'})
            .then(res => res.json())
            .then(data => setPost(data.post[0]));
    }, [post]);

    //fetch single post comments
    useEffect(() => {
        fetch(`https://powerful-sands-70177.herokuapp.com/api/posts/${postId}/comments`, {mode: 'cors', method: 'GET'})
            .then(res => res.json())
            .then(data => setComments(data.comments.map(comment => {
                return {...comment, time: DateTime.fromISO(comment.time).setLocale('en').toFormat('ff')}
            })));
    }, [comments]);

    //send post request to our api to add a comment
    function addComment(e){
        e.preventDefault();
        fetch(`https://powerful-sands-70177.herokuapp.com/api/posts/${postId}/comments`,
        {mode:'cors', method: 'POST', headers: {'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.token}, body: JSON.stringify({
            comment: commentField,
            username: usernameField
        })})
            .then(res => res.json())
            .then(data => {
                console.log('Success: ', data)
        });
        setUsernameField('');
        setCommentField('');
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    };
    
    //close delete modal
    const handleClose = () => setShow(false);

    //close edit modal
    const handleEditClose = () => {
        setShowEdit(false);
    };

    //send delete request to api for specific comment
    const deleteComment = () => {
        handleClose();
        if(blogOrComment == 'comment'){
        fetch(`https://powerful-sands-70177.herokuapp.com/api/posts/${postId}/comments/${deleteCommentId}`, {
            mode: 'cors', method: 'DELETE', headers: {'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + user.token}
        })
            .then(res => res.json())
            .then(data => console.log(`Comment ${deleteCommentId} deleted ${data}`))
        }else if(blogOrComment == 'post'){
            fetch(`https://powerful-sands-70177.herokuapp.com/api/posts/${postId}`, {
                mode: 'cors', method: 'DELETE', headers: { 'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.token }
            })
            .then(res => res.json())
            .then(data => console.log(`Post delete, ${data}`))
            navigate('/');
        }
    };

    return(
        <div style={{ display:'flex', alignItems: 'center', flexDirection: 'column', padding: '2rem', gap: '5rem' }}>

            <DeleteConfirmation show={show} handleClose={handleClose} deleteComment={deleteComment} postOrComment={blogOrComment}/>           
            <EditComment show={showEdit} handleClose={handleEditClose} postId={postId} comment = {commentObject}/>

            <div style={{ display:'flex', alignItems: 'center', flexDirection: 'column', gap: '0.5rem', width: '50%'}}>
                <h2 style={{ marginBottom: '1rem' }} className="fw-bolder">{post.title}</h2>
                <p style={{ padding: '2rem', backgroundColor: 'lightgrey', color: 'black' }} className="card fw-normal">{post.blogText}
                <div style={{display: 'flex', gap: '0.5rem', alignItems: 'center', marginTop: '1rem'}}>
                                <Link  to = {`/posts/${postId}/edit`}
                                style={{ textDecoration: 'none', color:'inherit'}}><button class="btn btn-secondary btn-m">Edit Post</button></Link>
                                <button class="btn btn-danger btn-m" onClick={() => {setShow(true);setBlogOrComment('post')}}>Delete Post</button>
                            </div></p>
                <p style={{ alignSelf: 'flex-start'}} className="fst-italic">{post.published == true ? '- Published by admin' :
                'Unpublished'}</p>
            </div>
            <div style={{ display:'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
                <h4>Comments: </h4>
                {comments.length < 1 ? 'No Comments Yet' : 
                comments.map((comment) => {
                    return(                       
                    <div>
                        <div class="card" style={{width: '40vw'}}>
                            <h5 class="card-header">By: {comment.username}</h5>
                            <div class="card-body">
                              <h5 class="card-title">{comment.comment}</h5>
                              <p class="card-text fst-italic">{comment.time}</p>
                            </div>
                            <div style={{display: 'flex', gap: '0.5rem', alignItems: 'center', marginLeft: '1rem', marginBottom:'1rem'}}>
                                <button onClick={(e) => {setShowEdit(true);setCommentObject(comment)}} class="btn btn-primary btn-sm">Edit Comment</button>
                                <button value={comment._id} onClick={(e) => {setShow(true);setBlogOrComment('comment');setDeleteCommentId(e.target.value)}} class="btn btn-warning btn-sm">Delete Comment</button>
                            </div>
                        </div>
                    </div>
                    )
                })
                }
                        <form onSubmit={addComment} style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '1rem'}}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <label className="form-label" for = "username">Username: </label>
                                <input required="true" type='text' value={usernameField} onChange={(e) => {setUsernameField(e.target.value)}} className="form-control" name = "username" />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <label className="form-label" for = "comment">Comment: </label>
                                <input required="true" type='text' value={commentField} onChange={(e) => {setCommentField(e.target.value)}} className="form-control" name = "comment"/>
                            </div>
                            <button className="btn btn-secondary" type="submit">Add Comment</button>
                        </form>
            </div>
        </div>
    );
};

export default BlogPost;