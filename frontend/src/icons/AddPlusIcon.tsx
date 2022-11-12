import { IconPropsType } from "./IconPropsType";


function AddPlusIcon(props?: IconPropsType) {
    return (
        <svg viewBox="0 0 51 51" {...props} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M25.0713 3.95825C12.9912 3.95825 3.19629 13.7532 3.19629 25.8333C3.19629 37.9133 12.9912 47.7083 25.0713 47.7083C37.1514 47.7083 46.9463 37.9133 46.9463 25.8333C46.9463 13.7532 37.1514 3.95825 25.0713 3.95825ZM25.0713 43.9973C15.042 43.9973 6.90723 35.8625 6.90723 25.8333C6.90723 15.804 15.042 7.66919 25.0713 7.66919C35.1006 7.66919 43.2354 15.804 43.2354 25.8333C43.2354 35.8625 35.1006 43.9973 25.0713 43.9973Z" fill="currentColor"/>
            <path d="M34.0557 24.2708H26.6338V16.8489C26.6338 16.634 26.458 16.4583 26.2432 16.4583H23.8994C23.6846 16.4583 23.5088 16.634 23.5088 16.8489V24.2708H16.0869C15.8721 24.2708 15.6963 24.4465 15.6963 24.6614V27.0051C15.6963 27.22 15.8721 27.3958 16.0869 27.3958H23.5088V34.8176C23.5088 35.0325 23.6846 35.2083 23.8994 35.2083H26.2432C26.458 35.2083 26.6338 35.0325 26.6338 34.8176V27.3958H34.0557C34.2705 27.3958 34.4463 27.22 34.4463 27.0051V24.6614C34.4463 24.4465 34.2705 24.2708 34.0557 24.2708Z" fill="currentColor"/>
        </svg>
    )
}

export {
    AddPlusIcon,
}