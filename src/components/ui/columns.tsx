"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"

export type Sensor = {
    sensor_id: string
    description?: string
    project_id: string
    latitude: number
    longitude: number
}

export const getColumns = (onEdit: (sensor: Sensor) => void): ColumnDef<Sensor>[] => [
    {
        accessorKey: "sensor_id",
        header: "Sensor ID",
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "project_id",
        header: "Project",
    },
    {
        accessorKey: "latitude",
        header: "Latitude",
    },
    {
        accessorKey: "longitude",
        header: "Longitude",
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const sensor = row.original
            return (
                <Button
                    variant="ghost"
                    size="sm"
                    className="flex gap-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                    onClick={(e) => {
                        e.stopPropagation();
                        onEdit(sensor);
                    }}
                >
                    <Pencil size={14} />
                    Edit
                </Button>
            )
        },
    }
]