import './About.css'

export default function about() {
    return (
        <div className="container">
            <img src="https://images.pexels.com/photos/589816/pexels-photo-589816.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="" 
            style={{width:"100%",backgroundSize:"contain",height:"100%",objectFit: "cover" }}/>
            
            <div class ="centered">
                <center>
                    <h1>About this Blog</h1>
                    <p> You can Share,Update,Delete your own posts by Registering and Login with valid email and passwords. 
                        Jumpstart to share your posts.<br/> This blog built on MERN stack ,front end designed using react,react components,
                        and backend using express and mongo db Atlas
                    
                    </p>
                </center>

            </div>


        </div>


    )
}
