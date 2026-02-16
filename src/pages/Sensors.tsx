import {Dashboard} from "@/components/Dashboard.tsx";
import {useAuthenticatedUser} from "@/hooks/useAuthenticatedUser.ts";

export const Sensors = () => {
    const { accessToken } = useAuthenticatedUser();
    const dsb_link = `/grafana/d/adlcv8h/yleisnakyma?orgId=1&theme=light&kiosk&auth_token=${accessToken}`;
    return (

        <div className="dashboard-container flex flex-col gap-3 justify-center items-center grow w-full p-2">
            <Dashboard
                styles="w-full"
                dsb_link={dsb_link}>
            </Dashboard>
        </div>
    )
}