import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function UserToolbar() {
    return (
        <div className="flex items-center justify-between gap-4">

            <Input
                placeholder="Search users..."
                className="max-w-sm"
            />

            <Button>
                <Plus className="mr-2 h-4 w-4" />

                Create User
            </Button>

        </div>
    );
}