import './Settings.css'
import Sidebar from "../../components/sidebar/Sidebar"
import { useContext } from 'react';
import { Context } from '../../context/Context';
import { useState } from 'react';
import axios from 'axios';

export default function Settings() {
    const { user,dispatch } = useContext(Context);
    const PF = "http://localhost:5000/images/"
    
    const [file, setFile] = useState(null);
    const [username,setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false)

    const handleSubmit = async (e) => {
        dispatch({type:"UPDATE_START"})
        e.preventDefault();
        const updatedUser = {
            userId: user._id,
            username,
            email,
            password


        };
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append('name',filename);
            data.append('file',file);
            updatedUser.ProfilePic = filename;
            try {
                await axios.post("/upload", data);
            } catch (err) { }
        }
        try {
            const res = await axios.put("/users/" + user._id, updatedUser);
            setSuccess(true)
            dispatch({type:"UPDATE_START", payload:res.data})
        } catch (err) { 
            dispatch({type:"UPDATE_FAILURE"})
        }
    };
    return (
        <div className="settings">
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingsTitleUpdate">Update your Account</span>
                    <span className="settingsTitleDelete">Delete your Account</span>
                </div>
                <form className="settingsForm" onSubmit={handleSubmit}>
                    <label >Profile Picture</label>
                    <div className="settingsPP">
                        <img className='settingsImg' 
                        src={file? URL.createObjectURL(file) : PF + user.ProfilePic} 
                        alt="" 
                        />
                        <label htmlFor="fileInput">
                            <i className="settingPPIcon fas fa-user-circle"></i>
                        </label>
                        <input type="file" id='fileInput' style={{ display: 'none' }} onChange={(e) => setFile(e.target.files[0])} />
                    </div>
                    <label >Username </label>
                    <input type="text" placeholder={user.username} onChange={e=>setUsername(e.target.value)}/>
                    <label >Email </label>
                    <input type="email" placeholder={user.email} onChange={e=>setEmail(e.target.value)}/>
                    <label >Password </label>
                    <input type="password" onChange={e=>setPassword(e.target.value)}/>
                    <button className="settingsSubmitButton" type="submit">Update</button>
                    { success && <span style={{textAlign:"center",marginTop:"20px"}} >Profile Updated..</span>}
                </form>
            </div>
            <Sidebar />
        </div>
    )
}
