const NavBar = () => {
    return (
        <div className="w-full bg-transparent fixed top-0 left-0">
            <nav class="bg-transparent">
                <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
                    <a href="https://flowbite.com" class="flex items-center space-x-3 rtl:space-x-reverse">
                        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">WoC6.0</span>
                    </a>
                    <div class="flex items-center space-x-6 rtl:space-x-reverse">
                        <a href="/" class="text-sm  text-gray-500 dark:text-white hover:underline">Link</a>
                        <a href="/" class="text-sm  text-blue-600 dark:text-blue-500 hover:underline">Login</a>
                    </div>
                </div>
            </nav>
        </div>

    )
}

export default NavBar;