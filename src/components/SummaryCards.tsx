import { type LucideIcon } from "lucide-react"


type direction = {
    dir: "up" | "down" | "neutral"
}

interface CardData{
    label:string;
    value:string;
    sub:string;
    trend: direction;
    icon ?:LucideIcon;
    iconBG ?: string;
    iconColor ?:string;

// }

// const cards: CardData[] = [
//     {
        
//     }
// ]