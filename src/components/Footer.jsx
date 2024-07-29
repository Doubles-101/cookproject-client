export const Footer = () => {
    return (
        <footer className="bg-gray-600 text-white py-6">
            <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
                <div className="text-sm">
                    <p>&copy; {new Date().getFullYear()} Quick Cooks. All rights reserved.</p>
                </div>
                <div>
                    <img className="w-16" src="../media/imgs/QuickCooksWhite.png" alt="logo" />
                </div>
            </div>
        </footer>
    )
}
