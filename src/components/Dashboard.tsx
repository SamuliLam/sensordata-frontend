export const Dashboard = ({ dsb_link }: { dsb_link: string }) => {
    return (
        <iframe
            title="Dashboard"
            src={dsb_link}
            width="1000" height="400" frameBorder="0" className={"rounded-md"}>
        </iframe>
    )
}