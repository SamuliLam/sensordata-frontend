import { useState } from "react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import {
    FieldLabel,
    FieldLegend,
    FieldSeparator,
} from "@/components/ui/field"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


type SensorErrors = {
    sensorId?: string;
    latitude?: string;
    longitude?: string;
    sensorType?: string;
};



export function AddSensor({onSensorAdded}: {onSensorAdded?: () => void}) {
    const [selectedSensorType, setSelectedSensorType] = useState("");
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
        selectedSensorType !== "";



    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

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
            const response = await fetch("/api/sensors", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });


            const result = await response.json();

            if (!response.ok) {
                setSensorAddFailed(true);
                setSensorAdded(false);
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
            <FieldLegend className="text-lg font-semibold mb-4">Add New Sensor</FieldLegend>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="flex flex-col">
                    <FieldLabel htmlFor="sensor_id" className="mb-1 font-medium">Sensor ID</FieldLabel>
                    <Input type="text"
                           id="sensor_id"
                           name="sensorId"
                           value={sensorId}
                           onChange={(e) => setSensorId(e.target.value)}
                           className="border rounded px-3 py-2"
                           placeholder="Enter Sensor ID"/>
                </div>
                {errors.sensorId && <p className="text-red-500 text-sm">{errors.sensorId}</p>}


                <div className="flex flex-col">
                    <FieldLabel htmlFor="latitude" className="mb-1 font-medium">Latitude</FieldLabel>
                    <Input type="text"
                           id="latitude"
                           name="latitude"
                           value={latitude}
                           onChange={(e) => setLatitude(e.target.value)}
                           className="border rounded px-3 py-2"
                           placeholder="Enter Latitude"/>
                </div>
                {errors.latitude && <p className="text-red-500 text-sm">{errors.latitude}</p>}

                <div className="flex flex-col">
                    <FieldLabel htmlFor="longitude" className="mb-1 font-medium">Longitude</FieldLabel>
                    <Input type="text"
                           id="longitude"
                           name="longitude"
                           value={longitude}
                           onChange={(e) => setLongitude(e.target.value)}
                           className="border rounded px-3 py-2"
                           placeholder="Enter Longitude"/>
                </div>
                {errors.longitude && <p className="text-red-500 text-sm">{errors.longitude}</p>}

                <Select
                    value={selectedSensorType}
                    onValueChange={setSelectedSensorType}
                >
                    <SelectTrigger
                        className="w-full inline-flex justify-center items-center gap-2 rounded-md bg-primary text-primary-foreground px-3 py-1.5"
                    >
                        <SelectValue placeholder="Select sensor type" />
                    </SelectTrigger>

                    <SelectContent>
                        {sensorTypes.map((item) => (
                            <SelectItem key={item} value={item}>
                                {item.charAt(0).toUpperCase() + item.slice(1)}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>



                <FieldSeparator />

                <Button
                    type="submit"
                    disabled={!isFormValid}
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