import {Dashboard} from "@/components/Dashboard.tsx";

export const Sensors = () => {
    return (
        <div className="dashboard-container flex flex-col gap-3 justify-center items-center grow  w-full p-10">
            <Dashboard
                styles="w-full"
                dsb_link={"http://localhost:3000/d/adxdfcs/humidity?orgId=1&from=2025-12-02T11:19:30.543Z&to=2025-12-02T17:19:30.543Z&timezone=browser&viewPanel=panel-1"}>
            </Dashboard>
        </div>
    )
}