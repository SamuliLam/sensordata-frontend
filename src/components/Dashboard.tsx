interface DashboardProps {
    dsb_link: string;
    styles?: string;
    refreshKey?: number;
}

export const Dashboard = ({ dsb_link, styles, refreshKey = 0  }: DashboardProps) => {
    const defaultClasses = "grow rounded-md shadow-light-shadow-sm"

    const to = Date.now();
    const from = new Date();
    from.setMonth(from.getMonth() - 1);

    const new_dsb_url = `${dsb_link}&from=${from.getTime()}&to=${to}`;

    return (
        <iframe
            key={String(refreshKey)}
            title="Dashboard"
            src={new_dsb_url}
            className={ `${defaultClasses} ${styles}`}>
        </iframe>
    )
}