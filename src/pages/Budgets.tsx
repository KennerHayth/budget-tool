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

type AllocationData = {
    Category:string;
    CategoryID:number;
    Allocated:number
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



const initialData: AllocationData[] = []


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
    const [savedData, setSavedData] = useState(initialData)
    // const [loading, setLoading] = useState(false)
    const [newRow, setNewRow] = useState(-1)
    const[editing,setEditing] = useState(false)
    const [editingCell, setEditingCell] = useState<{CategoryID:number, field: keyof AllocationData} | null>(null)


    const allocatedtotal = savedData.reduce((sum,row) => sum + (row.Allocated), 0)

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


    async function handleNewRow(){
        setNewRow(prev => prev - 1)
        setEditing(true)
        setSavedData(prevItems => [...prevItems,{Category:"Name Here",CategoryID:newRow,Allocated:0} ])
    }

    const updateCell = (categoryID: number, field: keyof AllocationData, value: string | number) => {
        setSavedData(prev =>
            prev.map((row) =>
                row.CategoryID === categoryID ? { ...row, [field]: value } : row
            )
        )
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
                        {savedData.map((row) =>(
                            <tr key={row.CategoryID}>
                    <td style={{cursor:"pointer"}} onClick={() => setEditingCell({ CategoryID: row.CategoryID, field: 'Category' })}>
                        {editingCell?.CategoryID === row.CategoryID && editingCell?.field === 'Category'
                            ? <input
                                autoFocus
                                value={row.Category}
                                onChange={e => updateCell(row.CategoryID, 'Category', e.target.value)}
                                onBlur={() => setEditingCell(null)}
                            />
                            : row.Category
                        }
                    </td>

                    <td style={{cursor:"pointer"}} onClick={() => setEditingCell({ CategoryID: row.CategoryID, field: 'Allocated' })}>
                        {editingCell?.CategoryID === row.CategoryID && editingCell?.field === 'Allocated'
                            ? <input
                                autoFocus
                                type="number"
                                value={row.Allocated}
                                onChange={e => updateCell(row.CategoryID, 'Allocated', Number(e.target.value))}
                                onBlur={() => setEditingCell(null)}
                            />
                            : row.Allocated + "%"
                        }
                    </td>
                                <td>{((row.Allocated/100) * income).toLocaleString("en-US")}</td>
                            </tr>
                        ))}
                        <tr>
                            <td style= {{cursor:"pointer"}}>
                                <button
                                onClick = {() => handleNewRow()}
                                >Add Row</button>
                            </td>
                            {/* empty data to ensure whole row is highlighted when hovering */}
                            <td></td>
                            <td></td>       
                        </tr>
                    </tbody>
                    </table>
                </div>
                <div className= "savechanges">
                {editing && (
                <button onClick = {() => {}} >Save Edits</button>)}
                </div>
            </div>
            )}
        </PageLayout>
    )
}
