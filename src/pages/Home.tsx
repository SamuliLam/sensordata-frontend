import { Dashboard } from "@/components/Dashboard.tsx";
import { AddSensor } from "@/components/AddSensor.tsx";
import { RemoveSensor } from "@/components/RemoveSensor.tsx";
import { LoadHistory } from "@/components/LoadHistory.tsx";
import {useState} from "react";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import { columns, type Sensor } from "@/components/ui/columns.tsx";
import { DataTable } from "@/components/ui/data-table.tsx";


interface SensorApiResponse {
    status: string;
    message: string;
    data: Sensor[];
}


export async function getTableData(): Promise<Sensor[]> {
    const response = await fetch("http://localhost:8080/api/sensor_metadata", {
        method: "GET",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch sensor data");
    }

    const json: SensorApiResponse = await response.json();
    return json.data;
}


export const Home = () => {
    const queryClient = useQueryClient();


    const { data, error, isLoading } = useQuery({
        queryKey: ["sensor_metadata"],
        queryFn: getTableData,
    });

    const [dashboardRefreshKey, setDashboardRefreshKey] = useState(0);


    const refreshEverything = () => {
        setDashboardRefreshKey(prev => prev + 1);

        queryClient.invalidateQueries({
            queryKey: ["sensor_metadata"],
        });
    };

    const map_dsb = "http://localhost:3000/d-solo/ad8fclh/main-dashboard?orgId=1&from=1764683710414&to=1764705310414&timezone=browser&theme=light&panelId=panel-2&__feature.dashboardSceneSolo=true";


    return (
        <div className="flex flex-col md:flex-row w-full grow p-4">

            {/* Left panel — Add/Remove Sensor */}
            <div className="w-full md:w-1/5 flex-col md:min-w-[250px] space-y-8 mb-4 md:mb-0 md:mr-4 p-3 pt-14">

                {/* Pass refresh callback to AddSensor */}
                <AddSensor onSensorAdded={refreshEverything} />
                <RemoveSensor onSensorRemoved={refreshEverything}/>
            </div>

            {/* Right panel — Dashboards + DataTable */}
            <div className="dashboard-container flex flex-col gap-3 items-center grow mx-auto md:max-w-7/9 p-2" >
                <div className="flex self-start ">
                    <LoadHistory />
                </div>
                <Dashboard
                    styles="w-full"
                    dsb_link={map_dsb}
                    refreshKey={dashboardRefreshKey}
                />

                {isLoading && <p>Loading sensor data...</p>}
                {error && <p>Error fetching sensor data: {(error as Error).message}</p>}
                {!isLoading && !error && (
                    <DataTable columns={columns} data={data ?? []} />
                )}

            </div>
        </div>
    );
};
