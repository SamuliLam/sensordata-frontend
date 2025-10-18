import {Outlet} from "react-router-dom";
import {SearchIcon} from "lucide-react";
import {InputGroup, InputGroupAddon, InputGroupInput} from "@/components/ui/input-group.tsx";

    export const SharedLayout = () => {
    return (
        <div className={"min-h-screen flex flex-col bg-gray-50 text-gray-800"}>
            <header className={"p-4 bg-Main-beerus"}>
                <nav className={"flex items-center justify-center"}>
                    <ul className={"flex text-Main-piccolo font-bold text-2xl justify-between mx-auto max-w-4/5 grow"}>
                        <li><a href="/">Sensor Dashboard</a></li>
                        <li><a href="/sensors">Sensors</a></li>
                        <li>
                            <InputGroup className={"bg-Main-gohan"}>
                                <InputGroupInput placeholder="Search by id, city.." />
                                <InputGroupAddon>
                                    <SearchIcon />
                                </InputGroupAddon>
                            </InputGroup>
                        </li>
                    </ul>
                </nav>
            </header>
            <main className="">
                <Outlet/>
            </main>
            <footer></footer>

        </div>
    )
}