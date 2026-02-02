import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "@/components/LogoutButton";

export const AccessRequested = () => {
    const { user } = useAuth0();

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
            <div className="text-center p-8 bg-slate-700 rounded-lg shadow-xl max-w-md">
                <h1 className="text-3xl font-bold text-white mb-4">
                    Access Requested
                </h1>
                <p className="text-lg text-slate-200 mb-6">
                    Your access request has been submitted. Please wait for an administrator to approve your account.
                </p>
                {user?.email && (
                    <p className="text-sm text-slate-300 mb-6">
                        Account: <strong>{user.email}</strong>
                    </p>
                )}
                <div className="flex justify-center">
                    <LogoutButton />
                </div>
            </div>
        </div>
    );
};
