import { useState } from 'react';
import { Minus, Plus, Check } from 'lucide-react';
import { Image } from "antd";

function ProductDetail() {
    const [selectedColor, setSelectedColor] = useState('olive');
    const [selectedSize, setSelectedSize] = useState('Large');
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);


    const colors = [
        { name: 'olive', class: 'bg-yellow-700' },
        { name: 'teal', class: 'bg-teal-700' },
        { name: 'navy', class: 'bg-blue-900' }
    ];

    const sizes = ['Small', 'Medium', 'Large', 'X-Large'];

    const images = [
        'https://sneakerdaily.vn/wp-content/uploads/2025/05/Ao-Travis-Scott-x-Nike-x-FC-Barcelona-Retro-2000_01-Home-Skeleton-Jersey.jpg',
        'https://sneakerdaily.vn/wp-content/uploads/2025/05/Ao-Travis-Scott-x-Nike-x-FC-Barcelona-Retro-2000_01-Home-Skeleton-Jersey-6.jpg',
        'https://www.retrosoccer.co.uk/cdn/shop/files/5bc5da6b_1080x.jpg?v=1751353906'
    ];

    const handleQuantityChange = (type) => {
        if (type === 'increment') {
            setQuantity(prev => prev + 1);
        } else if (type === 'decrement' && quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    return (
        <div className="min-h-screen bg-white p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column - Images */}
                    <div className="flex gap-4">
                        {/* Thumbnail Column */}
                        <div className="flex flex-col gap-3">
                            {images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedImage(idx)}
                                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${selectedImage === idx ? 'border-black' : 'border-gray-200'
                                        }`}
                                >
                                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                        <img src={img} alt={`Thumbnail ${idx + 1}`} className="object-cover w-full h-full" />
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* Main Image */}
                        <div className="flex-1 bg-gray-100 rounded-2xl overflow-hidden aspect-square flex items-center justify-center">
                            <div className="h-full w-full">
                                <img
                                    src={images[selectedImage]}
                                    alt={`Product Image ${selectedImage + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                    </div>

                    {/* Right Column - Product Info */}
                    <div className="flex flex-col">
                        <h1 className="text-4xl font-black mb-3">ONE LIFE GRAPHIC T-SHIRT</h1>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-4">
                            <div className="flex">
                                {[1, 2, 3, 4].map((star) => (
                                    <svg key={star} className="w-5 h-5 fill-yellow-400" viewBox="0 0 20 20">
                                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                    </svg>
                                ))}
                                <svg className="w-5 h-5 fill-yellow-400" viewBox="0 0 20 20">
                                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" clipPath="polygon(0 0, 50% 0, 50% 100%, 0 100%)" />
                                </svg>
                            </div>
                            <span className="text-sm font-medium">4.5/5</span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-3 mb-5">
                            <span className="text-3xl font-bold">$260</span>
                            <span className="text-2xl text-gray-400 line-through">$300</span>
                            <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">-40%</span>
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.
                        </p>

                        <div className="h-px bg-gray-200 mb-6"></div>

                        {/* Color Selection */}
                        <div className="mb-6">
                            <h3 className="text-sm font-medium text-gray-600 mb-3">Select Colors</h3>
                            <div className="flex gap-3">
                                {colors.map((color) => (
                                    <button
                                        key={color.name}
                                        onClick={() => setSelectedColor(color.name)}
                                        className={`w-10 h-10 rounded-full ${color.class} flex items-center justify-center border-2 ${selectedColor === color.name ? 'border-black' : 'border-transparent'
                                            }`}
                                    >
                                        {selectedColor === color.name && (
                                            <Check className="w-5 h-5 text-white" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="h-px bg-gray-200 mb-6"></div>

                        {/* Size Selection */}
                        <div className="mb-6">
                            <h3 className="text-sm font-medium text-gray-600 mb-3">Choose Size</h3>
                            <div className="flex gap-3 flex-wrap">
                                {sizes.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`px-6 py-3 rounded-full font-medium transition-all ${selectedSize === size
                                            ? 'bg-black text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="h-px bg-gray-200 mb-6"></div>

                        {/* Quantity and Add to Cart */}
                        <div className="flex gap-4">
                            <div className="flex items-center bg-gray-100 rounded-full px-5">
                                <button
                                    onClick={() => handleQuantityChange('decrement')}
                                    className="p-3 hover:opacity-70 transition-opacity"
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-12 text-center font-medium">{quantity}</span>
                                <button
                                    onClick={() => handleQuantityChange('increment')}
                                    className="p-3 hover:opacity-70 transition-opacity"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                            <button className="flex-1 bg-black text-white py-4 rounded-full font-medium hover:bg-gray-800 transition-colors">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;