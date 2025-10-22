import { Dashboard } from "@/components/Dashboard";

export const Home = () => {
  return (
    <div className="min-h-screen w-auto flex flex-col justify-center items-center">
      <div className="w-[80%] h-full m-0">
        <div className="flex flex-col flex-1 gap-4 m-0">
          <Dashboard
            url="https://your-grafana/snapshot/..."
            className=" w-full flex-1 rounded-2xl bg-Main-hit m-0 min-h-96"
          />
          <button className=" self-start m-0 p-1 flex-none h-12 rounded bg-blue-500 text-white">
            Testi nappi
          </button>
          <Dashboard
            url="https://your-grafana/snapshot/..."
            className=" w-full flex-1 rounded-2xl bg-Main-piccolo m-0"
          />
        </div>
      </div>
    </div>
  );
};
