import { useParams } from "react-router-dom";
import {useAuthenticatedUser} from "@/hooks/useAuthenticatedUser.ts";
import {Dashboard} from "@/components/Dashboard.tsx";

export const SensorData = () => {
  const { sensorId } = useParams<{ sensorId: string }>();
  const { accessToken } = useAuthenticatedUser();

  const dsb_link = `/grafana/d/ad6d5kp/sensori-kohtainen-nakyma?orgId=1&timezone=browser&kiosk&theme=light&var-SensorID=${sensorId}&auth_token=${accessToken}`;

  return (
      <Dashboard
          styles="w-full p-2"
          dsb_link={dsb_link}
          theme="light"
      />
  );
};
