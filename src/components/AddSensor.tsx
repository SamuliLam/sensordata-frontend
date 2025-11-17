import * as React from "react";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import {useState} from "react";

export function AddSensor() {

    const [selectedSensorType, setSelectedSensorType] = useState("Select sensor type");
    const sensorTypes = ["Urban", "Viherpysakki", "Ymparistomoduuli", "Suvilahti"];

    return (
        <div className="add-sensor-panel p-4 border rounded-lg shadow-sm bg-white dark:bg-gray-800">
            <h2 className="text-lg font-semibold mb-4">Add New Sensor</h2>

            <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                <div className="flex flex-col">
                    <label htmlFor="sensorId" className="mb-1 font-medium">Sensor ID</label>
                    <input type="text" id="sensorId" name="sensorId"
                           className="border rounded px-3 py-2"
                           placeholder="Enter Sensor ID"/>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="latitude" className="mb-1 font-medium">Latitude</label>
                    <input type="text" id="latitude" name="latitude"
                           className="border rounded px-3 py-2"
                           placeholder="Enter Latitude"/>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="longitude" className="mb-1 font-medium">Longitude</label>
                    <input type="text" id="longitude" name="longitude"
                           className="border rounded px-3 py-2"
                           placeholder="Enter Longitude"/>
                </div>

                {/* --- START DROPDOWN --- */}
                <Menu>

                    <MenuButton
                        className="inline-flex justify-center items-center gap-2 rounded-md bg-[var(--color-Supportive-frieza)] px-3 py-1.5  text-white shadow-inner shadow-white/10">
                        {selectedSensorType}
                    </MenuButton>

                    <MenuItems
                        transition
                        anchor="bottom end"
                        className="w-52 origin-top-right rounded-xl border border-gray-200 bg-white p-1  text-gray-900 shadow-lg transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none "
                    >
                        {sensorTypes.map((item) => (
                            <MenuItem key={item}>
                                <button
                                    onClick={() => setSelectedSensorType(item)}
                                    className="
                w-full text-left px-3 py-1.5 rounded-lg
                data-focus:bg-gray-100
              "
                                >
                                    {item}
                                </button>
                            </MenuItem>
                        ))}
                    </MenuItems>
                </Menu>

                {/* --- END DROPDOWN --- */}

                <div className="my-1 h-[3px] bg-gray-300"/>


                <button
                    type="submit"
                    className="bg-[var(--color-Supportive-frieza)] font-semibold text-white rounded px-4 py-2 hover:bg-[var(--color-Supportive-whis-10)] transition">
                    Add Sensor
                </button>
            </form>
        </div>
    );
}
