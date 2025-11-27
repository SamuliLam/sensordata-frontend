import * as React from "react";


export function RemoveSensor() {


    const handleRemove = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const sensorId = formData.get("sensorId");

        try {
            const response = await fetch(`http://localhost:8080/api/sensors/${sensorId}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to remove sensor");
            }

            console.log("Sensor removed successfully");
        } catch (error) {
            console.error("Error removing sensor:", error);
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
                        required
                        placeholder="Enter Sensor ID"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-[var(--color-Supportive-frieza)] font-semibold text-white rounded px-4 py-2 hover:bg-[var(--color-Supportive-whis-10)]"
                >
                    Remove Sensor
                </button>
            </form>
        </div>
    )



}