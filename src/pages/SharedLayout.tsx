import {Outlet, NavLink} from "react-router-dom";
import {SearchIcon, Menu, X} from "lucide-react";
import {InputGroup, InputGroupAddon, InputGroupInput} from "@/components/ui/input-group.tsx";
import {HoverSlideAnimation} from "@/components/HoverSlideAnimation.tsx";
import {useSearch} from "@/contexts/SearchContext";
import { useAuth0 } from "@auth0/auth0-react";
import Profile from "@/components/Profile.tsx";
import LogoutButton from "@/components/LogoutButton.tsx";
import { useState } from "react";

export const SharedLayout = () => {
    const { searchValue, setSearchValue } = useSearch();
    const { isAuthenticated } = useAuth0();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <header className={"p-2 bg-primary text-primary-foreground text-2xl font-bold"}>
                <nav className={"flex items-center justify-between md:justify-center px-4"}>
                    {/* Burger Menu */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 hover:bg-secondary hover:bg-opacity-20 rounded-lg transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>

                    {/* Desktop Navigation */}
                    <ul className={"hidden md:flex justify-between mx-auto max-w-4/5 grow items-center gap-8"}>
                        <li>
                            <NavLink to="/" className="relative group">
                                Dashboard
                                <HoverSlideAnimation color="bg-secondary"/>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/sensors" className="relative group">
                                Sensors
                                <HoverSlideAnimation color="bg-secondary"/>
                            </NavLink>
                        </li>
                        <li className="ml-auto">
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
                            {isAuthenticated && (
                                <div className="logged-in-section flex gap-5 items-center">
                                    <div className="profile-card shrink-0">
                                        <Profile />
                                    </div>
                                    <LogoutButton />
                                </div>
                            )}
                        </li>
                    </ul>

                    {/* Mobile Search and Auth  */}
                    <div className="flex md:hidden items-center gap-3 ml-auto">
                        <InputGroup className={"bg-secondary"}>
                            <InputGroupInput
                                className="text-black text-sm"
                                placeholder="Search.."
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                            />
                            <InputGroupAddon>
                                <SearchIcon size={18}/>
                            </InputGroupAddon>
                        </InputGroup>
                        {isAuthenticated && (
                            <div className="logged-in-section flex gap-3 items-center">
                                <LogoutButton />
                            </div>
                        )}
                    </div>
                </nav>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden bg-opacity-10 mt-2">
                        <ul className="flex flex-col gap-4 p-4">
                            <li>
                                <NavLink to="/" className="text-primary-foreground text-lg font-semibold block py-2 hover:opacity-80 transition-opacity" onClick={() => setIsMenuOpen(false)}>
                                    Dashboard
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="sensors" className="text-primary-foreground text-lg font-semibold block py-2 hover:opacity-80 transition-opacity" onClick={() => setIsMenuOpen(false)}>
                                    Sensors
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                )}
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