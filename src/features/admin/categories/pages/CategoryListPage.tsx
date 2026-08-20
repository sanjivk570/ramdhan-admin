import { Button } from "@/components/ui/button";

import {
DataTable,
useDataTable,
} from "@/components/data-table";

import {
useCategories,
} from "../hooks/useCategories";
import {
useDeleteCategory,
} from "../hooks/useDeleteCategory";

import {
useUpdateCategoryStatus,
} from "../hooks/useUpdateCategoryStatus";

import {
categoryTableConfig,
} from "../config/category-table-config";

import {
ROUTES,
} from "@/app/router/route-paths";

import {
Link,
useNavigate,
} from "react-router-dom";

import {
useState,
} from "react";

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

import type {
Category,
} from "../types/category";


import {
notification,
} from "@/lib/notification";

export default function CategoryListPage() {


const table = useDataTable({
    storageKey: "categories",
});

const navigate = useNavigate();


/*
|--------------------------------------------------------------------------
| Categories
|--------------------------------------------------------------------------
*/

const {
    data,
    isLoading,
} = useCategories(
    table.query as any
);


/*
|--------------------------------------------------------------------------
| Delete
|--------------------------------------------------------------------------
*/

const [
    deleteCategory,
    setDeleteCategory,
] = useState<Category | null>(null);

const deleteMutation =
    useDeleteCategory();


/*
|--------------------------------------------------------------------------
| Status
|--------------------------------------------------------------------------
*/

const [
    statusCategory,
    setStatusCategory,
] = useState<Category | null>(null);

const [
    statusValue,
    setStatusValue,
] = useState<boolean | null>(null);

const statusMutation =
    useUpdateCategoryStatus();


/*
|--------------------------------------------------------------------------
| Pagination Meta
|--------------------------------------------------------------------------
*/

const meta = data?.meta
    ? {

        ...data.meta,

        from:
            (data.meta.current_page - 1) *
                data.meta.per_page +
            1,

        to: Math.min(
            data.meta.current_page *
                data.meta.per_page,

            data.meta.total,
        ),

    }
    : undefined;


/*
|--------------------------------------------------------------------------
| Delete Category
|--------------------------------------------------------------------------
*/

const handleDelete = () => {

    if (!deleteCategory) {
        return;
    }

    deleteMutation.mutate(
        deleteCategory.uuid,
        {

            onSuccess: () => {

                notification.success(
                    "Category deleted successfully.",
                    "The category has been deleted."
                );

                setDeleteCategory(null);
            },

            onError: () => {

                notification.error(
                    "Unable to delete category.",
                    "Please try again."
                );

            },

        }
    );

};


/*
|--------------------------------------------------------------------------
| Update Category Status
|--------------------------------------------------------------------------
*/

const handleStatusConfirm = () => {

    if (
        !statusCategory ||
        statusValue === null
    ) {
        return;
    }

    statusMutation.mutate(
        {
            uuid: statusCategory.uuid,
            status: statusValue,
        },
        {

            onSuccess: () => {

                setStatusCategory(null);

                setStatusValue(null);

                notification.success(

                    statusValue
                        ? "Category activated successfully."
                        : "Category deactivated successfully.",

                    statusValue
                        ? "The category has been activated."
                        : "The category has been deactivated."

                );

            },

            onError: () => {

                notification.error(
                    "Unable to update category status.",
                    "Please try again."
                );

            },

        }
    );

};


/*
|--------------------------------------------------------------------------
| Render
|--------------------------------------------------------------------------
*/

return (
    <>

        <DataTable

            config={categoryTableConfig({

                /*
                |--------------------------------------------------------------------------
                | View
                |--------------------------------------------------------------------------
                */

                onView: (category) => {

                    navigate(
                        `${ROUTES.CATEGORIES}/${category.uuid}`
                    );

                },


                /*
                |--------------------------------------------------------------------------
                | Edit
                |--------------------------------------------------------------------------
                */

                onEdit: (category) => {

                    navigate(
                        `${ROUTES.CATEGORIES}/${category.uuid}/edit`
                    );

                },


                /*
                |--------------------------------------------------------------------------
                | Delete
                |--------------------------------------------------------------------------
                */

                onDelete: (category) => {

                    setDeleteCategory(
                        category
                    );

                },


                /*
                |--------------------------------------------------------------------------
                | Activate
                |--------------------------------------------------------------------------
                */

                onActivate: (category) => {

                    setStatusCategory(
                        category
                    );

                    setStatusValue(
                        true
                    );

                },


                /*
                |--------------------------------------------------------------------------
                | Deactivate
                |--------------------------------------------------------------------------
                */

                onDeactivate: (category) => {

                    setStatusCategory(
                        category
                    );

                    setStatusValue(
                        false
                    );

                },

            })}

            table={table as any}

            rows={
                data?.data ?? []
            }

            meta={meta}

            loading={isLoading}

            emptyState={{

                title:
                    "No categories found",

                description:
                    "Try another search or create a new category.",

                actionLabel:
                    "Create Category",

                onAction: () => {

                    navigate(
                        `${ROUTES.CATEGORIES}/create`
                    );

                },

            }}

        >

            <Button>

                <Link
                    to={
                        `${ROUTES.CATEGORIES}/create`
                    }
                >
                    Create Category
                </Link>

            </Button>

        </DataTable>


        {/* -----------------------------------------------------------------
            Delete Confirmation
        ----------------------------------------------------------------- */}

        <AlertDialog

            open={
                Boolean(
                    deleteCategory
                )
            }

            onOpenChange={(
                open
            ) => {

                if (!open) {

                    setDeleteCategory(
                        null
                    );

                }

            }}

        >

            <AlertDialogContent>

                <AlertDialogHeader>

                    <AlertDialogTitle>
                        Delete Category?
                    </AlertDialogTitle>

                    <AlertDialogDescription>

                        Are you sure you want to
                        delete{" "}

                        <span className="
                            font-medium
                            text-foreground
                        ">

                            {
                                deleteCategory?.name ||
                                "this category"
                            }

                        </span>

                        ?

                        <br />

                        This action will remove the
                        category from the categories
                        list.

                    </AlertDialogDescription>

                </AlertDialogHeader>


                <AlertDialogFooter>

                    <AlertDialogCancel
                        disabled={
                            deleteMutation.isPending
                        }
                    >
                        Cancel
                    </AlertDialogCancel>


                    <AlertDialogAction

                        disabled={
                            deleteMutation.isPending
                        }

                        onClick={(
                            event
                        ) => {

                            event.preventDefault();

                            handleDelete();

                        }}

                        className="
                            bg-destructive
                            text-destructive-foreground
                            hover:bg-destructive/90
                        "
                    >

                        {
                            deleteMutation.isPending
                                ? "Deleting..."
                                : "Delete"
                        }

                    </AlertDialogAction>

                </AlertDialogFooter>

            </AlertDialogContent>

        </AlertDialog>


        {/* -----------------------------------------------------------------
            Activate / Deactivate Confirmation
        ----------------------------------------------------------------- */}

        <AlertDialog

            open={
                statusCategory !== null &&
                statusValue !== null
            }

            onOpenChange={(
                open
            ) => {

                if (!open) {

                    setStatusCategory(
                        null
                    );

                    setStatusValue(
                        null
                    );

                }

            }}

        >

            <AlertDialogContent>

                <AlertDialogHeader>

                    <AlertDialogTitle>

                        {
                            statusValue
                                ? "Activate Category?"
                                : "Deactivate Category?"
                        }

                    </AlertDialogTitle>


                    <AlertDialogDescription>

                        Are you sure you want to{" "}

                        {
                            statusValue
                                ? "activate"
                                : "deactivate"
                        }

                        {" "}

                        <span className="
                            font-semibold
                            text-foreground
                        ">

                            {
                                statusCategory?.name ||
                                "this category"
                            }

                        </span>

                        ?

                    </AlertDialogDescription>

                </AlertDialogHeader>


                <AlertDialogFooter>

                    <AlertDialogCancel
                        disabled={
                            statusMutation.isPending
                        }
                    >
                        Cancel
                    </AlertDialogCancel>


                    <AlertDialogAction

                        disabled={
                            statusMutation.isPending
                        }

                        onClick={
                            handleStatusConfirm
                        }
                    >

                        {
                            statusMutation.isPending
                                ? "Updating..."
                                : statusValue
                                    ? "Activate"
                                    : "Deactivate"
                        }

                    </AlertDialogAction>

                </AlertDialogFooter>

            </AlertDialogContent>

        </AlertDialog>

    </>
);

}
