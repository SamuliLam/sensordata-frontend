import { Dashboard } from "@/components/Dashboard.tsx";
import { AddSensor } from "@/components/AddSensor.tsx";
import { RemoveSensor} from "@/components/RemoveSensor.tsx";
import { LoadHistory} from "@/components/LoadHistory.tsx";

export const Home = () => {
    const map_dsb = "http://localhost:3000/d-solo/adkrpm5/sensor-dashboard-copy?orgId=1&from=1762994512250&to=1763016112250&timezone=browser&theme=light&panelId=panel-2&__feature.dashboardSceneSolo=true"
    const table_dsb = "http://localhost:3000/d-solo/adqrfsn/new-dashboard?orgId=1&from=1764139653048&to=1764141778639&timezone=browser&var-SensorID=DD42FA122ACD&tab=queries&showCategory=Panel%20options&var-query0=ymparistomoduuli&var-SensorType=ymparistomoduuli&editIndex=0&theme=light&panelId=2&__feature.dashboardSceneSolo=true"
    return (
        <div className="flex flex-col md:flex-row w-full grow p-4">

            {/* Left panel — AddSensor */}
            <div className="w-full md:w-1/5 flex-col md:min-w-[250px] space-y-8 mb-4 md:mb-0 md:mr-4">
                <AddSensor />
                <RemoveSensor />
            </div>

            {/* Right panel — Dashboards */}
            <div className="dashboard-container flex flex-col gap-3 items-center grow mx-auto md:max-w-6/9">
                <div className="flex self-start ">
                    <LoadHistory />
                </div>
                <Dashboard
                    styles="w-full"
                    dsb_link={map_dsb}
                />
                <Dashboard
                    styles="w-full"
                    dsb_link={table_dsb}
                />
            </div>
        </div>
    );
};
