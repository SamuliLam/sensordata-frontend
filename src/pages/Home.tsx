import {Dashboard} from "@/components/Dashboard.tsx";

export const Home = () => {
    return (
        <div className="flex flex-col gap-3 justify-center items-center mt-4">
            <Dashboard dsb_link={"http://localhost:3000/d-solo/f48bae0c-e998-4040-b62a-fd8f5d979c90/test1?orgId=1&from=1761095291659&to=1761116891659&timezone=browser&showCategory=Map%20view&panelId=2&__feature.dashboardSceneSolo=true"}></Dashboard>
            <Dashboard dsb_link={"http://localhost:3000/d-solo/f48bae0c-e998-4040-b62a-fd8f5d979c90/test1?orgId=1&from=1761094002550&to=1761115602550&timezone=browser&theme=dark&panelId=1&__feature.dashboardSceneSolo=true"}></Dashboard>
        </div>
    )
}