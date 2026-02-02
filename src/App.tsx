import {BrowserRouter, Routes, Route, Navigate, Outlet} from "react-router-dom";
import {SharedLayout} from "./pages/SharedLayout.tsx";
import {Home} from "./pages/Home.tsx";
import {SensorData} from "@/pages/Sensor.tsx";
import {Sensors} from "@/pages/Sensors.tsx";
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import { SearchProvider } from "@/contexts/SearchContext";
import {Auth0Provider, useAuth0, withAuthenticationRequired} from "@auth0/auth0-react";
import {AccessRequested} from "@/pages/AccessRequested.tsx";

function RequireAuthorization() {
    const { user, isLoading } = useAuth0();

    if (isLoading) return null;

    const authorized = user?.app_metadata?.authorized;

    if (authorized === false) {
        return <Navigate to="/access-requested" replace />;
    }

    return <Outlet />;
}

const ProtectedLayout = withAuthenticationRequired(SharedLayout);

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <SearchProvider>
                <BrowserRouter>
                        <Routes>
                            <Route element={<ProtectedLayout/>}>
                                <Route element={<RequireAuthorization/>}>
                                    <Route index element={<Home/>}/>
                                    <Route path="sensors/:sensorId" element={<SensorData/>}></Route>
                                    <Route path="sensors" element={<Sensors/>}></Route>
                                </Route>
                            </Route>
                            <Route path="/access-requested" element={<AccessRequested />} />
                        </Routes>
                </BrowserRouter>
            </SearchProvider>
        </QueryClientProvider>
    );
}

export default App;
