import React, { useState } from 'react';
import { ShoppingCart, User, X, Minus, Plus, Tag, ArrowRight, Mail, Twitter, Facebook, Instagram, Github } from 'lucide-react';
import Header from '@/components/site/header/Header';
import { Footer } from 'antd/es/layout/layout';

export default function ShoppingCartPage() {
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: 'Gradient Graphic T-shirt',
            size: 'Large',
            color: 'White',
            price: 145,
            quantity: 1,
            image: '/api/placeholder/80/80'
        },
        {
            id: 2,
            name: 'Checkered Shirt',
            size: 'Medium',
            color: 'Red',
            price: 180,
            quantity: 1,
            image: '/api/placeholder/80/80'
        },
        {
            id: 3,
            name: 'Skinny Fit Jeans',
            size: 'Large',
            color: 'Blue',
            price: 240,
            quantity: 1,
            image: '/api/placeholder/80/80'
        }
    ]);

    const [promoCode, setPromoCode] = useState('');
    const [email, setEmail] = useState('');

    const updateQuantity = (id, delta) => {
        setCartItems(items =>
            items.map(item =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                    : item
            )
        );
    };

    const removeItem = (id) => {
        setCartItems(items => items.filter(item => item.id !== id));
    };

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discount = subtotal * 0.2;
    const deliveryFee = 15;
    const total = subtotal - discount + deliveryFee;

    return (
        <div className="min-h-screen bg-white">
            {/* Top Banner */}
            <div className="bg-black text-white text-center py-2 px-4 text-sm relative">
                Sign up and get 20% off to your first order. <span className="underline font-medium cursor-pointer">Sign Up Now</span>
                <button className="absolute right-4 top-1/2 -translate-y-1/2">
                    <X size={16} />
                </button>
            </div>

            <Header />

            {/* Breadcrumb */}
            <div className="max-w-7xl mx-auto px-4 py-4 text-sm text-gray-600">
                <span>Home</span> <span className="mx-2">›</span> <span className="text-black">Cart</span>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                <h2 className="text-3xl font-bold mb-8">YOUR CART</h2>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map(item => (
                            <div key={item.id} className="border rounded-lg p-4 flex gap-4">
                                <div className="w-24 h-24 bg-gray-100 rounded-lg flex-shrink-0"></div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="font-semibold text-lg">{item.name}</h3>
                                            <p className="text-sm text-gray-600">Size: {item.size}</p>
                                            <p className="text-sm text-gray-600">Color: {item.color}</p>
                                        </div>
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <X size={20} />
                                        </button>
                                    </div>
                                    <div className="flex justify-between items-center mt-4">
                                        <p className="text-xl font-bold">${item.price}</p>
                                        <div className="flex items-center gap-4 bg-gray-100 rounded-full px-4 py-2">
                                            <button
                                                onClick={() => updateQuantity(item.id, -1)}
                                                className="hover:text-gray-600"
                                            >
                                                <Minus size={16} />
                                            </button>
                                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, 1)}
                                                className="hover:text-gray-600"
                                            >
                                                <Plus size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="border rounded-lg p-6 sticky top-4">
                            <h3 className="text-xl font-bold mb-6">Order Summary</h3>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="font-semibold">${subtotal}</span>
                                </div>
                                <div className="flex justify-between text-red-500">
                                    <span>Discount (-20%)</span>
                                    <span className="font-semibold">-${discount}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Delivery Fee</span>
                                    <span className="font-semibold">${deliveryFee}</span>
                                </div>
                                <div className="border-t pt-4 flex justify-between text-lg">
                                    <span className="font-semibold">Total</span>
                                    <span className="font-bold">${total}</span>
                                </div>
                            </div>

                            <div className="flex gap-2 mb-4">
                                <div className="flex-1 relative">
                                    <Tag size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Add promo code"
                                        value={promoCode}
                                        onChange={(e) => setPromoCode(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
                                    />
                                </div>
                                <button className="px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800">
                                    Apply
                                </button>
                            </div>

                            <button className="w-full bg-black text-white py-4 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-gray-800">
                                Go to Checkout
                                <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Newsletter */}
            <div className="bg-black text-white mt-16">
                <div className="max-w-7xl mx-auto px-4 py-12">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <h3 className="text-3xl font-bold max-w-md">
                            STAY UPTO DATE ABOUT OUR LATEST OFFERS
                        </h3>
                        <div className="w-full md:w-auto space-y-3">
                            <div className="relative">
                                <Mail size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full md:w-80 pl-12 pr-4 py-3 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-gray-300"
                                />
                            </div>
                            <button className="w-full md:w-80 bg-white text-black py-3 rounded-full font-medium hover:bg-gray-100">
                                Subscribe to Newsletter
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />

        </div>
    );
}