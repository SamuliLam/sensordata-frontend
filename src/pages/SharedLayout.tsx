import {Outlet} from "react-router-dom";

export const SharedLayout = () => {
    return (
        <div>
            <header>
                <nav>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/sensors">Sensors</a></li>
                    </ul>
                </nav>
            </header>
            <main>
                <Outlet/>
            </main>
        </div>
    )
}