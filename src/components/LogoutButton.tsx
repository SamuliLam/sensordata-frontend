import { useAuth0 } from "@auth0/auth0-react";
import {Button} from "@/components/ui/button.tsx";

const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <Button
        variant="secondary"
        onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
        className="cursor-pointer"
    >
      Log Out
    </Button>
  );
};

export default LogoutButton;