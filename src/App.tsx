import {BrowserRouter, Routes, Route} from "react-router-dom";
import {SharedLayout} from "./pages/SharedLayout.tsx";
import {Home} from "./pages/Home.tsx";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SharedLayout/>}>
                    <Route index element={<Home/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )

}

export default App
