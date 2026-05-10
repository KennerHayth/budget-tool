import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { useAuth } from "../Auth/UseAuth"


interface ButtonProps{
    onClick: () => void
}


function LoginButton({onClick}: ButtonProps){
    return <button onClick={onClick}>Login</button>
}    

const API_URL = "http://localhost:8000"

export default function LoginPage(){

    const navigate = useNavigate()
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [error, setError] = useState("")

    const { refresh } = useAuth()  // add this


    const handleLogin = async () => {
        if (!username || !password){
            setError("please enter your username and password")
            return
        }
        try{
        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        });

        if (response.status ===401){
            setError("invalid username or password")
            return
        } if (response.status ===403){
            setError("Your account has been locked")
            return
        } 
        if (response.status ===404){
            setError("invalid username or password")
            return
        } 

        await refresh()
        navigate("/home")
        } catch {
            setError("could not connect to server")
        }
    }


    return(
    <div style = {{display:"grid", gridTemplateColumns:"40% 60%"}}>

        <div style = {{background:"#333131"}}><h1>Placeholder</h1></div>

        <div style = {{
            display:"flex",
            flexDirection:"column",
            background:"#56b5f5", 
            height:"100vh", 
            alignItems:"center", 
            justifyContent:"center"}}>

            <h1 style = {{}}>Welcome</h1>
            <p style = {{color:"white"}}>log in or register below</p>
            {error && <p style={{color:"red"}}>{error}</p>}

        
            
            <div style={{ 
                display: "flex", 
                flexDirection: "column", 
                padding: "15px 20px", 
                alignItems: "center", 
                gap: "12px"   
                }}>

                <input style = {{maxHeight:"4vh", maxWidth:"30vh"}}
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username"
                />

                <input style = {{maxHeight:"4vh", maxWidth:"30vh"}}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                />
                
                <LoginButton onClick={handleLogin}/>

                <p><Link to="/Register" style = {{color:"white"}}> register new account</Link> </p>

                
            </div>
        </div>

        


    </div>)
    
}

