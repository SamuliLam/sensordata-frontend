import {Dashboard} from "@/components/Dashboard.tsx";

export const Home = () => {
    return (
        <div className="dashboard-container flex flex-col gap-3 justify-center items-center grow h-full p-2">
            <Dashboard styles={"w-1/2"} dsb_link={"http://localhost:3000/d-solo/f48bae0c-e998-4040-b62a-fd8f5d979c90/test1?orgId=1&from=1761095291659&to=1761116891659&timezone=browser&theme=light&showCategory=Map%20view&panelId=2&__feature.dashboardSceneSolo=true"} ></Dashboard>
            <Dashboard styles={"w-1/2"} dsb_link={"http://localhost:3000/d-solo/f48bae0c-e998-4040-b62a-fd8f5d979c90/test1?orgId=1&from=1761094002550&to=1761115602550&timezone=browser&theme=light&panelId=1&__feature.dashboardSceneSolo=true"}  ></Dashboard>
        </div>
      </div>
    </div>
  );
};
