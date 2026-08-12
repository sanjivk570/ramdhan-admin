// import { useLocation } from "react-router-dom";

// export default function Breadcrumbs() {
//     const { pathname } = useLocation();

//     const items = pathname
//         .split("/")
//         .filter(Boolean);

//     if (items.length === 0) {
//         return (
//             <span className="text-sm text-muted-foreground">
//                 Dashboard
//             </span>
//         );
//     }

//     return (
//         <div className="flex items-center gap-2 text-sm">
//             <span>Dashboard</span>

//             {items.map((item, index) => (
//                 <span key={index}>
//                     / {item.charAt(0).toUpperCase() + item.slice(1)}
//                 </span>
//             ))}
//         </div>
//     );
// }

import { Link, useLocation } from "react-router-dom";

export default function Breadcrumbs() {
  const { pathname } = useLocation();

  const items = pathname.split("/").filter(Boolean);

  if (items.length === 0) {
    return (
      <span className="text-sm text-muted-foreground">
        Dashboard
      </span>
    );
  }

  return (
    <div className="flex items-center gap-2 text-sm">
      <Link
        to="/"
        className="text-muted-foreground hover:text-foreground"
      >
        Dashboard
      </Link>

      {items.map((item, index) => {
        const path = "/" + items.slice(0, index + 1).join("/");

        const label = item
          .replace(/-/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase());

        return (
          <span key={path} className="flex items-center gap-2">
            <span>/</span>

            <Link
              to={path}
              className="hover:text-primary"
            >
              {label}
            </Link>
          </span>
        );
      })}
    </div>
  );
}