import {BrowserRouter, Routes, Route} from "react-router-dom";
import {SharedLayout} from "./pages/SharedLayout.tsx";
import {Home} from "./pages/Home.tsx";
import {SensorData} from "@/pages/Sensor.tsx";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<SharedLayout/>}>
                    <Route index element={<Home/>} />
                    <Route path="/sensors/:sensorId" element={<SensorData/>}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )

}

export default App
