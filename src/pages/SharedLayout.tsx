import {Outlet} from "react-router-dom";
import {SearchIcon} from "lucide-react";
import {InputGroup, InputGroupAddon, InputGroupInput} from "@/components/ui/input-group.tsx";
import {HoverSlideAnimation} from "@/components/HoverSlideAnimation.tsx";
import {useSearch} from "@/contexts/SearchContext";
import { useAuth0 } from "@auth0/auth0-react";
import Profile from "@/components/Profile.tsx";
import LogoutButton from "@/components/LogoutButton.tsx";
import LoginButton from "@/components/LoginButton.tsx";

export const SharedLayout = () => {
    const { searchValue, setSearchValue } = useSearch();
    const { isAuthenticated, isLoading, error } = useAuth0();

    return (
        <>
            <header className={"p-2 bg-primary text-primary-foreground text-2xl font-bold"}>
                <nav className={"flex items-center justify-center"}>
                    <ul className={"flex justify-between mx-auto max-w-4/5 grow items-center"}>
                        <li>
                            <a href="/" className="relative group">
                                Sensor Dashboard
                                <HoverSlideAnimation color="bg-secondary"/>
                            </a>
                        </li>
                        <li>
                            <a href="/sensors" className="relative group">
                                Sensors
                                <HoverSlideAnimation color="bg-secondary"/>
                            </a>
                        </li>
                        <li>
                            <InputGroup className={"bg-secondary"}>
                                <InputGroupInput 
                                    className="text-black" 
                                    placeholder="Search by id, city.."
                                    value={searchValue}
                                    onChange={(e) => setSearchValue(e.target.value)}
                                />
                                <InputGroupAddon>
                                    <SearchIcon/>
                                </InputGroupAddon>
                            </InputGroup>
                        </li>
                        <li>
                            {isAuthenticated ? (
                                <div className="logged-in-section flex gap-5 items-center">
                                    <div className="profile-card">
                                        <Profile />
                                    </div>
                                    <LogoutButton />
                                </div>
                            ) : (
                                <div className="action-card">
                                    <LoginButton />
                                </div>
                            )}
                        </li>
                    </ul>
                </nav>
            </header>
            <main className="flex flex-col items-center justify-center grow">
                <Outlet/>
            </main>
            <footer className={"flex items-center justify-center bg-Main-gohan"}>
                <p>© Jaakko Lehtonen {new Date().getFullYear()} </p>
            </footer>
        </>
    )
}