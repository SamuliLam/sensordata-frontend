"use client"

import * as React from "react"
import {
    type ColumnDef,
    type SortingState,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    searchFilter?: string
    onRowClick?: (row: TData) => void
}

export function DataTable<TData, TValue>({
                                             columns,
                                             data,
                                             searchFilter = "",
                                             onRowClick,
                                         }: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])


    // Filter data based on search filter with exact matches first
    const filteredData = React.useMemo(() => {
        if (!searchFilter) return data
        
        const lowerSearchFilter = searchFilter.toLowerCase()
        
        const exactMatches = data.filter((row: any) => {
            return (
                String(row.sensor_id).toLowerCase() === lowerSearchFilter ||
                String(row.sensor_type).toLowerCase() === lowerSearchFilter
            )
        })
        
        const partialMatches = data.filter((row: any) => {
            return (
                (String(row.sensor_id).toLowerCase().includes(lowerSearchFilter) ||
                String(row.sensor_type).toLowerCase().includes(lowerSearchFilter)) &&
                !exactMatches.includes(row)
            )
        })
        
        return [...exactMatches, ...partialMatches]
    }, [data, searchFilter])

    const table = useReactTable({
        data: filteredData,
        columns,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting,
        },
    })

    return (
        <div>
            <div className="overflow-hidden rounded-md border w-full">
                <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead 
                                        key={header.id}
                                        onClick={header.column.getToggleSortingHandler()}
                                        style={{ cursor: header.column.getCanSort() ? "pointer" : "default" }}
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : (
                                                <div className="flex items-center gap-2">
                                                    {flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                                    <span>
                                                        {header.column.getIsSorted() === "asc" && " ▲"}
                                                        {header.column.getIsSorted() === "desc" && " ▼"}
                                                    </span>
                                                </div>
                                            )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                                onClick={() => onRowClick?.(row.original)}
                                className={onRowClick ? "cursor-pointer hover:bg-muted/50 transition-colors" : ""}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            </div>
        </div>
    )
}