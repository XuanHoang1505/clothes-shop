import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Minus, Plus } from "lucide-react";
import ProductService from "@/services/site/ProductService";

function ProductDetail({ productSlug: propSlug }) {
    const { slug: routeSlug } = useParams();
    const productSlug = propSlug || routeSlug;

    const [product, setProduct] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedVariant, setSelectedVariant] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await ProductService.getProductBySlug(productSlug);
                setProduct(res.data || res);
            } catch (error) {
                console.error("Lỗi khi lấy chi tiết sản phẩm:", error);
            }
        };
        if (productSlug) fetchProduct();
    }, [productSlug]);

    useEffect(() => {
        if (product) {
            setSelectedColor(product.available_colors?.[0]?.name || null);
            setSelectedSize(product.available_sizes?.[0] || null);
            setSelectedVariant(product.variants?.[0] || null);
        }
    }, [product]);

    useEffect(() => {
        if (!product) return;
        const variant = product.variants?.find(
            (v) => v.color === selectedColor && v.size === selectedSize
        );
        setSelectedVariant(variant);
    }, [selectedColor, selectedSize, product]);

    const handleQuantityChange = (type) => {
        const maxStock = selectedVariant?.stock || product?.stock || 1;
        if (type === "increment" && quantity < maxStock) {
            setQuantity((prev) => prev + 1);
        } else if (type === "decrement" && quantity > 1) {
            setQuantity((prev) => prev - 1);
        }
    };

    const handleAddToCart = () => {
        alert(`Đã thêm ${quantity} sản phẩm "${product.name}" vào giỏ hàng!`);
    };

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-500 text-lg">
                Đang tải sản phẩm...
            </div>
        );
    }

    const images = product.images?.map((img) => img.url) || [];
    const currentStock = selectedVariant?.stock || product.stock;

    return (
        <div className="min-h-screen bg-white">
            {/* Breadcrumb */}
            <div className="border-b">
                <div className="max-w-7xl mx-auto px-4 py-3 text-sm text-gray-500 flex flex-wrap gap-1">
                    <span className="hover:text-gray-900 cursor-pointer">Home</span>
                    <span>/</span>
                    <span className="hover:text-gray-900 cursor-pointer">Shop</span>
                    <span>/</span>
                    <span className="hover:text-gray-900 cursor-pointer">Men</span>
                    <span>/</span>
                    <span className="text-gray-900">{product.category?.name || 'T-shirts'}</span>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Left - Images */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        {/* Thumbnails */}
                        <div className="flex sm:flex-col gap-3.5 order-2 sm:order-1">
                            {images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedImage(idx)}
                                    className={`flex-shrink-0 w-28 h-28 rounded-2xl overflow-hidden border transition-all ${selectedImage === idx
                                        ? "border-gray-900"
                                        : "border-gray-200 hover:border-gray-300"
                                        }`}
                                >
                                    <img
                                        src={img}
                                        alt={`Thumbnail ${idx + 1}`}
                                        className="object-cover w-full h-full"
                                    />
                                </button>
                            ))}
                        </div>

                        {/* Main image */}
                        <div className="flex-1 bg-gray-100 rounded-2xl overflow-hidden order-1 sm:order-2">
                            <div className="relative aspect-square">
                                <img
                                    src={images[selectedImage]}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                                {product.on_sale && (
                                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3.5 py-1.5 rounded-full font-semibold text-xs">
                                        -{product.discount_percentage}%
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right - Product Info */}
                    <div className="flex flex-col">
                        <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-gray-900">
                            {product.name}
                        </h1>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-4">
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, idx) => (
                                    <svg
                                        key={idx}
                                        className={`w-5 h-5 ${idx < Math.floor(product.stats?.rating_average || 4)
                                            ? "text-yellow-400 fill-yellow-400"
                                            : "text-gray-300 fill-gray-300"
                                            }`}
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                                <span className="ml-1 text-sm font-medium text-gray-900">
                                    {product.stats?.rating_average?.toFixed(1) || '4.5'}/5
                                </span>
                            </div>
                        </div>

                        {/* Price */}
                        <div className="mb-5">
                            <div className="flex items-center gap-3 flex-wrap">
                                <span className="text-3xl font-bold text-gray-900">
                                    {product.formatted_price}
                                </span>
                                {product.formatted_compare_price && (
                                    <>
                                        <span className="text-2xl text-gray-400 line-through font-medium">
                                            {product.formatted_compare_price}
                                        </span>
                                        {product.on_sale && (
                                            <span className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                                                -{product.discount_percentage}%
                                            </span>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>

                        <p className="text-gray-600 mb-6 leading-relaxed">
                            {product.description}
                        </p>

                        {/* Color Selection */}
                        {product.available_colors?.length > 0 && (
                            <div className="mb-6">
                                <h3 className="text-base text-gray-600 mb-3">
                                    Select Colors
                                </h3>
                                <div className="flex gap-2">
                                    {product.available_colors.map((color) => (
                                        <button
                                            key={color.name}
                                            onClick={() => setSelectedColor(color.name)}
                                            style={{ backgroundColor: color.hex || '#6B7280' }}
                                            className={`w-10 h-10 rounded-full transition-all ${selectedColor === color.name
                                                ? "ring-2 ring-offset-2 ring-gray-900"
                                                : "ring-1 ring-gray-300 hover:ring-gray-400"
                                                }`}
                                            title={color.name}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Size Selection */}
                        {product.available_sizes?.length > 0 && (
                            <div className="mb-6">
                                <h3 className="text-base text-gray-600 mb-3">
                                    Choose Size
                                </h3>
                                <div className="flex gap-3 flex-wrap">
                                    {product.available_sizes.map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${selectedSize === size
                                                ? "bg-gray-900 text-white"
                                                : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="h-px bg-gray-200 my-6" />

                        {/* Quantity and Add to Cart */}
                        <div className="flex items-center gap-4">
                            <div className="flex items-center bg-gray-100 rounded-full">
                                <button
                                    onClick={() => handleQuantityChange("decrement")}
                                    className="w-12 h-12 flex items-center justify-center hover:bg-gray-200 rounded-l-full transition-colors disabled:opacity-50"
                                    disabled={quantity <= 1}
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-12 text-center font-medium text-gray-900">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => handleQuantityChange("increment")}
                                    className="w-12 h-12 flex items-center justify-center hover:bg-gray-200 rounded-r-full transition-colors disabled:opacity-50"
                                    disabled={quantity >= currentStock}
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>

                            <button
                                onClick={handleAddToCart}
                                className="flex-1 bg-black text-white py-3.5 px-8 rounded-full font-medium hover:bg-gray-800 transition-colors"
                            >
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