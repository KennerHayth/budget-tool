import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginPage from "./pages/Login"
import Homepage from "./pages/Homepage"
import Register from "./pages/Register"

export default function App(){
    return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/Home" element={<Homepage/>}/>
        <Route path="/Register" element={<Register/>}/>

    </Routes>
    </BrowserRouter>
    )
}