import { Dashboard } from "@/components/Dashboard.tsx";
import { AddSensor } from "@/components/AddSensor.tsx";
import { RemoveSensor} from "@/components/RemoveSensor.tsx";

export const Home = () => {
    return (
        <div className="flex flex-col md:flex-row h-full w-full p-4">

                {/* Left panel — AddSensor */}
                <div className="w-full md:w-1/5 flex-col md:min-w-[250px] space-y-8 mb-4 md:mb-0 md:mr-4 pb-4">
                    <AddSensor />
                    <RemoveSensor />
                </div>




            {/* Right panel — Dashboards */}
            <div className="dashboard-container flex flex-col gap-3 justify-center items-center grow h-full p-2 ">
                <Dashboard
                    styles="w-full md:w-4/5"
                    dsb_link="http://localhost:3000/d-solo/f48bae0c-e998-4040-b62a-fd8f5d979c90/test1?orgId=1&from=1761095291659&to=1761116891659&timezone=browser&theme=light&showCategory=Map%20view&panelId=2&__feature.dashboardSceneSolo=true"
                />
                <Dashboard
                    styles="w-full md:w-4/5"
                    dsb_link="http://localhost:3000/d-solo/f48bae0c-e998-4040-b62a-fd8f5d979c90/test1?orgId=1&from=1761094002550&to=1761115602550&timezone=browser&theme=light&panelId=1&__feature.dashboardSceneSolo=true"
                />
            </div>
        </div>
            );
};
