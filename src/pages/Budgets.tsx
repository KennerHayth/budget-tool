import { useState } from "react"
import Sidebar from "../components/Sidebar"
// import Greeting from "../components/Greeting"

const mockdata = [
    {Category: "cat 1", Allocated:5},
    {Category: "cat 2", Allocated:12},
    {Category: "cat 3", Allocated:42},
    {Category: "cat 4", Allocated:15},
    {Category: "cat 5", Allocated:26},

]

const income = (100000)

const allocatedtotal = mockdata.reduce((sum,row) => sum + (row.Allocated), 0)

const allocatedmoney = ((allocatedtotal/100) * income)


const list = ["budget 1", "budget 2", "budget 3","budget 10"]


export default function Budgets() {
const [selectedBudget,setSelectedBudget] = useState("")

    return(
        <div style={{display:"flex", gap: "1rem"}}>
            
            {/* sidebar */}
           <Sidebar/>
            <div className = "budgetcontent">
            <div className = "budgetselection">
                {/* generate based on user's budgets that have been made. default will be create new budget if no budgets are available */}
                <select
                value = {selectedBudget}
                onChange = {(e) => setSelectedBudget(e.target.value)}>
                    <option value="">-- select a budget --</option>
                    {list.map((budget) => (
                        <option key={budget} value = {budget}>
                            {budget}
                        </option>
                    ))}
                </select>

                {/* button to create new budget */}
                <button>
                Create Budget
                </button>
            </div>
            
            {selectedBudget && (
            <div>
                {/* cards */}
                <div className = "budgetcardparent">
                    <div className="budgetcard">
                        <p>Projected Income</p>
                        ${income.toLocaleString("en-US")}
                        
                        </div>
                    <div className="budgetcard">
                        {allocatedtotal != 100 ?<div className="budgetcardalert">Total % Allocated</div> :<p>Total % Allocated</p>}
                        {allocatedtotal}%
                        
                        </div>
                    <div className="budgetcard">
                        {allocatedtotal != 100 ?<div className="budgetcardalert">Total $ Allocated</div> :<p>Total $ Allocated</p>}
                        ${allocatedmoney.toLocaleString("en-US")}
                        
                        </div>
                </div>
                {/* table */} 
                <div className= "budgettableparent">
                    <table>
                    <thead>
                        <tr>
                        <th>Category</th>
                        <th>% Allocated</th>
                        <th>$ Amount</th>
                        </tr>
                    </thead>
                    <tbody >
                        {mockdata.map((row) =>(
                            <tr key={row.Category}>
                                <td>{row.Category}</td>
                                <td>{row.Allocated}</td>
                                <td>{((row.Allocated/100) * income).toLocaleString("en-US")}</td>
                            </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
            </div>
            )}

        </div>

            


        </div>
    )
}
