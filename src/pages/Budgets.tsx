import {useEffect,useState } from "react"
import KPICard from "../components/KPICard"
import PageLayout from "../components/PageLayout"
import BaseModal from "../components/Modal"
// import Greeting from "../components/Greeting"
const API_URL = "http://localhost:8000"

type BudgetData = {
    userid: number;
    budgetid: number;
    name: string
}

async function currentBudgets(){
    const response = await fetch(
        `${API_URL}/budgets`,{
            method:"GET",
            credentials:"include",
            headers:{"content-type":"application/json"},
        }
    )
    const data:BudgetData[] = await response.json()
    return (data)
}

const income = (100000)


type AllocationData = {
    Category:string;
    Allocated:number
}
const allocationData: AllocationData[] = []


// TESTING DATA

// calculations
// const allocatedtotal = allocationData.reduce((sum,row) => sum + (row.Allocated), 0)

// const allocatedmoney = ((allocatedtotal/100) * income)
// calculations

export default function Budgets() {
    const [selectedBudget,setSelectedBudget] = useState("")
    const [isOpen, setIsOpen] = useState(false)
    const [newBudget, setNewBudget] = useState("")
    const [budgetArray, setBudgetArray] = useState<BudgetData[]>([])

    const [allocations, setAllocations] = useState(allocationData)


    const allocatedtotal = allocations.reduce((sum,row) => sum + (row.Allocated), 0)

    const allocatedmoney = ((allocatedtotal/100) * income)


    useEffect(() => {
        const load = async () => {
            const data = await currentBudgets()
            setBudgetArray(data)
        };
        load()
    }, [])


    async function createbudget(){
        const response = await fetch(
            `${API_URL}/budgets`, {
            method:"POST",
            headers:{"content-type":"application/json"},
            credentials:"include",
            body:JSON.stringify({
                "name":newBudget
            })
            }
        )
        if (!response.ok) {
            throw new Error (`Request failed : ${response.status}`)
        }
        const data = await response.json()
        return(data)
    }

    async function handleModal() {
        const result = await createbudget()
        setBudgetArray(prevItems =>[...prevItems, result])
        setIsOpen(false)
        return (result)
    }   





    return(
        <PageLayout>
            <div className = "budgetselection">
                {/* generate based on user's budgets that have been made. default will display create new budget if no budgets are available */}
                <select
                className = "budgetselector"
                value = {selectedBudget}
                onChange = {(e) => setSelectedBudget(e.target.value)}>
                    <option value="">-- select a scenario --</option>
                    {budgetArray.map((b) => (
                        <option key={b.budgetid} value = {b.name}>
                            {b.name}
                        </option>
                    ))}
                </select>

                {/* button to create new budget */}
                <button className = "createbutton" onClick = {() => {setIsOpen(prev => !prev)}}>
                Create scenario
                </button>

                <BaseModal isOpen={isOpen}>
                <p>Please Insert the information below</p>
                <input type= "text" 
                placeholder = "Strategy Title"
                value={newBudget}
                onChange = {(e) => setNewBudget(e.target.value)}
                ></input>
                <button onClick={() => (handleModal())}>submit</button>
                </BaseModal>
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
                        {allocations.map((row) =>(
                            <tr key={row.Category}>
                                <td>{row.Category}</td>
                                <td>{row.Allocated + "%"}</td>
                                <td>{((row.Allocated/100) * income).toLocaleString("en-US")}</td>
                            </tr>
                        ))}
                        <tr>
                            <td style= {{cursor:"pointer"}}>
                                <button
                                onClick = {() => setAllocations(prevItems => [...prevItems,{Category:"Name Here",Allocated:0} ])}
                                >Add Row</button>
                            </td>
                            {/* empty data to ensure whole row is highlighted when hovering */}
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
