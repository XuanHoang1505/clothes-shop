import { useState, useEffect } from 'react';
import { Minus, Plus, ShoppingCart, Heart, Star, Truck, Shield, RefreshCw } from 'lucide-react';

function ProductDetail() {
    const mockProduct = {
        data: {
            id: 'P001',
            name: 'Áo Thun Basic Cotton Nam',
            brand: { name: 'CoolMate', logo: 'https://via.placeholder.com/100x40?text=CoolMate' },
            category: { parent: 'Thời trang nam', name: 'Áo thun' },
            price: 199000,
            formatted_price: '199.000đ',
            compare_price: 259000,
            formatted_compare_price: '259.000đ',
            stock: 15,
            in_stock: true,
            on_sale: true,
            discount_percentage: 20,
            is_new: true,
            is_bestseller: true,
            is_featured: false,
            description:
                'Áo thun cotton 100% thoáng mát, mềm mại, form dáng vừa vặn. Phù hợp cho mọi hoạt động hằng ngày.',
            material: '100% Cotton',
            weight: 250,
            care_instructions: 'Giặt ở 30°C, không tẩy, không sấy khô trực tiếp.',
            available_colors: [
                { name: 'Trắng', code: '#FFFFFF' },
                { name: 'Đen', code: '#000000' },
                { name: 'Xanh navy', code: '#001F3F' },
            ],
            available_sizes: ['S', 'M', 'L', 'XL'],
            images: [
                { url: 'https://via.placeholder.com/600x600?text=Ao+Thun+1', alt: 'Ảnh 1' },
                { url: 'https://via.placeholder.com/600x600?text=Ao+Thun+2', alt: 'Ảnh 2' },
                { url: 'https://via.placeholder.com/600x600?text=Ao+Thun+3', alt: 'Ảnh 3' },
            ],
            stats: { rating_average: 4.6, review_count: 123, sold_count: 250 },
            variants: [
                { color: 'Trắng', size: 'M', sku: 'ATWHTM', stock: 5 },
                { color: 'Đen', size: 'L', sku: 'ATBLKL', stock: 8 },
                { color: 'Xanh navy', size: 'XL', sku: 'ATNAVXL', stock: 2 },
            ],
            tags: ['Áo thun', 'Cotton', 'Thời trang nam'],
            sku: 'AT001',
        },
    };

    const [product, setProduct] = useState(mockProduct);
    const [selectedColor, setSelectedColor] = useState(mockProduct.data.available_colors[0].name);
    const [selectedSize, setSelectedSize] = useState(mockProduct.data.available_sizes[0]);
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedVariant, setSelectedVariant] = useState(mockProduct.data.variants[0]);

    useEffect(() => {
        const variant = mockProduct.data.variants.find(
            v => v.color === selectedColor && v.size === selectedSize
        );
        setSelectedVariant(variant);
    }, [selectedColor, selectedSize]);

    const handleQuantityChange = (type) => {
        const maxStock = selectedVariant?.stock || product.data.stock;
        if (type === 'increment' && quantity < maxStock) setQuantity(prev => prev + 1);
        else if (type === 'decrement' && quantity > 1) setQuantity(prev => prev - 1);
    };

    const handleAddToCart = () => {
        alert(`Đã thêm ${quantity} sản phẩm "${product.data.name}" vào giỏ hàng!`);
    };

    const { data } = product;
    const images = data.images.map(img => img.url);
    const currentStock = selectedVariant?.stock || data.stock;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Breadcrumb */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 py-3 text-sm text-gray-600 flex flex-wrap gap-1">
                    <span>Trang chủ</span>
                    <span>/</span>
                    <span>{data.category.parent}</span>
                    <span>/</span>
                    <span>{data.category.name}</span>
                    <span>/</span>
                    <span className="text-black font-medium">{data.name}</span>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Left - Images */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        {/* Thumbnails */}
                        <div className="flex sm:flex-col gap-3 sm:w-24 w-full justify-center sm:justify-start">
                            {images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedImage(idx)}
                                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${selectedImage === idx
                                        ? 'border-black shadow-md'
                                        : 'border-gray-200 hover:border-gray-400'
                                        }`}
                                >
                                    <img src={img} alt={`Ảnh ${idx + 1}`} className="object-cover w-full h-full" />
                                </button>
                            ))}
                        </div>

                        {/* Main image */}
                        <div className="flex-1 bg-white rounded-2xl overflow-hidden shadow-lg">
                            <div className="relative aspect-square">
                                <img
                                    src={images[selectedImage]}
                                    alt="Product Image"
                                    className="w-full h-full object-cover"
                                />
                                {data.on_sale && (
                                    <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1.5 rounded-full font-bold text-xs sm:text-sm">
                                        -{data.discount_percentage}%
                                    </div>
                                )}
                                {data.is_new && (
                                    <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1.5 rounded-full font-bold text-xs sm:text-sm">
                                        MỚI
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right - Product Info */}
                    <div className="flex flex-col">
                        <div className="flex items-center gap-3 mb-3 flex-wrap">
                            <img src={data.brand.logo} alt={data.brand.name} className="h-6 sm:h-8" />
                            {data.is_bestseller && (
                                <span className="bg-yellow-100 text-yellow-800 px-2 sm:px-3 py-1 rounded-full text-xs font-semibold">
                                    BÁN CHẠY
                                </span>
                            )}
                        </div>

                        <h1 className="text-2xl sm:text-4xl font-black mb-3">{data.name}</h1>

                        {/* Rating */}
                        <div className="flex items-center gap-2 sm:gap-4 mb-4 flex-wrap text-sm sm:text-base">
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, idx) => (
                                    <Star
                                        key={idx}
                                        className={`w-4 h-4 sm:w-5 sm:h-5 ${idx < Math.floor(data.stats.rating_average)
                                            ? 'fill-yellow-400 text-yellow-400'
                                            : 'text-gray-300'
                                            }`}
                                    />
                                ))}
                                <span className="ml-1 sm:ml-2">
                                    {data.stats.rating_average} sao ({data.stats.review_count} đánh giá)
                                </span>
                            </div>
                        </div>

                        {/* Price */}
                        <div className="bg-gray-50 p-4 sm:p-6 rounded-xl mb-5">
                            <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
                                <span className="text-2xl sm:text-4xl font-bold text-red-600">{data.formatted_price}</span>
                                <span className="text-lg sm:text-xl text-gray-400 line-through">{data.formatted_compare_price}</span>
                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-gray-700 mb-5 leading-relaxed text-sm sm:text-base">{data.description}</p>

                        {/* Color */}
                        <div className="mb-5">
                            <h3 className="text-sm font-semibold text-gray-700 mb-3">
                                Màu sắc: <span className="text-black">{selectedColor}</span>
                            </h3>
                            <div className="flex gap-2 flex-wrap">
                                {data.available_colors.map(color => (
                                    <button
                                        key={color.name}
                                        onClick={() => setSelectedColor(color.name)}
                                        className={`px-4 py-2 rounded-lg font-medium border-2 text-sm sm:text-base ${selectedColor === color.name
                                            ? 'bg-black text-white border-black'
                                            : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                                            }`}
                                    >
                                        {color.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Size */}
                        <div className="mb-5">
                            <h3 className="text-sm font-semibold text-gray-700 mb-3">
                                Kích thước: <span className="text-black">{selectedSize}</span>
                            </h3>
                            <div className="flex gap-2 flex-wrap">
                                {data.available_sizes.map(size => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`w-14 sm:w-16 h-14 sm:h-16 rounded-lg font-semibold border-2 text-sm sm:text-base ${selectedSize === size
                                            ? 'bg-black text-white border-black'
                                            : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Stock */}
                        <div className="mb-5">
                            <div
                                className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm sm:text-base ${currentStock > 10
                                    ? 'bg-green-100 text-green-800'
                                    : currentStock > 0
                                        ? 'bg-yellow-100 text-yellow-800'
                                        : 'bg-red-100 text-red-800'
                                    }`}
                            >
                                <div
                                    className={`w-2 h-2 rounded-full ${currentStock > 10
                                        ? 'bg-green-500'
                                        : currentStock > 0
                                            ? 'bg-yellow-500'
                                            : 'bg-red-500'
                                        }`}
                                ></div>
                                <span>
                                    {currentStock > 0
                                        ? `Còn ${currentStock} sản phẩm`
                                        : 'Hết hàng'}
                                </span>
                            </div>
                        </div>

                        {/* Quantity & Add to Cart */}
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
                            <div className="flex items-center justify-between bg-gray-100 rounded-full px-4 sm:px-6 border-2 border-gray-200 w-full sm:w-auto">
                                <button
                                    onClick={() => handleQuantityChange('decrement')}
                                    className="p-2 sm:p-3 hover:opacity-70"
                                    disabled={quantity <= 1}
                                >
                                    <Minus className="w-4 h-4 sm:w-5 sm:h-5" />
                                </button>
                                <span className="w-10 sm:w-16 text-center font-bold text-lg">{quantity}</span>
                                <button
                                    onClick={() => handleQuantityChange('increment')}
                                    className="p-2 sm:p-3 hover:opacity-70"
                                    disabled={quantity >= currentStock}
                                >
                                    <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                                </button>
                            </div>

                            <button
                                onClick={handleAddToCart}
                                className="flex-1 bg-black text-white py-3 sm:py-4 rounded-full font-bold hover:bg-gray-800 flex items-center justify-center gap-2 text-sm sm:text-base"
                            >
                                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                                Thêm vào giỏ hàng
                            </button>

                            <button className="p-3 sm:p-4 bg-gray-100 rounded-full hover:bg-gray-200">
                                <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
                            </button>
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-6 border-t">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-blue-100 rounded-lg">
                                    <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                                </div>
                                <div>
                                    <div className="font-semibold text-sm">Miễn phí vận chuyển</div>
                                    <div className="text-xs text-gray-600">Đơn từ 500k</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-green-100 rounded-lg">
                                    <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                                </div>
                                <div>
                                    <div className="font-semibold text-sm">Bảo hành chính hãng</div>
                                    <div className="text-xs text-gray-600">12 tháng</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-yellow-100 rounded-lg">
                                    <RefreshCw className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" />
                                </div>
                                <div>
                                    <div className="font-semibold text-sm">Đổi trả dễ dàng</div>
                                    <div className="text-xs text-gray-600">Trong 7 ngày</div>
                                </div>
                            </div>
                        </div>

                        {/* Tags */}
                        {data.tags && (
                            <div className="mt-5 pt-5 border-t">
                                <div className="flex flex-wrap gap-2">
                                    {data.tags.map((tag, idx) => (
                                        <span
                                            key={idx}
                                            className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs sm:text-sm"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
