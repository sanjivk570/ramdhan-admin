import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export interface FilterOption {
    label: string;
    value: string;
}

interface FilterSelectProps {
    label: string;
    value?: string;
    options: FilterOption[];
    onChange: (value: string) => void;
}

export default function FilterSelect({
    label,
    value,
    options,
    onChange,
}: FilterSelectProps) {
    return (
        <div className="space-y-2">
            <label className="text-sm font-medium">
                {label}
            </label>

            <Select
                value={value ?? ""}
                onValueChange={(val: string | null) => onChange(val ?? "")}
            >
                {/* <SelectTrigger>
                    <SelectValue placeholder={`Select ${label}`} />
                </SelectTrigger> */}

                <SelectTrigger>
                    <SelectValue>
                        {options.find((option) => option.value === value)?.label ??
                            `Select ${label}`}
                    </SelectValue>
                </SelectTrigger>

                <SelectContent>
                    <SelectItem value="">
                        All
                    </SelectItem>

                    {options.map((option) => (
                        <SelectItem
                            key={option.value}
                            value={option.value}
                        >
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}