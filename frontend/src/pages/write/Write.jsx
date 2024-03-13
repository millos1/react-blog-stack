import './Write.css'
import { useState } from 'react'
import axios from 'axios'
import { useContext } from 'react'
import { Context } from '../../context/Context'

export default function Write() {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState(null);
    const { user } = useContext(Context);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            username: user.username,
            title,
            desc,


        };
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append('name',filename);
            data.append('file',file);
            newPost.photo = filename;
            try {
                await axios.post("/upload", data);
            } catch (err) { }
        }
        try {
            const res = await axios.post("/posts", newPost);
            
            window.location.replace("/post/" + res.data._id);
        } catch (err) { }
    };



    return (
        <div className="write">
            {file && (
                <img className="writeImg"
                    src={URL.createObjectURL(file)}
                    alt={""} />
            )}
            <form className="writeForm" onSubmit={handleSubmit}>
                <div className="writeFormGroup">
                    <label htmlFor="fileInput">
                        <i className=" fas fa-plus-square"></i>
                    </label>
                    <input onChange={(e) => setFile(e.target.files[0])} type="file" id="fileInput" style={{ display: "none" }} />
                    <input onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Title" className="writeInput" autoFocus={true} />
                </div>

                <div className="writeFormGroup">
                    <textarea onChange={(e) => setDesc(e.target.value)} placeholder="Tell your story...." type='text' className="writeInput writeText"></textarea>
                </div>
                <button type="submit" className="writeSubmit">Post</button>

            </form>
        </div>
    )
}
