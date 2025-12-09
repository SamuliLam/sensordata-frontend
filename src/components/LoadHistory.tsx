import { useState } from "react";
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

export function LoadHistory(){
    const [loading, setLoading] = useState(false);
    const [_message, setMessage] = useState("");
    const [historyLoaded, setHistoryLoaded] = useState<null | boolean>(null);

    async function handleLoadHistory(){
        setMessage("");
        setLoading(true);
        setHistoryLoaded(null);

        try {
            const response = await fetch("/api/history", {
                method: "POST",
                headers: {"Content-Type": "application/json"}
            });



         /* data not used, just sending request to endpoint :) */
            const data = await response.json();

            await checkStatus();

            // setMessage("Historical data loaded successfully");
            // setHistoryLoaded(true);

            if  (!response.ok){
                setHistoryLoaded(false);
                console.error("Error: " + data.message);
                setMessage("Failed to load historical data");
                setLoading(false)
                return;
            }
        } catch (error) {
            console.error("Error loading historical data:", error);
            setMessage("Failed to load historical data");
            setLoading(false);
            setHistoryLoaded(false)
        }
    }

    async function checkStatus() {
        try {
            const status = await fetch("/api/history/status", {
                method: "GET",
                headers: {"Content-Type": "application/json"}

            })


            const data = await status.json();
            console.log("History status:", data);
            const state = data.state

            if (state === "running"){
                console.log("History loading in progress...")
                setTimeout(checkStatus, 2000)
            }
            else if (state === "failed"){
                console.error("History loading failed.")
                setMessage("Failed to load historical data");
                setHistoryLoaded(false);
                setLoading(false);
                return;
            }
            else if (state === "success"){
                console.log("History loading succeeded.")
                setMessage("Historical data loaded successfully");
                setHistoryLoaded(true);
                setLoading(false);
                return;

            }

        } catch (error) {
            console.error("Error checking history status:", error);
        }
    }

    let buttonText = "Load History";
    if (loading) buttonText = "Loading...";
    else if (historyLoaded === true) buttonText = "History Loaded ✔";
    else if (historyLoaded === false) buttonText = "Failed – Try Again";

    return (
        <Button onClick={handleLoadHistory} disabled={loading} variant="default">
            {loading && <Spinner className="mr-2 " />}
            {buttonText}
        </Button>
    );
}
