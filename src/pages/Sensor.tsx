//import { useParams } from "react-router-dom";
import { useParams } from "react-router-dom";

interface SensorDataProps {
  dsb_link: String;
  styles?: string;
}

export const SensorData = ({ styles }: { styles?: string }) => {
  const { sensorId } = useParams<{ sensorId: string }>();
  const defaultClasses = "grow rounded-md shadow-light-shadow-sm h-full";
  const dsb_link = `http://localhost:3000/d/ad6d5kp/sensori-kohtainen-nakyma?orgId=1&timezone=browser&var-SensorID=${sensorId}`;

  return (
    <iframe
      title="Dashboard"
      src={dsb_link}
      className={`${defaultClasses} ${styles}`}
    ></iframe>
  );
};
