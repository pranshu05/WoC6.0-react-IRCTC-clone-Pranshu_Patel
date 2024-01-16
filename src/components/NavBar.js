const NavBar = () => {
    return (
        <div className="w-full bg-transparent fixed top-0 left-0 z-10">
            <nav className="bg-transparent">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
                    <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">WoC6.0</span>
                    </a>
                    <div className="flex items-center space-x-6 rtl:space-x-reverse">
                        <a href="/profile" className="text-sm text-blue-500 hover:underline">Profile</a>
                        <a href="/signin" className="text-sm text-blue-500 hover:underline">SignIn</a>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default NavBar;
