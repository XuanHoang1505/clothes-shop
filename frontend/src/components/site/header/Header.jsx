
import { ShoppingCart, User } from "lucide-react"

const Header = () => {
    return (
        <header className="border-b">
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <h1 className="text-2xl font-bold">SHOP.CO</h1>
                    <nav className="hidden md:flex items-center gap-6 text-sm">
                        <button className="hover:text-gray-600">Shop</button>
                        <a href="#" className="hover:text-gray-600">On Sale</a>
                        <a href="#" className="hover:text-gray-600">New Arrivals</a>
                        <a href="#" className="hover:text-gray-600">Brands</a>
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    <div className="hidden md:block relative">
                        <input
                            type="text"
                            placeholder="Search for products..."
                            className="w-80 px-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
                        />
                    </div>
                    <ShoppingCart size={24} className="cursor-pointer" />
                    <User size={24} className="cursor-pointer" />
                </div>
            </div>
        </header>
    )
}
export default Header