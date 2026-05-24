import Sidebar from "../components/Sidebar"
// import Greeting from "../components/Greeting"

export default function Budgets() {
    return(
        <div style = {{display:"flex",height:"100vh"}}>
            
            
            {/* sidebar */}
            <div style = {{}}>
                <Sidebar/>
            </div>
            <main style={{flex:1}}>

            <div style={{display:"flex", justifyContent:"space-between",alignItems:"center"}}>
                {/* generate based on user's budgets that have been made. default will be create new budget if no budgets are available */}
                <select style ={{width:"50vw", height:"2vh"}}>
                    <option>option 1</option>
                    <option>option 2</option>
                </select>

                {/* button to create new budget */}
                <button style ={{}}>
                Create Budget
                </button>
            </div>


            {/* cards for % allocated, % unallocated and predicted $ */}
            <div style ={{display:"flex", gap:"10px"}}>
            
            <div>Card 1</div>
            <div>Card 2</div>
            <div>Card 3</div>

            </div>

            <div>
            {/* table with budget categories, % allocated, and $ value of predicated income */}
            <table>
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>% Allocated</th>
                        <th>$ Amount</th>
                    </tr>
                </thead>

                <tbody>
                {/* generate table data here */}
                <td>test</td>
                <td>30%</td>
                <td>15$</td>

                </tbody>
            </table>


            </div>

            </main>


        </div>
    )
}
