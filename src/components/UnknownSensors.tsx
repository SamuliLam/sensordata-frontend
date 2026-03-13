import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FieldLegend } from "@/components/ui/field";
import { useAuthenticatedUser } from '@/hooks/useAuthenticatedUser.ts';

export function UnknownSensors({ onSelect }: Readonly<{ onSelect: (id: string) => void }>) {
    const { accessToken } = useAuthenticatedUser();

    const { data, isLoading } = useQuery({
        queryKey: ["unknown_sensors"],
        queryFn: async () => {
            const res = await fetch(`${API_BASE_URL}/api/sensors/unknown`, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            const json = await res.json();
            return json.data as string[];
        },
        enabled: !!accessToken,
        refetchInterval: 300000 // update with 5min intervals
    });

    if (isLoading || !data || data.length === 0) return null;

    return (
        <div className="p-4 border border-amber-200 rounded-lg bg-amber-50 dark:bg-amber-900/20 mb-6">
            <FieldLegend className="text-sm font-bold text-amber-800 dark:text-amber-200 mb-2">
                Unconfigured Devices Detected
            </FieldLegend>
            <div className="flex flex-wrap gap-2">
                {data.map(id => (
                    <Button
                        key={id}
                        variant="outline"
                        size="sm"
                        className="bg-white text-xs"
                        onClick={() => onSelect(id)}
                    >
                        {id} +
                    </Button>
                ))}
            </div>
        </div>
    );
}