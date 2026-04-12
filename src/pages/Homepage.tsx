import Sidebar from "../components/Sidebar"
import Greeting from "../components/Greeting"

export default function Homepage() {
    return(
        <div style = {{display:"grid",gridTemplateColumns:"200px 1fr", background:"#272B33",overflow:"visible"}}>
            <div style = {{
            }}>
                <Sidebar/>
            </div>
            <div style = {{display:"grid"}}>
                <div>
                    <Greeting/>
                </div>
            </div>
            <h1>test</h1>
        </div>
    )
}
