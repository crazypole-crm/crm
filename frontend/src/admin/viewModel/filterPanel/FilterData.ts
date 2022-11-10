import {ReactNode} from "react";
import {ItemData} from "./ItemData";

export type FilterData = {
    id: string,
    icon?: ReactNode,
    items: ItemData[]
}