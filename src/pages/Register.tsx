import { useState } from "react"
import { useNavigate } from "react-router-dom";

interface ButtonProps{
    onClick: () => void
}


function SubmitButton({onClick}: ButtonProps){
    return <button onClick={onClick}>Submit</button>
}    

const API_URL = "http://127.0.0.1:8000"





export default function Register(){ 
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState("");
    const navigate = useNavigate()



    const handleRegister = async () => {
        if (!username || !password){
            setError("please enter your username and password")
            return
        }
        try{
        const checkresponse = await fetch(
            `${API_URL}/user/existing?username=${username}`
        )

        if (checkresponse.status ===401){
            setError("username already in use")
            return
        } 
        if (!checkresponse.ok) {
            setError("unknown error occurred")
            return
        }

        const createResponse = await fetch(`${API_URL}/user/create`, {
            method:"POST",
            headers:{"Content-Type" : "application/json"},
            body : JSON.stringify({ user: username, password: password, locked: false, admin: false 
            })
        })

    

        if (createResponse.status === 422){
            setError("please enter a valid email address")
            return
        }

        if (!createResponse.ok) {
        setError("something went wrong")
        return
        }

        navigate("/")
        } catch {
            setError("could not connect to server")
        }
    }



    return(
        <div>
            <div>
                <h1>Please Register Below</h1>
                {error && <p style={{color:"red"}}>{error}</p>}
            </div>

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
            
            <SubmitButton onClick={handleRegister}/>

            </div>
        </div>
    )}

