"use client"

import type {ColumnDef} from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Sensor = {
    sensor_id: string
    sensor_type: string
    latitude: number
    longitude: number
}

export const columns: ColumnDef<Sensor>[] = [
    {
        accessorKey: "sensor_id",
        header: "Sensor ID",
    },
    {
        accessorKey: "sensor_type",
        header: "Type",
    },
    {
        accessorKey: "latitude",
        header: "Latitude",
    },
    {
        accessorKey: "longitude",
        header: "Longitude",
    }
]