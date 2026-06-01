import { useParams } from "react-router-dom";
import {useAuthenticatedUser} from "@/hooks/useAuthenticatedUser.ts";

export const SensorData = ({ styles }: { styles?: string }) => {
  const { sensorId } = useParams<{ sensorId: string }>();
  const { accessToken } = useAuthenticatedUser();

  const defaultClasses = "grow rounded-md shadow-light-shadow-sm h-full";
    const dsb_link = `/grafana/d/adc76n7/sensor?orgId=1&from=now-30d&to=now&timezone=browser&var-SensorID=${sensorId}&var-metric=$__all&refresh=10s&theme=light&kiosk&auth_token=${accessToken}`;

  return (
      <div className="dashboard-container flex flex-col gap-3 justify-center items-center grow w-full p-2">
          <iframe
              title="Dashboard"
              src={dsb_link}
              className={`${defaultClasses} ${styles} w-full`}
          ></iframe>
      </div>
  );
};
