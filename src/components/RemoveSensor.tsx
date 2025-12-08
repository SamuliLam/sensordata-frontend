import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FieldLabel, FieldLegend, FieldSeparator } from "@/components/ui/field";
import { useQueryClient } from "@tanstack/react-query";

type SensorErrors = {
    sensorId?: string;
};

type RemoveSensorProps = {
    onSensorRemoved?: () => void;
};

export function RemoveSensor({ onSensorRemoved }: RemoveSensorProps) {
    const queryClient = useQueryClient();
    const [sensorRemoved, setSensorRemoved] = useState(false);
    const [errors, setErrors] = useState<SensorErrors>({});
    const [message, setMessage] = useState("");

    const handleRemove = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const sensorId = formData.get("sensorId");
        const newErrors: SensorErrors = {};

        if (!sensorId) newErrors.sensorId = "Sensor ID is required";

        if (Object.keys(newErrors).length !== 0) {
            setErrors(newErrors);
            console.log("Form validation errors", newErrors);
            return;
        }

        setErrors({});
        console.log("Form validated and submitted", formData);

        try {
            const response = await fetch(`http://localhost:8080/api/sensors/${sensorId}`, {
                method: "DELETE",
            });

            const result = await response.json();

            if (!response.ok) {
                setMessage("Failed to remove sensor.");
                setSensorRemoved(false);
                console.error("Error: " + result.message);
                return;
            }

            console.log("Sensor removed successfully");
            setMessage("Sensor removed successfully!");
            setSensorRemoved(true);
            onSensorRemoved?.();
            queryClient.invalidateQueries({ queryKey: ["sensors"] });
        } catch (error) {
            console.error("Error removing sensor:", error);
            setMessage("Failed to remove sensor.");
            setSensorRemoved(false);
        }
    };

    return (
        <div className="remove-sensor-panel p-4 border rounded-lg shadow-sm bg-white dark:bg-gray-800">
            <FieldLegend className="text-lg font-semibold mb-4">Remove Sensor</FieldLegend>
            <form onSubmit={handleRemove} className="flex flex-col gap-4">
                <div>
                    <FieldLabel className="mb-1 font-medium">Sensor ID</FieldLabel>
                    <Input
                        type="text"
                        id="sensorId"
                        name="sensorId"
                        className="w-full border border-gray-300 p-2 border rounded "
                        placeholder="Enter Sensor ID"
                    />
                </div>
                {errors.sensorId && <p className="text-red-500 text-sm">{errors.sensorId}</p>}

                <FieldSeparator />

                <Button type="submit">Remove Sensor</Button>
                {message && (
                    <p className={`text-sm mt-2 ${sensorRemoved ? "text-green-500" : "text-red-500"}`}>
                        {message}
                    </p>
                )}
            </form>
        </div>
    );
}