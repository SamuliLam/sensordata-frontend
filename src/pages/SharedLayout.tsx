import {Outlet} from "react-router-dom";
import {SearchIcon} from "lucide-react";
import {InputGroup, InputGroupAddon, InputGroupInput} from "@/components/ui/input-group.tsx";
import {HoverSlideAnimation} from "@/components/HoverSlideAnimation.tsx";

export const SharedLayout = () => {
    return (
        <>
            <header className={"p-2 bg-Main-beerus text-Main-bulma text-2xl font-bold"}>
                <nav className={"flex items-center justify-center"}>
                    <ul className={"flex justify-between mx-auto max-w-4/5 grow items-center"}>
                        <li>
                            <a href="/" className="relative group">
                                Sensor Dashboard
                                <HoverSlideAnimation color={"bg-Main-bulma"}/>
                            </a>
                        </li>
                        <li>
                            <a href="/sensors" className="relative group">
                                Sensors
                                <HoverSlideAnimation color={"bg-Main-bulma"}/>
                            </a>
                        </li>
                        <li>
                            <InputGroup className={"bg-Main-gohan"}>
                                <InputGroupInput  placeholder="Search by id, city.."/>
                                <InputGroupAddon>
                                    <SearchIcon/>
                                </InputGroupAddon>
                            </InputGroup>
                        </li>
                    </ul>
                </nav>
            </header>
            <main className="flex items-center justify-center grow">
                <Outlet/>
            </main>
            <footer className={"flex items-center justify-center bg-Main-gohan"}>
                <p>This is the footer</p>
            </footer>
        </>
    )
}