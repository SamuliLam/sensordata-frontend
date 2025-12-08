import {Dashboard} from "@/components/Dashboard.tsx";
import { config } from "@/config";

export const Sensors = () => {
    const dsb_link = config.grafana.dashboards.overview();
    return (

        <div className="dashboard-container flex flex-col gap-3 justify-center items-center grow w-full p-2">
            <Dashboard
                styles="w-full"
                dsb_link={dsb_link}>
            </Dashboard>
        </div>
    )
}