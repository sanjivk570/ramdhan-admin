// // import { Outlet } from "react-router-dom";

// // import Sidebar from "./components/Sidebar";

// // import Header from "./components/Header";

// // export default function DashboardLayout() {
// //     return (
// //         <div className="flex h-screen overflow-hidden">

// //             <Sidebar />

// //             <div className="flex flex-1 flex-col">

// //                 <Header />

// //                 <main className="flex-1 overflow-auto bg-slate-100 p-6">
// //                     <Outlet />
// //                 </main>

// //             </div>

// //         </div>
// //     );
// // }

// import { Outlet } from "react-router-dom";

// import Sidebar from "./components/Sidebar";
// import Header from "./components/Header";

// export default function DashboardLayout() {

//     return (

//         <div className="flex min-h-screen bg-muted/30">

//             <Sidebar />

//             <div className="flex flex-1 flex-col">

//                 <Header />

//                 <main className="flex-1 overflow-auto p-6 bg-slate-50">

//                     <Outlet />

//                 </main>

//             </div>

//         </div>

//     );

// }

import { Outlet } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

export default function DashboardLayout() {
    return (
        <div className="flex min-h-screen w-full min-w-0 overflow-hidden bg-muted/30">

            {/* Sidebar must not shrink or scroll horizontally */}
            <Sidebar />

            {/* Main application area */}
            <div className="flex min-w-0 flex-1 flex-col overflow-hidden">

                <Header />

                {/* Only the main content can scroll */}
                <main className="min-w-0 flex-1 overflow-auto bg-slate-50 p-6">
                    <Outlet />
                </main>

            </div>

        </div>
    );
}