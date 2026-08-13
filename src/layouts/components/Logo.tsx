export default function Logo() {
    return (
        <div className="flex h-16 items-center border-b border-slate-800 px-6">
            <h1 className="text-2xl font-bold text-white">
                {/* Ram<span className="text-blue-500">Dhan</span> */}

                <div className="h-12 w-12 flex items-center justify-center">
                    <img
                        src="http://dev.ramdhan.in/images/logo/RamDhanLogo.webp" alt="RamDhan" className="h-full w-full object-cover " loading="lazy"
                    />
                </div>

            </h1>
        </div>
    );
}