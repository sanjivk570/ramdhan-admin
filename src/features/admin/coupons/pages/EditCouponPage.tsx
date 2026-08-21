import { useNavigate, useParams } from "react-router-dom";

import CouponForm from "../components/CouponForm";
import { useCoupon } from "../hooks/useCoupon";
import { useUpdateCoupon } from "../hooks/useCouponMutations";
import type { CouponFormData } from "../validation/coupon.schema";
import type { UpdateCouponPayload } from "../types/coupon";

import { ROUTES } from "@/app/router/route-paths";
import {
    getApiErrorMessage,
    getApiFieldErrors,
} from "@/lib/api-error";
import { notification } from "@/lib/notification";
import { Button } from "@/components/ui/button";

function toDatetimeLocal(value: string | null | undefined): string {
    if (!value) {
        return "";
    }
    return value.replace(" ", "T").slice(0, 16);
}

function normalizeDate(value: string): string | undefined {
    if (!value) {
        return undefined;
    }
    const replaced = value.replace("T", " ");
    return replaced.length === 16 ? `${replaced}:00` : replaced;
}

export default function EditCouponPage() {
    const navigate = useNavigate();
    const { uuid } = useParams<{ uuid: string }>();

    const { data: coupon, isLoading, isError } = useCoupon(uuid);
    const update = useUpdateCoupon();

    if (!uuid) {
        return null;
    }

    if (isLoading) {
        return <div className="text-sm text-muted-foreground">Loading coupon...</div>;
    }

    if (isError || !coupon) {
        return (
            <div className="space-y-4">
                <h1 className="text-2xl font-semibold">Coupon Not Found</h1>
                <p className="text-sm text-muted-foreground">
                    Unable to load the requested coupon.
                </p>
                <Button variant="outline" onClick={() => navigate(ROUTES.COUPONS)}>
                    Back to Coupons
                </Button>
            </div>
        );
    }

    const handleSubmit = async (data: CouponFormData) => {
        const payload: UpdateCouponPayload = {
            code: data.code,
            name: data.name,
            discount_type: data.discount_type,
            discount_value: data.discount_value,
            minimum_order_amount: data.minimum_order_amount,
            per_customer_limit: data.per_customer_limit,
            is_active: data.is_active,
        };

        if (data.maximum_discount !== "" && data.maximum_discount != null) {
            payload.maximum_discount = Number(data.maximum_discount);
        }

        if (data.usage_limit !== "" && data.usage_limit != null) {
            payload.usage_limit = Number(data.usage_limit);
        }

        payload.starts_at = normalizeDate(data.starts_at ?? "");
        payload.ends_at = normalizeDate(data.ends_at ?? "");

        try {
            await update.mutateAsync({ uuid, data: payload });
            notification.success(
                "Coupon updated successfully.",
                "The coupon has been updated."
            );
            navigate(ROUTES.COUPONS);
        } catch {
            notification.error(
                "Unable to update coupon.",
                "Please check the form and try again."
            );
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold tracking-tight">
                    Edit Coupon
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    Update coupon {coupon.code}.
                </p>
            </div>

            <CouponForm
                mode="edit"
                initialData={{
                    code: coupon.code,
                    name: coupon.name,
                    discount_type: coupon.discount_type as "percentage" | "fixed",
                    discount_value: Number(coupon.discount_value),
                    maximum_discount:
                        coupon.maximum_discount ?? undefined,
                    minimum_order_amount: Number(coupon.minimum_order_amount),
                    usage_limit: coupon.usage_limit ?? undefined,
                    per_customer_limit: Number(coupon.per_customer_limit),
                    starts_at: toDatetimeLocal(coupon.starts_at),
                    ends_at: toDatetimeLocal(coupon.ends_at),
                    is_active: coupon.is_active,
                }}
                onSubmit={handleSubmit}
                loading={update.isPending}
                serverErrors={getApiFieldErrors(update.error)}
                serverMessage={getApiErrorMessage(update.error)}
                onCancel={() => navigate(ROUTES.COUPONS)}
            />
        </div>
    );
}
