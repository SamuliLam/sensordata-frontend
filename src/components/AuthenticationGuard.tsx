import { withAuthenticationRequired, useAuth0 } from "@auth0/auth0-react";
import { useEffect, type ComponentType } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner.tsx";

export const AuthenticationGuard = ({ component: Component }: { component: ComponentType }) => {
    const { error, isLoading } = useAuth0();
    const navigate = useNavigate();

    useEffect(() => {
        if (error) {
            const errorCode = error.name || '';
            // Check if access was denied by Auth0 rule
            if (
                errorCode === 'unauthorized' ||
                errorCode === 'access_denied' ||
                (error.message && error.message.includes('Access requested'))
            ) {
                navigate('/access-requested', { replace: true });
            }
        }
    }, [error, navigate]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Spinner className="size-1/25" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="page-layout">
                <p>Authentication error...</p>
            </div>
        );
    }

    const GuardedComponent = withAuthenticationRequired(Component, {
        onRedirecting: () => (
            <div className="flex items-center justify-center min-h-screen">
                <Spinner className="size-1/25" />
            </div>
        ),
        returnTo: '/',
    });

    return <GuardedComponent />;
};