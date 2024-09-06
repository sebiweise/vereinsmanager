"use client"

import { DataTableColumnHeader } from "@/components/table/datatable-column-header"
import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { Tables } from "@/types/database.types"

export const columns: ColumnDef<Tables<'alarme'>>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "einsatznummer",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Einsatznummer" />
        ),
        enableHiding: false,
    },
    {
        accessorKey: "datum",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Datum" />
        ),
        cell: ({ row }) => {
            const formatted = new Date(row.getValue("datum")).toLocaleString("de-DE", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
            });

            return <div>{formatted}</div>
        },
    },
    {
        accessorKey: "einsatzstichwort",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Einsatzstichwort" />
        ),
    },
    {
        accessorKey: "einsatzort",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Einsatzort" />
        ),
    },
    {
        accessorKey: "staerke",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Stärke" />
        ),
    },
    {
        accessorKey: "kommentar",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Kommentar" />
        ),
    },
    {
        accessorKey: "gruppenfuehrer",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Gruppenführer" />
        ),
    },
    {
        accessorKey: "created_at",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Erstellt am" />
        ),
    },
    {
        accessorKey: "updated_at",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Geändert am" />
        ),
    },
]
