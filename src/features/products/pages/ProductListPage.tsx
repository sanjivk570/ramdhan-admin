import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DataTable, useDataTable } from "@/components/data-table";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { notification } from "@/lib/notification";
import { ROUTES } from "@/app/router/route-paths";
import type { Product } from "../types/product";
import { useProducts } from "../hooks/useProducts";
import { useDeleteProduct } from "../hooks/useDeleteProduct";
import { useUpdateProductStatus } from "../hooks/useUpdateProductStatus";
import { productTableConfig } from "../config/product-table-config";

export default function ProductListPage() {
    const table = useDataTable({ storageKey: "products" });
    const navigate = useNavigate();

    const { data, isLoading } = useProducts(table.query as any);
    const deleteMutation = useDeleteProduct();
    const statusMutation = useUpdateProductStatus();

    const [deleteProduct, setDeleteProduct] = useState<Product | null>(null);
    const [statusProduct, setStatusProduct] = useState<Product | null>(null);
    const [statusValue, setStatusValue] = useState<boolean | null>(null);

    const meta = data?.meta
        ? {
              ...data.meta,
              from: (data.meta.current_page - 1) * data.meta.per_page + 1,
              to: Math.min(data.meta.current_page * data.meta.per_page, data.meta.total),
          }
        : undefined;

    const confirmDelete = () => {
        if (!deleteProduct) return;

        deleteMutation.mutate(deleteProduct.uuid, {
            onSuccess: () => {
                setDeleteProduct(null);
                notification.success("Product deleted successfully.", "The product has been removed.");
            },
            onError: () => notification.error("Unable to delete product.", "Please try again."),
        });
    };

    const confirmStatus = () => {
        if (!statusProduct || statusValue === null) return;

        statusMutation.mutate(
            { uuid: statusProduct.uuid, status: statusValue },
            {
                onSuccess: () => {
                    setStatusProduct(null);
                    setStatusValue(null);
                    notification.success(
                        statusValue ? "Product activated successfully." : "Product deactivated successfully.",
                        statusValue ? "The product is now active." : "The product is now inactive."
                    );
                },
                onError: () => notification.error("Unable to update product status.", "Please try again."),
            }
        );
    };

    return (
        <>
            <DataTable
                config={productTableConfig({
                    onView: (product) => navigate(`${ROUTES.PRODUCTS}/${product.uuid}`),
                    onEdit: (product) => navigate(`${ROUTES.PRODUCTS}/${product.uuid}/edit`),
                    onDelete: setDeleteProduct,
                    onActivate: (product) => {
                        setStatusProduct(product);
                        setStatusValue(true);
                    },
                    onDeactivate: (product) => {
                        setStatusProduct(product);
                        setStatusValue(false);
                    },
                })}
                table={table as any}
                rows={data?.data ?? []}
                meta={meta}
                loading={isLoading}
                emptyState={{
                    title: "No products found",
                    description: "Try another search or create a new product.",
                    actionLabel: "Create Product",
                    onAction: () => navigate(`${ROUTES.PRODUCTS}/create`),
                }}
            >
                {/* <Button asChild> */}
                <Button>
                    <Link to={`${ROUTES.PRODUCTS}/create`}>Create Product</Link>
                </Button>
            </DataTable>

            <AlertDialog open={Boolean(deleteProduct)} onOpenChange={(open) => !open && setDeleteProduct(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Product?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete{" "}
                            <span className="font-medium text-foreground">{deleteProduct?.name}</span>?
                            This action will remove the product from the active product list.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={deleteMutation.isPending}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            disabled={deleteMutation.isPending}
                            onClick={(event) => {
                                event.preventDefault();
                                confirmDelete();
                            }}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            {deleteMutation.isPending ? "Deleting..." : "Delete"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <AlertDialog
                open={Boolean(statusProduct && statusValue !== null)}
                onOpenChange={(open) => {
                    if (!open) {
                        setStatusProduct(null);
                        setStatusValue(null);
                    }
                }}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            {statusValue ? "Activate Product?" : "Deactivate Product?"}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to {statusValue ? "activate" : "deactivate"}{" "}
                            <span className="font-semibold text-foreground">{statusProduct?.name}</span>?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={statusMutation.isPending}>Cancel</AlertDialogCancel>
                        <AlertDialogAction disabled={statusMutation.isPending} onClick={confirmStatus}>
                            {statusMutation.isPending ? "Updating..." : statusValue ? "Activate" : "Deactivate"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
