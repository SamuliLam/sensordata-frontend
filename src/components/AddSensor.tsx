import { useState, useEffect, useCallback } from "react";
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { API_BASE_URL } from "@/lib/utils";
import { FieldLabel, FieldLegend, FieldSeparator } from "@/components/ui/field"
import { Trash2, Loader2 } from "lucide-react";

type MappingRow = { raw: string; clean: string };

type SensorErrors = {
    sensorId?: string;
    latitude?: string;
    longitude?: string;
    projectId?: string;
};

export function AddSensor({
                              onSensorAdded,
                              initialData = null
                          }: Readonly<{
    onSensorAdded?: () => void,
    initialData?: any | null
}>) {
    const [errors, setErrors] = useState<SensorErrors>({});
    const [sensorAdded, setSensorAdded] = useState(false);
    const [sensorAddFailed, setSensorAddFailed] = useState(false);
    const [isFetchingConfig, setIsFetchingConfig] = useState(false);

    const [sensorId, setSensorId] = useState("");
    const [projectId, setProjectId] = useState("");
    const [description, setDescription] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [tsField, setTsField] = useState("ts");
    const [mapping, setMapping] = useState<MappingRow[]>([]);

    const { getAccessTokenSilently } = useAuth0();

    const fetchFirestoreConfig = useCallback(async (sid: string) => {
        setIsFetchingConfig(true);
        try {
            const token = await getAccessTokenSilently();
            const response = await fetch(`${API_BASE_URL}/api/sensors/${sid}/config`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.ok) {
                const result = await response.json();
                const config = result.data;
                setTsField(config.ts_field || "ts");

                const rows = Object.entries(config.mapping || {}).map(([raw, clean]) => ({
                    raw,
                    clean: String(clean)
                }));
                setMapping(rows);
            }
        } catch (error) {
            console.error("Failed to fetch Firestore config:", error);
        } finally {
            setIsFetchingConfig(false);
        }
    }, [getAccessTokenSilently]);

    useEffect(() => {
        if (initialData) {
            setSensorId(initialData.sensor_id || "");
            setProjectId(initialData.project_id || "");
            setDescription(initialData.description || "");
            setLatitude(initialData.latitude ? String(initialData.latitude) : "");
            setLongitude(initialData.longitude ? String(initialData.longitude) : "");

            fetchFirestoreConfig(initialData.sensor_id);
        } else {
            setSensorId("");
            setProjectId("");
            setDescription("");
            setLatitude("");
            setLongitude("");
            setTsField("ts");
            setMapping([]);
        }
    }, [initialData, fetchFirestoreConfig]);

    const addMappingRow = () => setMapping([...mapping, { raw: "", clean: "" }]);
    const removeMappingRow = (index: number) => setMapping(mapping.filter((_, i) => i !== index));
    const updateMapping = (index: number, field: keyof MappingRow, value: string) => {
        const newMapping = [...mapping];
        newMapping[index][field] = value;
        setMapping(newMapping);
    };

    const isFormValid =
        sensorId.trim() !== "" &&
        projectId.trim() !== "" &&
        latitude.trim() !== "" &&
        longitude.trim() !== "" &&
        !isFetchingConfig;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors({});

        const newErrors: SensorErrors = {};
        if (!sensorId) newErrors.sensorId = "Sensor ID is required";
        if (!projectId) newErrors.projectId = "Project ID is required";
        if (isNaN(Number(latitude))) newErrors.latitude = "Latitude must be a number";
        if (isNaN(Number(longitude))) newErrors.longitude = "Longitude must be a number";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const mappingObject = mapping.reduce((acc, curr) => {
            if (curr.raw.trim() && curr.clean.trim()) {
                acc[curr.raw.trim()] = curr.clean.trim();
            }
            return acc;
        }, {} as Record<string, string>);

        const payload = {
            sensor_id: sensorId,
            description: description,
            latitude: Number(latitude),
            longitude: Number(longitude),
            project_id: projectId,
            mapping: mappingObject,
            ts_field: tsField
        };

        try {
            const token = await getAccessTokenSilently();
            const response = await fetch(`${API_BASE_URL}/api/sensors`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) throw new Error("Failed to save sensor");

            setSensorAdded(true);
            setSensorAddFailed(false);
            onSensorAdded?.();
        } catch (error) {
            console.error(error);
            setSensorAddFailed(true);
        }
    };

    return (
        <div className="add-sensor-panel p-4 border rounded-lg shadow-sm bg-white dark:bg-gray-800 relative">
            {isFetchingConfig && (
                <div className="absolute inset-0 bg-white/50 dark:bg-gray-800/50 flex items-center justify-center z-10">
                    <Loader2 className="animate-spin text-primary" />
                </div>
            )}

            <FieldLegend className="text-lg font-semibold mb-4">
                {initialData ? "Update Sensor" : "Add & Configure Sensor"}
            </FieldLegend>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="space-y-3">
                    <div>
                        <FieldLabel htmlFor="sensor_id">Sensor ID (MAC)</FieldLabel>
                        <Input
                            id="sensor_id"
                            value={sensorId}
                            onChange={(e) => setSensorId(e.target.value)}
                            placeholder="E.g. C6:31:F5..."
                            disabled={!!initialData}
                        />
                        {errors.sensorId && <p className="text-red-500 text-xs">{errors.sensorId}</p>}
                    </div>
                    <div>
                        <FieldLabel htmlFor="project_id">Project ID</FieldLabel>
                        <Input id="project_id" value={projectId} onChange={(e) => setProjectId(e.target.value)} placeholder="E.g. myyrmaki-test" />
                        {errors.projectId && <p className="text-red-500 text-xs">{errors.projectId}</p>}
                    </div>

                    <div>
                        <FieldLabel htmlFor="description">Description</FieldLabel>
                        <Input id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Location description" />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <FieldLabel>Latitude</FieldLabel>
                            <Input value={latitude} onChange={(e) => setLatitude(e.target.value)} placeholder="60.123" />
                        </div>
                        <div>
                            <FieldLabel>Longitude</FieldLabel>
                            <Input value={longitude} onChange={(e) => setLongitude(e.target.value)} placeholder="24.456" />
                        </div>
                    </div>
                </div>

                <FieldSeparator />

                <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-md border space-y-3">
                    <h4 className="text-xs font-bold uppercase text-slate-500">Data Logic & Mapping</h4>
                    <div>
                        <FieldLabel className="text-[10px]">Timestamp Field Name</FieldLabel>
                        <Input className="h-8 text-sm" value={tsField} onChange={e => setTsField(e.target.value)} />
                    </div>

                    <div className="space-y-2">
                        <FieldLabel className="text-[10px]">Measurements (Raw Key → Clean Name)</FieldLabel>
                        {mapping.map((row, index) => (
                            <div key={index} className="flex gap-2 items-center">
                                <Input className="h-8 text-xs" placeholder="raw" value={row.raw} onChange={e => updateMapping(index, "raw", e.target.value)} />
                                <span className="text-slate-400">→</span>
                                <Input className="h-8 text-xs" placeholder="clean" value={row.clean} onChange={e => updateMapping(index, "clean", e.target.value)} />
                                <Button type="button" variant="ghost" size="icon" className="h-8 w-8 text-red-400" onClick={() => removeMappingRow(index)}>
                                    <Trash2 size={14} />
                                </Button>
                            </div>
                        ))}
                        <Button type="button" variant="outline" size="sm" className="w-full h-7 text-[10px]" onClick={addMappingRow}>
                            + Add Field
                        </Button>
                    </div>
                </div>

                <Button type="submit" disabled={!isFormValid} className="w-full">
                    {initialData ? "Update & Backfill" : "Save & Backfill"}
                </Button>

                {sensorAdded && <p className="text-green-500 text-sm mt-2 text-center font-medium">Success! Data backfilled.</p>}
                {sensorAddFailed && <p className="text-red-500 text-sm mt-2 text-center font-medium">Error saving sensor.</p>}
            </form>
        </div>
    );
}