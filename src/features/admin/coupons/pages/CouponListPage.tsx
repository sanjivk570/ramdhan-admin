import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DataTable, useDataTable } from "@/components/data-table";
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

import { ROUTES } from "@/app/router/route-paths";
import { notification } from "@/lib/notification";

import type { Coupon } from "../types/coupon";
import { useCoupons } from "../hooks/useCoupons";
import { useDeleteCoupon } from "../hooks/useCouponMutations";
import { couponTableConfig } from "../config/coupon-table-config";

export default function CouponListPage() {
    const navigate = useNavigate();
    const table = useDataTable({ storageKey: "coupons" });

    const { data, isLoading } = useCoupons(table.query as any);
    const deleteMutation = useDeleteCoupon();
    const [deleteItem, setDeleteItem] = useState<Coupon | null>(null);

    const meta = data?.meta
        ? {
              ...data.meta,
              from:
                  (data.meta.current_page - 1) *
                      data.meta.per_page +
                  1,
              to: Math.min(
                  data.meta.current_page * data.meta.per_page,
                  data.meta.total
              ),
          }
        : undefined;

    const config = couponTableConfig({
        onEdit: (coupon) =>
            navigate(`${ROUTES.COUPONS}/${coupon.uuid}/edit`),
        onDelete: (coupon) => setDeleteItem(coupon),
    });

    const handleDelete = () => {
        if (!deleteItem) {
            return;
        }
        deleteMutation.mutate(deleteItem.uuid, {
            onSuccess: () => {
                setDeleteItem(null);
                notification.success(
                    "Coupon deleted successfully.",
                    "The coupon has been removed."
                );
            },
            onError: () => {
                notification.error(
                    "Unable to delete coupon.",
                    "Please try again."
                );
            },
        });
    };

    return (
        <>
            <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Coupons
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Manage discount coupons for customers.
                        </p>
                    </div>
                    <Button>
                        <Link to={`${ROUTES.COUPONS}/create`}>
                            <Plus className="mr-2 h-4 w-4" />
                            Create Coupon
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
                open={deleteItem !== null}
                onOpenChange={(open) => {
                    if (!open) {
                        setDeleteItem(null);
                    }
                }}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Coupon?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete{" "}
                            <span className="font-semibold text-foreground">
                                {deleteItem?.code}
                            </span>
                            ? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={deleteMutation.isPending}>
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            disabled={deleteMutation.isPending}
                            onClick={(event) => {
                                event.preventDefault();
                                handleDelete();
                            }}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            {deleteMutation.isPending ? "Deleting..." : "Delete"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
