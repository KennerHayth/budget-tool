import Sidebar from "./Sidebar"

interface pageProps{
    children: React.ReactNode
}

export default function PageLayout({children}:pageProps) {
    return(
    <div className = "pagemain">
        <Sidebar/>

        <div className = "pagecontent">
            {children}
        </div>
    </div>
    )
}