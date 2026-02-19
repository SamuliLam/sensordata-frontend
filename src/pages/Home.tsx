import { Dashboard } from "@/components/Dashboard.tsx";
import { AddSensor } from "@/components/AddSensor.tsx";
import { RemoveSensor } from "@/components/RemoveSensor.tsx";
import { LoadHistory } from "@/components/LoadHistory.tsx";
import {useState} from "react";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import { columns, type Sensor } from "@/components/ui/columns.tsx";
import { DataTable } from "@/components/ui/data-table.tsx";
import { useSearch } from "@/contexts/SearchContext";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "@/lib/utils";
import { useAuthenticatedUser } from '@/hooks/useAuthenticatedUser.ts'



interface SensorApiResponse {
    status: string;
    message: string;
    data: Sensor[];
}



async function getTableData(token: string): Promise<Sensor[]> {
    const response = await fetch(`${API_BASE_URL}/api/sensors/metadata`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    });

    if (!response.ok) {
        throw new Error("Failed to fetch sensor data");
    }

    const json: SensorApiResponse = await response.json();
    return json.data;
}

export const Home = () => {
    const queryClient = useQueryClient();
    const { searchValue } = useSearch();
    const navigate = useNavigate();
    const { user, accessToken } = useAuthenticatedUser();

    const isAdmin = user?.["https://envidata-api.metropolia.fi/admin"];


    const handleRowClick = (sensor: Sensor) => {
        navigate(`/sensors/${sensor.sensor_id}`);
    };

    const { data, error, isLoading } = useQuery({
        queryKey: ["sensor_metadata"],
        queryFn: async () => {
            if (!accessToken) {
                throw new Error("Access token is not available");
            }
            return getTableData(accessToken);
        },});

    const [dashboardRefreshKey, setDashboardRefreshKey] = useState(0);


    const refreshEverything = () => {
        setDashboardRefreshKey(prev => prev + 1);

        queryClient.invalidateQueries({
            queryKey: ["sensor_metadata"],
        });
    };

    const map_dsb = `/grafana/d-solo/ad8fclh/main-dashboard?orgId=1&timezone=browser&theme=light&panelId=panel-2&__feature.dashboardSceneSolo=true&kiosk&auth_token=${accessToken}`;


    return (
        <div className="flex flex-col md:flex-row w-full justify-center p-4">

            {/* Left panel — Add/Remove Sensor */}
            {isAdmin && (
                <div className="order-2 md:order-1 md:mr-15 w-full md:w-1/5 flex-col md:min-w-[250px] space-y-8 mb-4 md:mb-0 md:ml-4 pt-12">

                    {/* Pass refresh callback to AddSensor */}
                    <AddSensor onSensorAdded={refreshEverything} />
                    <RemoveSensor onSensorRemoved={refreshEverything}/>
                </div>
            )}
            {/* Right panel — Dashboards + DataTable */}

            <div className="dashboard-container order-1 md:order-2 flex flex-col gap-3 items-stretch grow md:max-w-[69%] min-h-[70vh]">
                <div className="flex self-start ">
                    <LoadHistory/>
                </div>
                    <Dashboard
                        styles="w-full min-h-[35vh]"
                        dsb_link={map_dsb}
                        refreshKey={dashboardRefreshKey}
                    />
                {isLoading && <p className="text-center">Loading sensor data...</p>}
                {error && <p className="text-center">Error fetching sensor data: {(error as Error).message}</p>}
                {!isLoading && !error && (
                    <DataTable 
                        columns={columns} 
                        data={data ?? []} 
                        searchFilter={searchValue}
                        onRowClick={handleRowClick}
                    />
                )}

            </div>
        </div>
    );
};
