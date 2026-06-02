import { useState } from "react"
import Sidebar from "../components/Sidebar"
// import Greeting from "../components/Greeting"

const placeholder = 10

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
                    <div className="budgetcard">{placeholder}</div>
                    <div className="budgetcard">{placeholder}</div>
                    <div className="budgetcard">{placeholder}</div>
                </div>
                {/* table */} 
                <div className= "budgettableparent">
                    <table>
                    <thead className = "budgettablehead">
                        <tr>
                        <th>Category</th>
                        <th>% Allocated</th>
                        <th>$ Amount</th>
                        </tr>
                    </thead>
                    <tbody className = "budgettablebody">
                        <tr>
                        <td>test</td>
                        <td>30%</td>
                        <td>$15</td>
                        </tr>
                    </tbody>
                    </table>
                </div>
            </div>
            )}

        </div>

            


        </div>
    )
}
