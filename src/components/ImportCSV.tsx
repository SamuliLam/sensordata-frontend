import { Button} from "@/components/ui/button";
import { useState}  from "react";
import Papa from "papaparse";
import { Input } from "@/components/ui/input";
import {FieldLegend} from "@/components/ui/field.tsx";
import { API_BASE_URL } from "@/lib/utils";


export function ImportCSV({onImportComplete}: {onImportComplete?: () => void}) {
    const [_data, setData] = useState<unknown[]>([]);

    const handleImport = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/sensors/import`, {
                method: "POST",
                headers: {"Content-Type": "application/json"}
            });

            const data = await response.json();

            if (!response.ok) {
                console.error("Error: " + data.message);
                return;
            }

            console.log("CSV imported successfully:", data);
            onImportComplete?.();
        } catch (error) {
            console.error("Error importing CSV:", error);
        }
    };
    return (
        <div className="ImportCSV-panel p-4 border rounded-lg shadow-sm bg-white dark:bg-gray-800">
            <FieldLegend className="text-lg font-semibold mb-4"> Import from CSV file</FieldLegend>
            <div className="flex flex-col gap-4">
            <Input type="file" accept=".csv" onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                    Papa.parse(file, {
                        header: true,
                        complete: (results) => {
                            setData(results.data);
                            console.log("Parsed CSV data:", results.data);
                        },
                        error: (error) => {
                            console.error("Error parsing CSV:", error);
                        }
                    });
                }
            }} />
            <Button onClick={handleImport}>Import CSV</Button>
            </div>
        </div>
    );


}