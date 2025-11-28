import * as React from "react";
import { useState } from "react";





export function LoadHistory(){
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [historyLoaded, setHistoryLoaded] = useState(false);

    async function handleLoadHistory(){
        setLoading(true);
        setMessage("");

        try {
            const response = await fetch("http://localhost:8080/api/sensors/load-history", {
                method: "POST",
                headers: {"Content-Type": "application/json"}
            });

         /* data not used, just sending request to endpoint :) */
            const data = await response.json();
            setMessage("Historical data loaded successfully");
            setHistoryLoaded(true);
        } catch (error) {
            console.error("Error loading historical data:", error);
            setMessage("Failed to load historical data");
        }
        setLoading(false);
    }



    return(
        <div className="remove-sensor-panel p-4 border rounded-lg shadow-sm bg-white dark:bg-gray-800">
            <h2 className="text-lg font-semibold mb-4">Load historical sensor data</h2>
            <button
                onClick={handleLoadHistory}
                disabled={loading}
                className=" w-full bg-[var(--color-Supportive-frieza)] font-semibold text-white rounded px-4 py-2 hover:bg-[var(--color-Supportive-whis-10)]"
            >
                {loading ? "Loading..." : "Load History"}
            </button>
            {historyLoaded && (<p className="text-sm text-green-500 mt-2">{message}</p>)}
            {!historyLoaded && message && (<p className="text-sm text-red-500 mt-2">{message}</p>)}


        </div>


            )
            }