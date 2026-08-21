import { useNavigate } from "react-router-dom";

import CouponForm from "../components/CouponForm";
import { useCreateCoupon } from "../hooks/useCouponMutations";
import type { CouponFormData } from "../validation/coupon.schema";
import type { CreateCouponPayload } from "../types/coupon";

import { ROUTES } from "@/app/router/route-paths";
import {
    getApiErrorMessage,
    getApiFieldErrors,
} from "@/lib/api-error";
import { notification } from "@/lib/notification";

function normalizeDate(value: string): string | undefined {
    if (!value) {
        return undefined;
    }
    const replaced = value.replace("T", " ");
    return replaced.length === 16 ? `${replaced}:00` : replaced;
}

export default function CreateCouponPage() {
    const navigate = useNavigate();
    const create = useCreateCoupon();

    const handleSubmit = async (data: CouponFormData) => {
        const payload: CreateCouponPayload = {
            code: data.code,
            name: data.name,
            discount_type: data.discount_type,
            discount_value: data.discount_value,
            minimum_order_amount: data.minimum_order_amount,
            per_customer_limit: data.per_customer_limit,
            is_active: data.is_active,
        };

        if (
            data.maximum_discount !== "" &&
            data.maximum_discount != null
        ) {
            payload.maximum_discount = Number(data.maximum_discount);
        }

        if (data.usage_limit !== "" && data.usage_limit != null) {
            payload.usage_limit = Number(data.usage_limit);
        }

        payload.starts_at = normalizeDate(data.starts_at ?? "");
        payload.ends_at = normalizeDate(data.ends_at ?? "");

        try {
            await create.mutateAsync(payload);
            notification.success(
                "Coupon created successfully.",
                "The coupon has been created."
            );
            navigate(ROUTES.COUPONS);
        } catch {
            notification.error(
                "Unable to create coupon.",
                "Please check the form and try again."
            );
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold tracking-tight">
                    Create Coupon
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    Create a new discount coupon.
                </p>
            </div>

            <CouponForm
                onSubmit={handleSubmit}
                loading={create.isPending}
                serverErrors={getApiFieldErrors(create.error)}
                serverMessage={getApiErrorMessage(create.error)}
                onCancel={() => navigate(ROUTES.COUPONS)}
            />
        </div>
    );
}
