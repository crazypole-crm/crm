import React from "react";
import ReactDOM from "react-dom";
import { verify } from "../../core/verify";

interface IProps {
    parentId: string,
    children : React.ReactNode
}

const Portal : React.FC<IProps> = ( { children, parentId } : IProps ) => {
    const layer = verify(document.getElementById(parentId))

    return ReactDOM.createPortal(children, layer)
}

export {
    Portal,
}