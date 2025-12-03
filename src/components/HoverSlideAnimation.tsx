export const HoverSlideAnimation = ({color}: {color: string}) => {
    return (
        <span className={`absolute left-1/2 bottom-0 h-0.5 w-0 ${color} transition-all duration-300 ease-out group-hover:w-full group-hover:left-0`}></span>
    )
}