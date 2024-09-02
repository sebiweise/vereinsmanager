"use client"

import { DataTableColumnHeader } from "@/components/table/datatable-column-header"
import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { Tables } from "@/types/database.types"

export const columns: ColumnDef<Tables<'mitglieder'>>[] = [
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
        accessorKey: "id",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="ID" />
        ),
        enableHiding: false,
    },
    {
        accessorKey: "nachname",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Nachname" />
        ),
    },
    {
        accessorKey: "vorname",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Vorname" />
        ),
    },
    {
        accessorKey: "rolle",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Rolle" />
        ),
    },
    {
        accessorKey: "geburtsdatum",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Geburtsdatum" />
        ),
        cell: ({ row }) => {
            const formatted = new Date(row.getValue("geburtsdatum")).toLocaleDateString("de-DE", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
            });

            return <div>{formatted}</div>
        },
    },
    {
        accessorKey: "email",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Email" />
        ),
        cell: ({ row }) => {
            const mail: string | null = row.getValue("email");

            return (
                <>
                    {mail && <Link href={`mailto:${mail}`}>{mail}</Link>}
                </>
            )
        },
    },
    {
        accessorKey: "telefon_mobil",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Mobil" />
        ),
        enableSorting: false,
    },
    {
        accessorKey: "telefon_festnetz",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Festnetz" />
        ),
        enableSorting: false,
    },
    {
        accessorKey: "strasse",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Straße" />
        ),
    },
    {
        accessorKey: "stadt",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Stadt" />
        ),
    },
    {
        accessorKey: "postleitzahl",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Postleitzahl" />
        ),
    },
    {
        accessorKey: "status",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status" />
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
