import {BrowserRouter, Routes, Route} from "react-router-dom";
import {SharedLayout} from "./pages/SharedLayout.tsx";
import {Home} from "./pages/Home.tsx";
import {SensorData} from "@/pages/Sensor.tsx";
import {Sensors} from "@/pages/Sensors.tsx";
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import { SearchProvider } from "@/contexts/SearchContext";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <SearchProvider>
                <BrowserRouter>
                    <Routes>
                        <Route element={<SharedLayout/>}>

                            <Route index element={<Home/>}/>

                            <Route path="/sensors/:sensorId" element={<SensorData/>}></Route>
                            <Route path="/sensors" element={<Sensors/>}></Route>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </SearchProvider>
        </QueryClientProvider>
    );
}

export default App;
