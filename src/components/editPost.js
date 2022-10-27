import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthContext';

const EditPost = () => {

    const { postId } = useParams();
    const [ title, setTitle ] = useState('');
    const [ blogText, setBlogText ] = useState('');
    const [ published, setPublished ] = useState('');

    const {user} = useContext(AuthContext);

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://qa7680-blog-api.onrender.com/api/posts/${postId}`, {
            mode: 'cors', method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                setTitle(data.post[0].title);
                setBlogText(data.post[0].blogText);
                setPublished(data.post[0].published);
            });
    }, [])

    //handle field changes
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };
    const handleTextChange = (e) => {
        setBlogText(e.target.value);
    };
    const handlePublishedChange = (e) => {
        setPublished(e.target.value);
    };

    //on cancel btn
    const cancelEdit = () => {
        navigate(`/posts/${postId}`)
    };

    //send PUT request api to edit post
    const saveChanges = () => {
        fetch(`https://qa7680-blog-api.onrender.com/api/posts/${postId}/`, {
            mode: 'cors', method: 'PUT', headers: {'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + user.token}, body: JSON.stringify({
                title: title,
                blogText: blogText,
                published: published
            })
        })
            .then(res => res.json())
            .then(data => console.log(`post edited, ${data}`))
            navigate(`/posts/${postId}`);
    };
    
    return(
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '5rem', flexDirection:'column',
        }}>
        <div class="card" style={{width: "30vw"}}>
            <div class="card-header fs-5 fw-bold" style={{paddingLeft: '3rem'}}>Edit Post!</div>
            <div class="card-body">
                <form onSubmit={saveChanges} style={{display: 'flex', flexDirection: 'column', gap: '1rem', padding: '2rem'}}>
                    <div class="mb-3">
                        <label for = "title" class="form-label">Title:</label>
                        <input onChange={handleTitleChange} required='true' type="text"  class="form-control" id ="title" name="title" value={title}/>
                    </div>
                    <div class="mb-3">
                        <label for="blogText" class="form-label">Blog Text: </label>
                        <textarea onChange={handleTextChange} required='true' class="form-control" name="blogText" id="floatingTextarea2"
                        style={{height: "100px"}} value={blogText}></textarea>
                    </div>
                    <div class = "mb-3">
                        <label for = "published" class= "form-label">Status: </label>
                        <select class = "form-select form-slect-lg mb-3" name="published" value={published}
                        onChange={handlePublishedChange}>
                            <option value = {true}>Published</option>
                            <option value = {false}>Unpublished</option>
                        </select>
                    </div>
                    <button style={{width: '100%'}} type="submit" class="btn btn-primary">Save Changes</button>
                    <button type="button" onClick={cancelEdit} style={{width: '100%'}} class="btn btn-warning">Cancel</button>
                </form>
            </div>
        </div>
        </div>
    );
};

export default EditPost;