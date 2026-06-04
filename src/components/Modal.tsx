import type { ReactNode } from "react"

interface modalProps{
    children:ReactNode
    isOpen:boolean
    style?:string
}

export default function BaseModal({children,isOpen,style}:modalProps){

    const styleclass = style || ""

    return(
        <dialog open={isOpen} className={styleclass}>
            {children}
        </dialog>
    )
}