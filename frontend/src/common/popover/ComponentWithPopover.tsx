import { Popover, PopoverProps } from "antd";

type ComponentWithPopoverProps = {
    popoverProps: PopoverProps,
    children: JSX.Element,
}

function ComponentWithPopover({
    popoverProps,
    children,
}: ComponentWithPopoverProps) {
    return (
        <Popover {...popoverProps}>
            {children}
        </Popover>
    )
}

export {
    ComponentWithPopover,
}