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
    categoryID:number;    
    category:string;
    allocation:number
}
// type CategoryData = {
//     categoryid: number;
//     userid: number;
//     category: string}


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


// const initialData: AllocationData[] = []



// TESTING DATA

// calculations
// const allocatedtotal = allocationData.reduce((sum,row) => sum + (row.Allocated), 0)

// const allocatedmoney = ((allocatedtotal/100) * income)
// calculations

export default function Budgets() {

    const [selectedBudget,setSelectedBudget] = useState("")
    // const [refresh, setRefresh] = useState(0)
    const [savedData, setSavedData] = useState<AllocationData[]>([])
    const [isOpen, setIsOpen] = useState(false)
    const [newBudget, setNewBudget] = useState("")
    const [budgetArray, setBudgetArray] = useState<BudgetData[]>([])
    // const [loading, setLoading] = useState(false)
    const [newRow, setNewRow] = useState(-1)
    const[editing,setEditing] = useState(false)
    const [editingCell, setEditingCell] = useState<{CategoryID:number, field: keyof AllocationData} | null>(null)
    // const [savechanges, setSavedChanges] = useState(0)


    const allocatedtotal = savedData.reduce((sum,row) => sum + (row.allocation), 0)

    const allocatedmoney = ((allocatedtotal/100) * income)



    useEffect(() => {
    async function currentAllocations(){
        if(!selectedBudget) return
        const response = await fetch(
            `${API_URL}/budgets/details/${selectedBudget}`,{
                method:"GET",
                credentials:"include",
                headers:{"content-type":"application/json"},
            }
        )
        const data:AllocationData[] = await response.json()
        setSavedData(data ?? [])
        return (data)
    }currentAllocations()}, [selectedBudget])



    useEffect(() => {
        const load = async () => {
            const data = await currentBudgets()
            setBudgetArray(data)
        };
        load()
    }, [budgetArray])


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
        setSavedData(prevItems => [...prevItems,{categoryID:newRow,category:"Name Here",allocation:0} ])
    }

    const updateCell = (categoryID: number, field: keyof AllocationData, value: string | number) => {
        setSavedData(prev =>
            prev.map((row) =>
                row.categoryID === categoryID ? { ...row, [field]: value } : row
            )
        )
    }

    async function updateBudgetDetail(){
        const response  = await fetch(
            `${API_URL}/budgets/details`,{
                method:"POST",
                credentials:"include",
                headers:{"content-type":"application/json"},
                body:JSON.stringify({
                    details:savedData,
                    budgetID:Number(selectedBudget)
                })
            }
        )
        const data  = await response.json()
        // setSavedChanges(prev => prev + 1)

        return(data)
    }





    return(
        <PageLayout>
            <div className = "budgetselection">
                {/* generate based on user's budgets that have been made. default will display create new budget if no budgets are available */}
                <select
                className = "budgetselector"
                value = {selectedBudget}
                onChange = {(e) => {setSelectedBudget(e.target.value)}}>
                    <option key = "default" value="">-- select a scenario --</option>
                    {budgetArray.map((b) => (
                        <option key={b.budgetid} value = {b.budgetid}>
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
                            <tr key={row.categoryID}>
                    <td style={{cursor:"pointer"}} onClick={() => {setEditingCell({ CategoryID: row.categoryID, field: 'category' }); setEditing(true)}}>
                        {editingCell?.CategoryID === row.categoryID && editingCell?.field === 'category'
                            ? <input
                                autoFocus
                                value={row.category}
                                onChange={e => updateCell(row.categoryID, 'category', e.target.value)}
                                onBlur={() => setEditingCell(null)}
                            />
                            : row.category
                        }
                    </td>

                    <td style={{cursor:"pointer"}} onClick={() => {setEditingCell({ CategoryID: row.categoryID, field: 'allocation' }); setEditing(true)}}>
                        {editingCell?.CategoryID === row.categoryID && editingCell?.field === 'allocation'
                            ? <input
                                autoFocus
                                type="number"
                                value={row.allocation}
                                onChange={e => updateCell(row.categoryID, 'allocation', Number(e.target.value))}
                                onBlur={() => setEditingCell(null)}
                            />
                            : row.allocation + "%"
                        }
                    </td>
                                <td>{((row.allocation/100) * income).toLocaleString("en-US")}</td>
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
                <button onClick = {() => {updateBudgetDetail()}} >Save Edits</button>)}
                </div>
            </div>
            )}
        </PageLayout>
    )
}
