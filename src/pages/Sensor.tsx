import { useParams } from "react-router-dom";

export const SensorData = ({ styles }: { styles?: string }) => {
  const { sensorId } = useParams<{ sensorId: string }>();
  const defaultClasses = "grow rounded-md shadow-light-shadow-sm h-full";
    const dsb_link = `/grafana/d/ad6d5kp/sensori-kohtainen-nakyma?orgId=1&timezone=browser&theme=light&var-SensorID=${sensorId}`;

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
