"use client"

import { DataTableColumnHeader } from "@/components/table/datatable-column-header"
import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Mitglied = {
    id: string
    nachname: string
    vorname: string
    rolle: string
    geburtsdatum: Date
    email: string
    telefonnummer: string
    straße: string
    stadt: string
    postleitzahl: string
    status: string
    created_at: Date
    updated_at: Date
}

export const columns: ColumnDef<Mitglied>[] = [
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
    },
    {
        accessorKey: "email",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Email" />
        ),
    },
    {
        accessorKey: "telefonnummer",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Telefonnummer" />
        ),
    },
    {
        accessorKey: "straße",
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
