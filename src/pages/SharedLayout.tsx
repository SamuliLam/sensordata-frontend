import {Outlet} from "react-router-dom";
import {SearchIcon} from "lucide-react";
import {InputGroup, InputGroupAddon, InputGroupInput} from "@/components/ui/input-group.tsx";
import {HoverSlideAnimation} from "@/components/HoverSlideAnimation.tsx";
import {useSearch} from "@/contexts/SearchContext";
import { useAuth0 } from "@auth0/auth0-react";


export const SharedLayout = () => {
    const { searchValue, setSearchValue } = useSearch();
    const {
        isLoading, // Loading state, the SDK needs to reach Auth0 on load
        isAuthenticated,
        error,
        loginWithRedirect: login, // Starts the login flow
        logout: auth0Logout, // Starts the logout flow
        user, // User profile
    } = useAuth0();


    const signup = () =>
        login({ authorizationParams: { screen_hint: "signup" } });

    const logout = () =>
        auth0Logout({ logoutParams: { returnTo: window.location.origin } });



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
                                <>
                                    <p>Logged in as {user.email}</p>
                                    <h1>User Profile</h1>
                                    <pre>{JSON.stringify(user, null, 2)}</pre>
                                    <button onClick={logout}>Logout</button>
                                </>
                            ) : (
                                <>
                                    {error && <p>Error: {error.message}</p>}
                                    <button onClick={login}>Login</button>
                                </>
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