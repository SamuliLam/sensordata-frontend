import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';

function getTokenExpiry(token: string): number | null {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.exp ? payload.exp * 1000 : null;
    } catch {
        return null;
    }
}

export function useAuthenticatedUser() {
    const { user, isAuthenticated, isLoading, getAccessTokenSilently, logout } = useAuth0();
    const [accessToken, setAccessToken] = useState<string | null>(null);

    useEffect(() => {
        if (!isAuthenticated || isLoading) return;

        getAccessTokenSilently()
            .then(token => {
                setAccessToken(token);

                const expiry = getTokenExpiry(token);
                if (expiry) {
                    const delay = expiry - Date.now();
                    const timer = setTimeout(() => {
                        logout({ logoutParams: { returnTo: window.location.origin } });
                    }, delay);
                    return () => clearTimeout(timer);
                }
            })
            .catch(console.error);
    }, [isAuthenticated, isLoading, getAccessTokenSilently, logout]);

    return { user, accessToken, isAuthenticated, isLoading };
}