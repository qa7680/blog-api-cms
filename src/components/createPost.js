import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthContext';

const CreatePost = () => {

    const navigate = useNavigate()

    const [title, setTitle] = useState('');
    const [blogText, setBlogText] = useState('');
    const [published, setPublished] = useState(true);

    //handle status selection
    const handleSelectChange = (e) => {
        setPublished(e.target.value)
    };

    const {user} = useContext(AuthContext);

    //handle submit post 
    const submitPost = () => {
        fetch('https://qa7680-blog-api.onrender.com/api/posts', {
            mode: 'cors', method: 'POST', headers: {'Content-Type': 'application/json', 
            'Authorization': 'Bearer ' + user.token}, body: JSON.stringify({
                title: title,
                blogText: blogText,
                published: published
            })
        })
            .then(res => res.json())
            .then(data => console.log(`success, ${data}`))
            setTitle('');
            setBlogText('');
            setPublished(true);
            navigate('/');
    };

    return(
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '5rem', flexDirection:'column',
        }}>
        <div class="card" style={{width: "30vw"}}>
            <div class="card-header fs-5 fw-bold" style={{paddingLeft: '3rem'}}>Create A New Post!</div>
            <div class="card-body">
                <form style={{display: 'flex', flexDirection: 'column', gap: '1rem', padding: '2rem'}} onSubmit={submitPost}>
                    <div class="mb-3">
                        <label for = "title" class="form-label">Title:</label>
                        <input required='true' type="text"  class="form-control" id ="title" name="title" value={title}
                        onChange={(e) => setTitle(e.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <label for="blogText" class="form-label">Blog Text: </label>
                        <textarea required='true' class="form-control" name="blogText" id="floatingTextarea2" style={{height: "100px"}} value={blogText}
                        onChange={(e) => setBlogText(e.target.value)}></textarea>
                    </div>
                    <div class = "mb-3">
                        <label for = "published" class= "form-label">Status: </label>
                        <select class = "form-select form-slect-lg mb-3" name="published" value = {published} onChange={handleSelectChange}>
                            <option value = {true}>Published</option>
                            <option value = {false}>Unpublished</option>
                        </select>
                    </div>
                    <button style={{width: '100%'}} type="submit" class="btn btn-secondary">Submit</button>
                </form>
            </div>
        </div>
        </div>
    )
};

export default CreatePost;