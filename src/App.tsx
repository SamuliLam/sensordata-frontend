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
import {Auth0Provider } from "@auth0/auth0-react";
import {AccessRequested} from "@/pages/AccessRequested.tsx";
import { AuthenticationGuard } from "@/components/AuthenticationGuard.tsx";

const queryClient = new QueryClient();

function App() {
    const onRedirectCallback = (state?: { returnTo?: string }) => {
        const returnTo = state?.returnTo || window.location.pathname;
        window.history.replaceState({}, document.title, returnTo);
    };

    return (
        <QueryClientProvider client={queryClient}>
            <SearchProvider>
                <BrowserRouter>
                    <Auth0Provider
                        domain={import.meta.env.VITE_AUTH0_DOMAIN}
                        clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
                        authorizationParams={{
                            redirect_uri: window.location.origin,
                            audience: import.meta.env.VITE_AUTH0_AUDIENCE
                        }}
                        onRedirectCallback={onRedirectCallback}
                        cacheLocation="localstorage"
                    >
                        <Routes>
                            <Route path="/access-requested" element={<AccessRequested />} />
                            <Route path="/" element={<AuthenticationGuard component={SharedLayout}/>}>
                                    <Route index element={<Home/>}/>
                                    <Route path="sensors/:sensorId" element={<SensorData/>}></Route>
                                    <Route path="sensors" element={<Sensors/>}></Route>
                            </Route>
                        </Routes>
                    </Auth0Provider>
                </BrowserRouter>
            </SearchProvider>
        </QueryClientProvider>
    );
}

export default App;
