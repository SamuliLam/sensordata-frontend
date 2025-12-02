import * as React from "react";
import { useState } from "react";

type SensorErrors = {
    sensorId?: string;
}

export function RemoveSensor({onSensorRemoved}) {
    const [sensorRemoved, setSensorRemoved] = useState(false);
    const [errors, setErrors] = useState<SensorErrors>({});
    const [message, setMessage] = useState("");



    const handleRemove = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const sensorId = formData.get("sensorId");
        const newErrors : SensorErrors = {};


        if (!sensorId) newErrors.sensorId = "Sensor ID is required";

        if(Object.keys(newErrors).length !== 0) {
            setErrors(newErrors);
            console.log("Form validation errors", newErrors);
        } else {
            setErrors({})
            console.log("Form validated and submitted", formData)
        }

        try {
            const response = await fetch(`http://localhost:8080/api/sensors/${sensorId}`, {
                method: "DELETE",
            });

            const result = await response.json();

            if (!response.ok) {
                setMessage("Failed to remove sensor.")
                setSensorRemoved(false)
                console.error("Error: " + result.message);
                return;
            }

            console.log("Sensor removed successfully");
            setMessage("Sensor removed successfully!")
            setSensorRemoved(true);
            onSensorRemoved?.();
        } catch (error) {
            console.error("Error removing sensor:", error);
            setMessage("Failed to remove sensor.")
        }
    }
    return (
        <div className="remove-sensor-panel p-4 border rounded-lg shadow-sm bg-white dark:bg-gray-800">
            <h2 className="text-lg font-semibold mb-4">Remove Sensor</h2>
            <form onSubmit={handleRemove} className="flex flex-col gap-4">
                <div>
                    <label htmlFor="sensorId" className="mb-1 font-medium">
                        Sensor ID
                    </label>
                    <input
                        type="text"
                        id="sensorId"
                        name="sensorId"
                        className="w-full border border-gray-300 p-2 border rounded "
                        placeholder="Enter Sensor ID"
                    />
                </div>
                {errors.sensorId && <p className="text-red-500 text-sm">{errors.sensorId}</p>}

                <button
                    type="submit"
                    className="bg-Main-piccolo font-semibold text-white rounded px-4 py-2 hover:bg-[var(--color-Supportive-whis-10)]"
                >
                    Remove Sensor
                </button>
                {sensorRemoved && <p className="text-green-500 text-sm mt-2">{message}</p>}
                {!sensorRemoved && <p className="text-red-500 text-sm mt-2">{message}</p>}
            </form>
        </div>
    )



}