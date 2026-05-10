interface GreetingProps{
    name:string
}

export default function Greeting({name}:GreetingProps) {
    const hour = new Date().getHours();
    const timeofDay = hour < 12 ?"morning" : hour < 18 ? "afternoon" : "evening"
    return(
        <div style = {{marginBottom:28}}>
            <p style={{fontSize:"13",color:"#EDEAE4", margin: "0 0 4px"}}>
                Good {timeofDay}!
            </p>
            <p style = {{fontSize:22,color:"#EDEAE4", fontWeight:"bold"}}>
                Welcome back, {name}
            </p>
        </div>
    )
}