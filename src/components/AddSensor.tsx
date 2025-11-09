import * as React from "react"

//A panel to add a new sensor which has 3 input fields: SensorId, Latitude, Longitude and a submit button
export function AddSensor() {
    return (
        <div className="add-sensor-panel p-4 border rounded-lg shadow-sm bg-white dark:bg-gray-800">
            <h2 className="text-lg font-semibold mb-4">Add New Sensor</h2>
            <form className="flex flex-col gap-4">
                <div className="flex flex-col">
                    <label htmlFor="sensorId" className="mb-1 font-medium">Sensor ID</label>
                    <input type="text" id="sensorId" name="sensorId" className="border rounded px-3 py-2" placeholder="Enter Sensor ID" />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="latitude" className="mb-1 font-medium">Latitude</label>
                    <input type="text" id="latitude" name="latitude" className="border rounded px-3 py-2" placeholder="Enter Latitude" />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="longitude" className="mb-1 font-medium">Longitude</label>
                    <input type="text" id="longitude" name="longitude" className="border rounded px-3 py-2" placeholder="Enter Longitude" />
                </div>
                <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 transition">Add Sensor</button>
            </form>
        </div>
    )

}
