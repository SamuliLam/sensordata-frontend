import * as React from "react";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { useState } from "react";
import { Button } from "@moondesignsystem/react";


type SensorErrors = {
    sensorId?: string;
    latitude?: string;
    longitude?: string;
    sensorType?: string;
};



export function AddSensor({onSensorAdded}) {
    const [selectedSensorType, setSelectedSensorType] = useState("Select sensor type");
    const sensorTypes = ["urban", "viherpysakki", "ymparistomoduuli", "suvilahti"];
    const [errors, setErrors] = useState<SensorErrors>({});
    const [sensorAdded, setSensorAdded] = useState(false);
    const [sensorAddFailed, setSensorAddFailed] = useState(false);
    const [sensorId, setSensorId] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");

    const isFormValid =
        sensorId.trim() !== "" &&
        latitude.trim() !== "" &&
        longitude.trim() !== "" &&
        selectedSensorType !== "Select sensor type";



    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const newErrors : SensorErrors = {};


        if (!formData.get("sensorId")) newErrors.sensorId = "Sensor ID is required";

        if (!formData.get("latitude")) newErrors.latitude = "Latitude is required";
        if (formData.get("latitude") && isNaN(Number(formData.get("latitude")))) newErrors.latitude = "Latitude must be a number";

        if (!formData.get("longitude")) newErrors.longitude = "Longitude is required";
        if (formData.get("longitude") && isNaN(Number(formData.get("longitude")))) newErrors.longitude = "Longitude must be a number";

        if (selectedSensorType === "Select sensor type") newErrors.sensorType = "Sensor type is required";

        if(Object.keys(newErrors).length !== 0) {
            setErrors(newErrors);
            console.log("Form validation errors", newErrors);
        } else {
            setErrors({})
            console.log("Form validated and submitted", formData)
        }
        const payload = {
            sensor_id: formData.get("sensorId"),
            latitude: formData.get("latitude"),
            longitude: formData.get("longitude"),
            sensor_type: selectedSensorType,
        };

        try {
            const response = await fetch("http://localhost:8080/api/sensors", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });


            const result = await response.json();

            if (!response.ok) {
                setSensorAddFailed(true);
                console.error("Error: " + result.message);
                return;
            }


            console.log("Sensor added successfully");
            setSensorAdded(true);
            setSensorAddFailed(false)
            onSensorAdded?.();
            setSensorId("");
            setLatitude("");
            setLongitude("");
            setSelectedSensorType("Select sensor type");
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="add-sensor-panel p-4 border rounded-lg shadow-sm bg-white dark:bg-gray-800">
            <h2 className="text-lg font-semibold mb-4">Add New Sensor</h2>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="flex flex-col">
                    <label htmlFor="sensor_id" className="mb-1 font-medium">Sensor ID</label>
                    <input type="text"
                           id="sensor_id"
                           name="sensorId"
                           value={sensorId}
                           onChange={(e) => setSensorId(e.target.value)}
                           className="border rounded px-3 py-2"
                           placeholder="Enter Sensor ID"/>
                </div>
                {errors.sensorId && <p className="text-red-500 text-sm">{errors.sensorId}</p>}

                <div className="flex flex-col">
                    <label htmlFor="latitude" className="mb-1 font-medium">Latitude</label>
                    <input type="text"
                           id="latitude"
                           name="latitude"
                           value={latitude}
                           onChange={(e) => setLatitude(e.target.value)}
                           className="border rounded px-3 py-2"
                           placeholder="Enter Latitude"/>
                </div>
                {errors.latitude && <p className="text-red-500 text-sm">{errors.latitude}</p>}

                <div className="flex flex-col">
                    <label htmlFor="longitude" className="mb-1 font-medium">Longitude</label>
                    <input type="text"
                           id="longitude"
                           name="longitude"
                           value={longitude}
                           onChange={(e) => setLongitude(e.target.value)}
                           className="border rounded px-3 py-2"
                           placeholder="Enter Longitude"/>
                </div>
                {errors.longitude && <p className="text-red-500 text-sm">{errors.longitude}</p>}

                <Menu>
                    <MenuButton
                        className="inline-flex justify-center items-center gap-2 rounded-md bg-Main-piccolo px-3 py-1.5 text-Main-goten font-semibold"
                    >
                        {selectedSensorType}
                    </MenuButton>
                    {errors.sensorType && <p className="text-red-500 text-sm mt-1">{errors.sensorType}</p>}

                    <MenuItems
                        transition
                        anchor="bottom end"
                        className="w-52 origin-top-right rounded-xl border border-gray-200 bg-white p-1 text-gray-900 shadow-lg"
                    >
                        {sensorTypes.map((item) => (
                            <MenuItem key={item}>
                                <button
                                    type="button"
                                    onClick={() => setSelectedSensorType(item)}
                                    className="w-full text-left px-3 py-1.5 rounded-lg data-focus:bg-gray-100"
                                >
                                    {item}
                                </button>
                            </MenuItem>
                        ))}
                    </MenuItems>
                </Menu>

                <div className="my-1 h-[3px] bg-gray-300"/>


                <Button
                    type="submit"
                    disabled={!isFormValid}
                    className={`font-semibold text-white rounded px-4 py-2 
        ${
                        isFormValid
                            ? "bg-[var(--color-Supportive-frieza)] hover:bg-[var(--color-Supportive-whis-10)]"
                            : "bg-gray-400 cursor-not-allowed"
                    }`}
                >
                    Add Sensor
                </Button>

                {sensorAdded && (
                    <p className="text-green-500 text-sm mt-2">Sensor added successfully!</p>
                )}

                {sensorAddFailed && (
                    <p className="text-red-500 text-sm mt-2">Failed to add sensor.</p>
                )}

            </form>
        </div>
    );
}
