import { Input } from "@/components/ui/input";

interface Props {

    label: string;

    value?: string;

    placeholder?: string;

    onChange: (value: string) => void;

}

export default function FilterDate({

    label,

    value,

    placeholder,

    onChange,

}: Props) {

    return (

        <div className="space-y-2">

            <label className="text-sm font-medium">

                {label}

            </label>

            <Input

                type="date"

                value={value ?? ""}

                placeholder={placeholder}

                onChange={(e) =>

                    onChange(e.target.value)

                }

            />

        </div>

    );

}