import { useState } from "react";
import { type LucideIcon, ArrowLeftRight, Home, LayoutDashboard, LogOut, PiggyBank, Receipt, Settings, User} from "lucide-react";


interface ButtonProps{
    title:string;
    icon: LucideIcon;
    onClick: () => void;
    active?: boolean;
}

function FunctionalButton({icon : Icon,title,onClick, active}:ButtonProps){
    return <button style = {{
        display:"flex",
        alignItems:"center",
        gap:8,
        borderRadius: 6,
        background:active ?"#272B33" : "transparent",
        border:"none", 
        borderLeft: active ?"3px solid #0049f5" : "transparent",
        padding:"0 12px",
        color: active ? "#ffffff" : "#9ca3af",
        width:"160px", 
        height:"40px",
        cursor:"pointer",
        transition: "background 0.12s"
    }} 
        onClick={onClick}><Icon size={15} style={{ opacity: active ? 1 : 0.7, flexShrink: 0 }}/>{title}</button>
}

const navItems = [
    {title:"Home", icon:Home}, 
    {title:"Dashboard", icon: LayoutDashboard}, 
    {title:"Budgets", icon:PiggyBank}, 
    {title:"Bills", icon:Receipt},
    {title:"Transactions", icon:ArrowLeftRight}];

const bottomItems = [
    {title:"Profile", icon:User},
    {title: "Settings", icon:Settings},
    {title:"Logout", icon:LogOut}];


export default function Sidebar(){
    const [active, setActive] = useState("Home");

    return(
        
        <div style = {{
            height:"100vh",
            width:"200px",
            display: "flex",
            flexDirection: "column",
            color:"#EDEAE4",
            background:"#1E2128",
            alignItems:"center",
            boxSizing: "border-box",
            borderRight:"3px solid #3F4553"
            }}>

            <div style ={{
                display:"flex",
                flexDirection:"column",
                gap:"8px",
                marginTop:"3vh"}}>

            {navItems.map((item) => (
                    <FunctionalButton
                    key={item.title}
                    icon = {item.icon}
                    title={item.title}
                    active={active === item.title}
                    onClick={() => setActive(item.title)}
                    />
                ))}
            </div>

            <div style = {{
                display:"flex",
                flexDirection:"column",
                gap:"15px",
                marginTop:"auto",
                marginBottom:"3vh",
                paddingTop:"10px",
                borderTop:"1px solid #3F4553"}}>

                {bottomItems.map((item) => (
                    <FunctionalButton
                    key={item.title}
                    icon = {item.icon}
                    title={item.title}
                    active={active === item.title}
                    onClick={() => setActive(item.title)}
                    />
                ))}
            </div>

        </div>
    )
}