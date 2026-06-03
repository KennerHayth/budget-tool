import { useState } from "react"
import KPICard from "../components/KPICard"
import PageLayout from "../components/PageLayout"
// import Greeting from "../components/Greeting"

// TESTING DATA

const mockdata = [
    {Category: "cat 1", Allocated:5},
    {Category: "cat 2", Allocated:12},
    {Category: "cat 3", Allocated:42},
    {Category: "cat 4", Allocated:15},
    {Category: "cat 5", Allocated:23},

]

const income = (100000)

const list = ["budget 1", "budget 2", "budget 3","budget 10"]

// TESTING DATA

// calculations
const allocatedtotal = mockdata.reduce((sum,row) => sum + (row.Allocated), 0)

const allocatedmoney = ((allocatedtotal/100) * income)
// calculations

export default function Budgets() {
const [selectedBudget,setSelectedBudget] = useState("")

    return(
        <PageLayout>
            <div className = "budgetselection">
                {/* generate based on user's budgets that have been made. default will display create new budget if no budgets are available */}
                <select
                className = "budgetselector"
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
                <button className = "createbutton">
                Create Budget
                </button>
            </div>
            
            {selectedBudget && (
            <div>
                {/* cards */}
                <div className = "budgetcardparent">
                    <div>
                        <KPICard title="Projected Income" display = {String("$"+income.toLocaleString("en-US"))} textclass="budgetcard"/>
                    </div>
                    <div>
                        <KPICard title="Total % Allocated" display={String(allocatedtotal)+"%"} textclass={allocatedtotal != 100 ?"budgetcardalert" : "budgetcard"}/>
                    </div>
                    <div>
                        <KPICard title = "Total $ Allocated" display={String("$" + allocatedmoney.toLocaleString("en-US"))} textclass={allocatedtotal != 100 ?"budgetcardalert" : "budgetcard"}/>
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
                                <td>{row.Allocated + "%"}</td>
                                <td>{((row.Allocated/100) * income).toLocaleString("en-US")}</td>
                            </tr>
                        ))}
                        <tr>
                            <td style= {{cursor:"pointer"}}>
                                Add Row
                            </td>
                            <td></td>
                            <td></td>       
                        </tr>
                    </tbody>
                    </table>
                </div>
            </div>
            )}
        </PageLayout>
    )
}
