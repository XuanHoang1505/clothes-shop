import ProductService from '@/services/site/ProductSerivice';
import { Star, Check, Mail } from 'lucide-react';
import { useEffect, useState } from 'react';

function Home() {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const response = await ProductService.getProducts();
            setProducts(response);
        } catch (error) {
            console.error("Lỗi khi lấy sản phẩm:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    console.log(products);
    
    const brands = ['VERSACE', 'ZARA', 'GUCCI', 'PRADA', 'Calvin Klein'];
    
    const newArrivals = [
        { name: 'T-shirt with Tape Details', price: 120, rating: 4.5, reviews: 45, image: 'bg-gray-100' },
        { name: 'Skinny Fit Jeans', price: 240, oldPrice: 260, discount: 20, rating: 3.5, reviews: 32, image: 'bg-gray-100' },
        { name: 'Checkered Shirt', price: 180, rating: 4.5, reviews: 40, image: 'bg-gray-100' },
        { name: 'Sleeve Striped T-shirt', price: 130, oldPrice: 160, discount: 30, rating: 4.5, reviews: 45, image: 'bg-gray-100' }
    ];
    
    const topSelling = [
        { name: 'Vertical Striped Shirt', price: 212, oldPrice: 232, discount: 20, rating: 5.0, reviews: 60, image: 'bg-gray-100' },
        { name: 'Courage Graphic T-shirt', price: 145, rating: 4.0, reviews: 40, image: 'bg-gray-100' },
        { name: 'Loose Fit Bermuda Shorts', price: 80, rating: 3.0, reviews: 30, image: 'bg-gray-100' },
        { name: 'Faded Skinny Jeans', price: 210, rating: 4.5, reviews: 46, image: 'bg-gray-100' }
    ];
    
    const dressStyles = [
        { name: 'Casual', image: 'bg-gray-100' },
        { name: 'Formal', image: 'bg-gray-100' },
        { name: 'Party', image: 'bg-gray-100' },
        { name: 'Gym', image: 'bg-gray-100' }
    ];
    
    const testimonials = [
        { name: 'Sarah M.', rating: 5, text: "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations." },
        { name: 'Alex K.', rating: 5, text: "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions." },
        { name: 'James L.', rating: 5, text: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends." }
    ];

    const renderStars = (rating) => {
        return [...Array(5)].map((_, i) => (
            <Star key={i} className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
        ));
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Top Banner */}
            <div className=" text-black text-center py-2 text-sm">
                Sign up and get 20% off to your first order. <span className="underline cursor-pointer">Sign Up Now</span>
                <button className="absolute right-4 top-2 text-black ">×</button>
            </div>

            {/* Header */}
            <header className="border-b">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="text-2xl font-bold">SHOP.CO</div>
                    <nav className="hidden md:flex space-x-6 text-sm">
                        <a href="#" className="hover:text-gray-600">Shop</a>
                        <a href="#" className="hover:text-gray-600">On Sale</a>
                        <a href="#" className="hover:text-gray-600">New Arrivals</a>
                        <a href="#" className="hover:text-gray-600">Brands</a>
                    </nav>
                    <div className="flex items-center space-x-4">
                        <input type="text" placeholder="Search for products..." className="hidden md:block border rounded-full px-4 py-2 w-64" />
                        <button className="hover:text-gray-600">🛒</button>
                        <button className="hover:text-gray-600">👤</button>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <h1 className="text-5xl font-bold mb-4">FIND CLOTHES THAT MATCHES YOUR STYLE</h1>
                        <p className="text-gray-600 mb-6">Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.</p>
                        <button className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800">Shop Now</button>
                        <div className="grid grid-cols-3 gap-8 mt-12">
                            <div>
                                <div className="text-3xl font-bold">200+</div>
                                <div className="text-gray-600 text-sm">International Brands</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold">2,000+</div>
                                <div className="text-gray-600 text-sm">High-Quality Products</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold">30,000+</div>
                                <div className="text-gray-600 text-sm">Happy Customers</div>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
                            <div className="text-gray-400">Hero Image</div>
                        </div>
                        <div className="absolute top-10 right-10 text-4xl">✦</div>
                        <div className="absolute bottom-10 left-10 text-4xl">✦</div>
                    </div>
                </div>
            </section>

            {/* Brands */}
            <section className="bg-black py-8">
                <div className="max-w-7xl mx-auto px-4 flex justify-between items-center flex-wrap gap-8 fl">
                    {brands.map((brand, i) => (
                        <div key={i} className="text-white text-2xl font-bold">{brand}</div>
                    ))}
                </div>
            </section>

            {/* New Arrivals */}
            <section className="max-w-7xl mx-auto px-4 py-16">
                <h2 className="text-4xl font-bold text-center mb-12">NEW ARRIVALS</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {newArrivals.map((item, i) => (
                        <div key={i} className="group">
                            <div className={`${item.image} h-64 rounded-lg mb-4 flex items-center justify-center`}>
                                <div className="text-gray-400">Product Image</div>
                            </div>
                            <h3 className="font-semibold mb-2">{item.name}</h3>
                            <div className="flex items-center mb-2">
                                <div className="flex">{renderStars(item.rating)}</div>
                                <span className="text-sm text-gray-600 ml-2">{item.rating}/5</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="font-bold">${item.price}</span>
                                {item.oldPrice && (
                                    <>
                                        <span className="text-gray-400 line-through">${item.oldPrice}</span>
                                        <span className="text-red-500 text-sm bg-red-100 px-2 py-1 rounded-full">-{item.discount}%</span>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-8">
                    <button className="border border-gray-300 px-8 py-3 rounded-full hover:bg-gray-50">View All</button>
                </div>
            </section>

            {/* Top Selling */}
            <section className="max-w-7xl mx-auto px-4 py-16">
                <h2 className="text-4xl font-bold text-center mb-12">TOP SELLING</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {topSelling.map((item, i) => (
                        <div key={i} className="group">
                            <div className={`${item.image} h-64 rounded-lg mb-4 flex items-center justify-center`}>
                                <div className="text-gray-400">Product Image</div>
                            </div>
                            <h3 className="font-semibold mb-2">{item.name}</h3>
                            <div className="flex items-center mb-2">
                                <div className="flex">{renderStars(item.rating)}</div>
                                <span className="text-sm text-gray-600 ml-2">{item.rating}/5</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="font-bold">${item.price}</span>
                                {item.oldPrice && (
                                    <>
                                        <span className="text-gray-400 line-through">${item.oldPrice}</span>
                                        <span className="text-red-500 text-sm bg-red-100 px-2 py-1 rounded-full">-{item.discount}%</span>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-8">
                    <button className="border border-gray-300 px-8 py-3 rounded-full hover:bg-gray-50">View All</button>
                </div>
            </section>

            {/* Browse by Dress Style */}
            <section className="max-w-7xl mx-auto px-4 py-16">
                <div className="bg-gray-50 rounded-3xl p-12">
                    <h2 className="text-4xl font-bold text-center mb-12">BROWSE BY DRESS STYLE</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {dressStyles.map((style, i) => (
                            <div key={i} className={`${style.image} rounded-2xl p-8 h-64 flex items-start justify-between cursor-pointer hover:shadow-lg transition`}>
                                <span className="text-2xl font-bold">{style.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="max-w-7xl mx-auto px-4 py-16">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-4xl font-bold">OUR HAPPY CUSTOMERS</h2>
                    <div className="flex gap-2">
                        <button className="border rounded-full p-2 hover:bg-gray-50">←</button>
                        <button className="border rounded-full p-2 hover:bg-gray-50">→</button>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {testimonials.map((item, i) => (
                        <div key={i} className="border rounded-lg p-6">
                            <div className="flex mb-4">{renderStars(item.rating)}</div>
                            <div className="flex items-center mb-4">
                                <span className="font-semibold">{item.name}</span>
                                <Check className="w-4 h-4 text-green-500 ml-2" />
                            </div>
                            <p className="text-gray-600 text-sm">{item.text}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Newsletter */}
            <section className="max-w-7xl mx-auto px-4 py-16">
                <div className="bg-black text-white rounded-3xl p-12 flex flex-col md:flex-row justify-between items-center gap-8">
                    <h2 className="text-3xl font-bold">STAY UPTO DATE ABOUT OUR LATEST OFFERS</h2>
                    <div className="flex flex-col gap-4 w-full md:w-auto">
                        <div className="relative">
                            <Mail className="absolute left-4 top-3 w-5 h-5 text-gray-400" />
                            <input type="email" placeholder="Enter your email address" className="w-full md:w-80 pl-12 pr-4 py-3 rounded-full text-black" />
                        </div>
                        <button className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-100">Subscribe to Newsletter</button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-50 mt-16">
                <div className="max-w-7xl mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
                        <div className="md:col-span-2">
                            <h3 className="text-2xl font-bold mb-4">SHOP.CO</h3>
                            <p className="text-gray-600 text-sm mb-4">We have clothes that suits your style and which you're proud to wear. From women to men.</p>
                            <div className="flex gap-4">
                                <button className="border rounded-full p-2 hover:bg-white">f</button>
                                <button className="border rounded-full p-2 hover:bg-white bg-black text-white">𝕏</button>
                                <button className="border rounded-full p-2 hover:bg-white">in</button>
                                <button className="border rounded-full p-2 hover:bg-white">G</button>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">COMPANY</h4>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li><a href="#" className="hover:text-black">About</a></li>
                                <li><a href="#" className="hover:text-black">Features</a></li>
                                <li><a href="#" className="hover:text-black">Works</a></li>
                                <li><a href="#" className="hover:text-black">Career</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">HELP</h4>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li><a href="#" className="hover:text-black">Customer Support</a></li>
                                <li><a href="#" className="hover:text-black">Delivery Details</a></li>
                                <li><a href="#" className="hover:text-black">Terms & Conditions</a></li>
                                <li><a href="#" className="hover:text-black">Privacy Policy</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">FAQ</h4>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li><a href="#" className="hover:text-black">Account</a></li>
                                <li><a href="#" className="hover:text-black">Manage Deliveries</a></li>
                                <li><a href="#" className="hover:text-black">Orders</a></li>
                                <li><a href="#" className="hover:text-black">Payments</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
                        <p>Shop.co © 2000-2023, All Rights Reserved</p>
                        <div className="flex gap-2 mt-4 md:mt-0">
                            <img src="/api/placeholder/40/25" alt="Visa" className="h-6" />
                            <img src="/api/placeholder/40/25" alt="Mastercard" className="h-6" />
                            <img src="/api/placeholder/40/25" alt="PayPal" className="h-6" />
                            <img src="/api/placeholder/40/25" alt="Apple Pay" className="h-6" />
                            <img src="/api/placeholder/40/25" alt="Google Pay" className="h-6" />
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Home;