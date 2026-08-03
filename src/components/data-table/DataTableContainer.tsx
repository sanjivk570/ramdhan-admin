import type { ReactNode } from "react";

interface Props {

    toolbar?: ReactNode;

    filters?: ReactNode;

    table: ReactNode;

    pagination?: ReactNode;

}

export default function DataTableContainer({

    toolbar,

    filters,

    table,

    pagination,

}: Props) {

    return (

        <div className="space-y-4">

            {toolbar}

            {filters}

            {table}

            {pagination}

        </div>

    );

}