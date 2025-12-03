interface DashboardProps {
    dsb_link: string;
    styles?: string;
    refreshKey?: number;
}

export const Dashboard = ({ dsb_link, styles, refreshKey = 0 }: DashboardProps) => {
    const defaultClasses = "grow rounded-md shadow-light-shadow-sm"

    return (
        <iframe
            key={String(refreshKey)}
            title="Dashboard"
            src={dsb_link}
            className={ `${defaultClasses} ${styles}`}>
        </iframe>
    )
}