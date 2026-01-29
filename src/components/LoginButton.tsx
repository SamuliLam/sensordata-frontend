import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@/components/ui/button";

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();
    return (
        <Button
            variant="secondary"
            onClick={() => loginWithRedirect()}
            className="cursor-pointer"
        >
            Log In
        </Button>
    );
};

export default LoginButton;