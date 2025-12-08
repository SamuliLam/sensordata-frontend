import type { ChangeEvent } from "react";
import Papa from "papaparse";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FieldLegend } from "@/components/ui/field";

type ImportCSVProps = {
    onImportComplete?: (rows: unknown[]) => void;
};

export function ImportCSV({ onImportComplete }: ImportCSVProps) {
    const handleImport = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/sensors/import", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            });

            const data = await response.json();

            if (!response.ok) {
                console.error("Error: " + data.message);
                return;
            }

            console.log("CSV imported successfully:", data);
        } catch (error) {
            console.error("Error importing CSV:", error);
        }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                onImportComplete?.(results.data as unknown[]);
                console.log("Parsed CSV data:", results.data);
            },
            error: (error) => {
                console.error("Error parsing CSV:", error);
            },
        });
    };

    return (
        <div className="ImportCSV-panel p-4 border rounded-lg shadow-sm bg-white dark:bg-gray-800">
            <FieldLegend className="text-lg font-semibold mb-4"> Import from CSV file</FieldLegend>
            <div className="flex flex-col gap-4">
                <Input type="file" accept=".csv" onChange={handleFileChange} />
                <Button onClick={handleImport}>Import CSV</Button>
            </div>
        </div>
    );
}