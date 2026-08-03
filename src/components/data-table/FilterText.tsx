import { Input } from "@/components/ui/input";

interface FilterTextProps {
    label: string;
    value?: string;
    placeholder?: string;
    onChange: (value: string) => void;
}

export default function FilterText({
    label,
    value = "",
    placeholder,
    onChange,
}: FilterTextProps) {
    return (
        <div className="space-y-2">
            <label className="text-sm font-medium">
                {label}
            </label>

            <Input
                value={value}
                placeholder={
                    placeholder ?? `Search ${label}`
                }
                onChange={(e) =>
                    onChange(e.target.value)
                }
            />
        </div>
    );
}