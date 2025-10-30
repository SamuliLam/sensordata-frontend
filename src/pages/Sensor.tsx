//import { useParams } from "react-router-dom";
import { Dashboard } from "@/components/Dashboard";

interface SensorDataProps {
  dsb_link: String;
  styles?: string;
}

export const SensorData = ({ styles }: { styles?: string }) => {
  // Uncomment for dynamic sensorId in the future:
  // const { sensorId } = useParams<{ sensorId: string }>();
  // const dsb_link = `http://localhost:3000/dashboard/snapshot/${sensorId}`;
  const defaultClasses = "grow rounded-md shadow-light-shadow-sm h-full";
  const dsb_link = `http://localhost:3000/dashboard/snapshot/v3UwaQsLVEH3dUdgQtnKhGJZZv9GjZVk`;

  return <Dashboard dsb_link={dsb_link} styles={"w-full h-full"} />;
};
