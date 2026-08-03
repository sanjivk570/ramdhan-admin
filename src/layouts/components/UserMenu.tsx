// import { useAuthStore } from "@/store/auth.store";

// export default function UserMenu() {

//     const user = useAuthStore((state) => state.user);

//     return (
//         <div className="flex items-center gap-3">

//             <div className="h-10 w-10 rounded-full bg-slate-300" />

//             <div>

//                 <div className="font-medium">
//                     {user?.first_name}
//                 </div>

//                 <div className="text-xs text-slate-500">
//                     {user?.email}
//                 </div>

//             </div>

//         </div>
//     );
// }

import { LogOut, User } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    Avatar,
    AvatarFallback,
} from "@/components/ui/avatar";

import { useAuthStore } from "@/store/auth.store";

import { useNavigate } from "react-router-dom";



export default function UserMenu() {

    const navigate = useNavigate();

    const logout = useAuthStore(state => state.logout);

    const handleLogout = () => {
        logout();

        navigate("/login");
    };

    const user = useAuthStore((state) => state.user);

    return (

        <DropdownMenu>

            <DropdownMenuTrigger>

                <Avatar>

                    <AvatarFallback>

                        {user?.first_name?.charAt(0)}

                    </AvatarFallback>

                </Avatar>

            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">

                <DropdownMenuItem>

                    <User className="mr-2 h-4 w-4" />

                    Profile

                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={handleLogout}>

                    <LogOut className="mr-2 h-4 w-4" />

                    Logout

                </DropdownMenuItem>

            </DropdownMenuContent>

        </DropdownMenu>

    );

}