interface DashboardProps {
    dsb_link: string;
    styles?: string;
    refreshKey?: number;
    theme?: string;
}

export const Dashboard = ({ dsb_link, styles, refreshKey = 0, theme }: DashboardProps) => {
    const defaultClasses = "grow rounded-md shadow-light-shadow-sm"

    const themeUrl = theme ? `&theme=${theme}` : ''
    const new_dsb_url = `${dsb_link}&from=now-30d&to=now${themeUrl}`;

    return (
        <iframe
            key={String(refreshKey)}
            title="Dashboard"
            src={new_dsb_url}
            className={ `${defaultClasses} ${styles}`}>
        </iframe>
    )
}