// import { Link, useLocation } from "react-router-dom";

// export default function Breadcrumbs() {
//   const { pathname } = useLocation();

//   const items = pathname.split("/").filter(Boolean);

//   if (items.length === 0) {
//     return (
//       <span className="text-sm text-muted-foreground">
//         Dashboard
//       </span>
//     );
//   }

//   return (
//     <div className="flex items-center gap-2 text-sm">
//       <Link
//         to="/"
//         className="text-muted-foreground hover:text-foreground"
//       >
//         Dashboard
//       </Link>

//       {items.map((item, index) => {
//         const path = "/" + items.slice(0, index + 1).join("/");

//         const label = item
//           .replace(/-/g, " ")
//           .replace(/\b\w/g, (char) => char.toUpperCase());

//         return (
//           <span key={path} className="flex items-center gap-2">
//             <span>/</span>

//             <Link
//               to={path}
//               className="hover:text-primary"
//             >
//               {label}
//             </Link>
//           </span>
//         );
//       })}
//     </div>
//   );
// }

import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "@/app/router/route-paths";

export default function Breadcrumbs() {
    const { pathname } = useLocation();

    const items = pathname.split("/").filter(Boolean);

    // Dashboard
    if (items.length === 0) {
        return (
            <span className="text-sm text-muted-foreground">
                Dashboard
            </span>
        );
    }

    // Remove "admin" from breadcrumb
    const breadcrumbItems =
        items[0] === "admin" ? items.slice(1) : items;

    return (
        <div className="flex items-center gap-2 text-sm">
            <Link
                to={ROUTES.DASHBOARD}
                className="text-muted-foreground hover:text-foreground"
            >
                Dashboard
            </Link>

            {breadcrumbItems.map((item, index) => {
                const path =
                    "/admin/" +
                    breadcrumbItems.slice(0, index + 1).join("/");

                const label = item
                    .replace(/-/g, " ")
                    .replace(/\b\w/g, (char) => char.toUpperCase());

                const isLast =
                    index === breadcrumbItems.length - 1;

                return (
                    <span
                        key={path}
                        className="flex items-center gap-2"
                    >
                        <span className="text-muted-foreground">
                            /
                        </span>

                        {isLast ? (
                            <span className="text-foreground font-medium">
                                {label}
                            </span>
                        ) : (
                            <Link
                                to={path}
                                className="text-muted-foreground hover:text-primary"
                            >
                                {label}
                            </Link>
                        )}
                    </span>
                );
            })}
        </div>
    );
}