import Sidebar from "../components/Sidebar"

export default function Homepage() {
    return(
        <div style = {{display:"grid",gridTemplateColumns:"200px 1fr 1fr", background:"#272B33",overflow:"visible"}}>
            <div style = {{
            }}>
                <Sidebar/>
            </div>
            <div style = {{display:"grid",gridTemplateColumns:"1fr 1fr"}}>
                <div>
                    <h1>Welcome!</h1>
                    <p>placeholder2</p>
                </div>
              <div>
                    <h1>placeholder</h1>
                    <p>placeholder2</p>
                </div>
            </div>
            <h1>test</h1>
        </div>
    )
}
