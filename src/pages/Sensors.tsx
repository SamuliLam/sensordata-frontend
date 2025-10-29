import {Dashboard} from "@/components/Dashboard.tsx";

export const Sensors = () => {
    return (
        <div className="dashboard-container flex flex-col gap-3 justify-center items-center grow h-full p-2">
            <Dashboard styles={"w-full"} dsb_link={"http://localhost:3000/dashboard/snapshot/WnwuekcHO6jAIz85G2pFXp1ANhisryWc"}>
            </Dashboard>
        </div>
    )
}