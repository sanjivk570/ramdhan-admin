import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Pencil, Package, Layers3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDateTime } from "@/lib/date";
import { ROUTES } from "@/app/router/route-paths";
import { useProduct } from "../hooks/useProduct";
import { useProductVariants } from "../hooks/useProductVariants";

export default function ProductDetailsPage() {
    const navigate = useNavigate();
    const { uuid } = useParams<{ uuid: string }>();

    const { data: product, isLoading, isError } = useProduct(uuid);
    const { data: variants = [], isLoading: variantsLoading } = useProductVariants(uuid);

    if (isLoading) {
        return <div className="rounded-xl border bg-card p-6 text-sm text-muted-foreground">Loading product...</div>;
    }

    if (isError || !product) {
        return (
            <div className="space-y-4">
                <h1 className="text-2xl font-semibold">Product Details</h1>
                <div className="rounded-xl border bg-card p-6 text-sm text-destructive">
                    Product not found or something went wrong.
                </div>
                <Button variant="outline" onClick={() => navigate(ROUTES.PRODUCTS)}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
                </Button>
            </div>
        );
    }

    const lowStock = product.stock_quantity <= product.low_stock_threshold;

    return (
        <div className="space-y-6">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">{product.name}</h1>
                    <p className="mt-1 font-mono text-sm text-muted-foreground">{product.sku}</p>
                </div>

                <div className="flex gap-2">
                    <Button variant="outline" onClick={() => navigate(ROUTES.PRODUCTS)}>
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back
                    </Button>
                    <Button onClick={() => navigate(`${ROUTES.PRODUCTS}/${product.uuid}/edit`)}>
                        <Pencil className="mr-2 h-4 w-4" /> Edit
                    </Button>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
                <div className="rounded-xl border bg-card p-5">
                    <p className="text-sm text-muted-foreground">Selling Price</p>
                    <p className="mt-2 text-2xl font-semibold">₹{Number(product.price).toLocaleString("en-IN")}</p>
                </div>
                <div className="rounded-xl border bg-card p-5">
                    <p className="text-sm text-muted-foreground">Stock</p>
                    <p className={`mt-2 text-2xl font-semibold ${lowStock ? "text-destructive" : ""}`}>
                        {product.stock_quantity}
                    </p>
                    <p className="text-xs text-muted-foreground">Threshold: {product.low_stock_threshold}</p>
                </div>
                <div className="rounded-xl border bg-card p-5">
                    <p className="text-sm text-muted-foreground">Variants</p>
                    <p className="mt-2 text-2xl font-semibold">{variants.length}</p>
                </div>
                <div className="rounded-xl border bg-card p-5">
                    <p className="text-sm text-muted-foreground">Status</p>
                    <div className="mt-2">
                        <Badge variant={product.is_active ? "default" : "secondary"}>
                            {product.is_active ? "Active" : "Inactive"}
                        </Badge>
                    </div>
                </div>
            </div>

            <section className="overflow-hidden rounded-xl border bg-card shadow-sm">
                <div className="border-b bg-muted/20 px-6 py-4">
                    <h2 className="text-base font-semibold">Product Information</h2>
                    <p className="mt-1 text-sm text-muted-foreground">Catalog and commercial information.</p>
                </div>

                <div className="grid gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">
                    <Info label="Slug" value={product.slug} />
                    <Info label="SKU" value={product.sku} mono />
                    <Info label="Unit" value={product.unit?.name ?? String(product.unit_id ?? "-")} />
                    <Info label="Tax Class" value={product.tax_class?.name ?? String(product.tax_class_id ?? "-")} />
                    <Info label="Compare Price" value={product.compare_price == null ? "-" : `₹${Number(product.compare_price).toLocaleString("en-IN")}`} />
                    <Info label="Cost Price" value={product.cost_price == null ? "-" : `₹${Number(product.cost_price).toLocaleString("en-IN")}`} />
                    <Info label="Featured" value={product.is_featured ? "Yes" : "No"} />
                    <Info label="Created At" value={formatDateTime(product.created_at)} />
                    <Info label="Updated At" value={formatDateTime(product.updated_at)} />
                </div>

                <div className="border-t p-6">
                    <p className="text-sm text-muted-foreground">Categories</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                        {(product.categories ?? []).map((category) => (
                            <Badge key={category.uuid} variant="secondary">{category.name}</Badge>
                        ))}
                    </div>
                </div>

                <div className="border-t p-6">
                    <p className="text-sm text-muted-foreground">Description</p>
                    <p className="mt-2 whitespace-pre-wrap text-sm">{product.description || "-"}</p>
                </div>
            </section>

            <section className="overflow-hidden rounded-xl border bg-card shadow-sm">
                <div className="flex items-center justify-between border-b bg-muted/20 px-6 py-4">
                    <div>
                        <h2 className="text-base font-semibold">Product Variants</h2>
                        <p className="mt-1 text-sm text-muted-foreground">Variants are managed under this product.</p>
                    </div>
                    <Button onClick={() => navigate(`${ROUTES.PRODUCTS}/${product.uuid}/variants/create`)}>
                        <Layers3 className="mr-2 h-4 w-4" /> Add Variant
                    </Button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="border-b bg-muted/20">
                            <tr>
                                <th className="px-4 py-3 text-left">Variant</th>
                                <th className="px-4 py-3 text-left">SKU</th>
                                <th className="px-4 py-3 text-right">Price</th>
                                <th className="px-4 py-3 text-right">Stock</th>
                                <th className="px-4 py-3 text-left">Status</th>
                                <th className="px-4 py-3 text-left">Default</th>
                            </tr>
                        </thead>
                        <tbody>
                            {variants.map((variant) => (
                                <tr key={variant.uuid} className="border-b last:border-0">
                                    <td className="px-4 py-3 font-medium">{variant.name}</td>
                                    <td className="px-4 py-3 font-mono text-xs">{variant.sku}</td>
                                    <td className="px-4 py-3 text-right">₹{Number(variant.price).toLocaleString("en-IN")}</td>
                                    <td className="px-4 py-3 text-right">
                                        <span className={variant.stock_quantity <= variant.low_stock_threshold ? "font-semibold text-destructive" : ""}>
                                            {variant.stock_quantity}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <Badge variant={variant.is_active ? "default" : "secondary"}>
                                            {variant.is_active ? "Active" : "Inactive"}
                                        </Badge>
                                    </td>
                                    <td className="px-4 py-3">
                                        {variant.is_default ? <Badge>Default</Badge> : ""}

                                        <Button onClick={() => navigate(`${ROUTES.PRODUCT_VARIANTS}/${product.uuid}/edit/${variant.uuid}`)}>
                                            <Layers3 className="mr-2 h-4 w-4" /> Edit
                                        </Button>
                                        {/* <link rel="stylesheet" href="${ROUTES.PRODUCT_VARIANTS}/${variant.uuid}/edit" /> */}
                                    </td>
                                </tr>
                            ))}
                            {!variantsLoading && variants.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                                        No variants found.
                                    </td>
                                </tr>
                            )}
                            {variantsLoading && (
                                <tr>
                                    <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                                        Loading variants...
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

            <div className="flex items-center gap-2 rounded-xl border bg-card p-5 text-sm text-muted-foreground">
                <Package className="h-4 w-4" />
                Product UUID: <span className="font-mono">{product.uuid}</span>
            </div>
        </div>
    );
}

function Info({
    label,
    value,
    mono = false,
}: {
    label: string;
    value: string;
    mono?: boolean;
}) {
    return (
        <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className={`mt-1 text-sm font-medium ${mono ? "font-mono" : ""}`}>{value}</p>
        </div>
    );
}
