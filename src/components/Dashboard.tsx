interface DashboardProps {
    dsb_link: string;
    styles?: string;
}

export const Dashboard = ({ dsb_link, styles }: DashboardProps) => {
    const defaultClasses = "grow rounded-md shadow-light-shadow-sm"

    return (
        <iframe
            title="Dashboard"
            src={dsb_link}
            className={ `${defaultClasses} ${styles}`}>
        </iframe>
    )
}