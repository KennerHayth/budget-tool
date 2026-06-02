interface KPICardProps {
    title:string,
    display:string,
    textclass?:string
}


export default function KPICard({title,display,textclass}:KPICardProps){
const titleClass = textclass || ""

    return(
    <div className="KPIcard">
    <p className={titleClass}>{title}</p>
    {display}
    
    </div>

    )
}

