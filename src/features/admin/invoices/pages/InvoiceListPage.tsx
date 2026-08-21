import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { DataTable, useDataTable } from "@/components/data-table";

import { ROUTES } from "@/app/router/route-paths";
import { notification } from "@/lib/notification";

import type { Invoice } from "../types/invoice";
import { useInvoices } from "../hooks/useInvoices";
import { useGenerateInvoice } from "../hooks/useGenerateInvoice";
import { invoiceTableConfig } from "../config/invoice-table-config";

export default function InvoiceListPage() {
    const navigate = useNavigate();
    const table = useDataTable({ storageKey: "invoices" });

    const { data, isLoading } = useInvoices(table.query as any);
    const generate = useGenerateInvoice();
    const [generateItem, setGenerateItem] = useState<Invoice | null>(null);

    const meta = data?.meta
        ? {
              ...data.meta,
              from:
                  (data.meta.current_page - 1) * data.meta.per_page + 1,
              to: Math.min(
                  data.meta.current_page * data.meta.per_page,
                  data.meta.total
              ),
          }
        : undefined;

    const config = invoiceTableConfig({
        onView: (invoice) => navigate(`${ROUTES.INVOICES}/${invoice.uuid}`),
    });

    const handleGenerate = () => {
        if (!generateItem) {
            return;
        }
        generate.mutate(
            { order_uuid: generateItem.order_uuid || "" },
            {
                onSuccess: () => {
                    setGenerateItem(null);
                    notification.success(
                        "Invoice generated successfully.",
                        "The invoice has been created."
                    );
                },
                onError: () => {
                    notification.error(
                        "Unable to generate invoice.",
                        "Please try again."
                    );
                },
            }
        );
    };

    return (
        <>
            <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Invoices
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Manage and review customer invoices.
                        </p>
                    </div>
                    <Button>
                        <Link to={`${ROUTES.ORDERS}`}>
                            <Plus className="mr-2 h-4 w-4" />
                            Generate from Order
                        </Link>
                    </Button>
                </div>

                <DataTable
                    config={config}
                    table={table as any}
                    rows={data?.data ?? []}
                    meta={meta}
                    loading={isLoading}
                />
            </div>

            <AlertDialog
                open={generateItem !== null}
                onOpenChange={(open) => {
                    if (!open) {
                        setGenerateItem(null);
                    }
                }}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Generate Invoice?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to generate an invoice for
                            order{" "}
                            <span className="font-semibold text-foreground">
                                {generateItem?.order_number}
                            </span>
                            ?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel
                            disabled={generate.isPending}
                        >
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            disabled={generate.isPending}
                            onClick={(event) => {
                                event.preventDefault();
                                handleGenerate();
                            }}
                        >
                            {generate.isPending ? "Generating..." : "Generate"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
