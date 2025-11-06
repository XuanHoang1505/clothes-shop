import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Minus, Plus } from "lucide-react";
import ProductService from "@/services/site/ProductService";
import { formatNumber } from "@/utils/Formatter";

function ProductDetail({ productSlug: propSlug }) {
    const { slug: routeSlug } = useParams();
    const productSlug = propSlug || routeSlug;

    const [product, setProduct] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedVariant, setSelectedVariant] = useState(null);

    // Helper function to convert MongoDB BSON to plain object
    const convertBSONToPlain = (obj) => {
        if (obj === null || obj === undefined) return obj;

        // Handle arrays
        if (Array.isArray(obj)) {
            return obj.map(item => convertBSONToPlain(item));
        }

        // Handle objects
        if (typeof obj === 'object') {
            // Check if it's a MongoDB ObjectId
            if (obj.$oid) return obj.$oid;

            // Check if it's a Date
            if (obj.$date) return new Date(obj.$date);

            // Recursively convert nested objects
            const plain = {};
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    plain[key] = convertBSONToPlain(obj[key]);
                }
            }
            return plain;
        }

        return obj;
    };

    // Parse product data and ensure all fields are properly formatted
    const parseProductData = (rawData) => {
        if (!rawData) return null;

        // First convert BSON to plain object
        const data = convertBSONToPlain(rawData);

        console.log("Converted data:", data);

        // Extract and format all fields
        return {
            _id: data._id || '',
            name: data.name || 'Product Name',
            slug: data.slug || '',
            description: data.description || 'No description available',
            price: data.price || 0,
            compare_price: data.compare_price || null,
            formatted_price: data.formatted_price || `$${data.price || 0}`,
            formatted_compare_price: data.formatted_compare_price || null,
            on_sale: data.on_sale || false,
            discount_percentage: data.discount_percentage || 0,
            stock: data.stock || 0,

            // Category
            category: data.category ? {
                _id: data.category._id || '',
                name: data.category.name || 'Category',
                slug: data.category.slug || ''
            } : null,

            // Images - handle both string URLs and objects with url property
            images: Array.isArray(data.images)
                ? data.images.map(img => {
                    if (typeof img === 'string') return img;
                    if (img && typeof img === 'object') return img.url || img.image_url || '';
                    return '';
                }).filter(url => url)
                : [],

            // Colors - handle various formats
            available_colors: Array.isArray(data.available_colors)
                ? data.available_colors.map(color => {
                    if (typeof color === 'string') return { name: color, hex: null };
                    return {
                        name: color.name || color.color || 'Color',
                        hex: color.hex || color.code || null
                    };
                })
                : [],

            // Sizes
            available_sizes: Array.isArray(data.available_sizes)
                ? data.available_sizes.map(size => typeof size === 'string' ? size : size.name || size.size || '')
                : [],

            // Variants
            variants: Array.isArray(data.variants)
                ? data.variants.map(v => ({
                    _id: v._id || '',
                    color: v.color || '',
                    size: v.size || '',
                    stock: v.stock || 0,
                    price: v.price || data.price || 0
                }))
                : [],

            // Stats
            stats: data.stats ? {
                rating_average: data.stats.rating_average || 4.5,
                review_count: data.stats.review_count || 0
            } : { rating_average: 4.5, review_count: 0 }
        };
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await ProductService.getProductBySlug(productSlug);
                const rawData = res.data || res;

                console.log("=== RAW DATA FROM API ===");
                console.log(rawData);
                console.log("=========================");

                const parsedProduct = parseProductData(rawData);

                console.log("=== PARSED PRODUCT ===");
                console.log(parsedProduct);
                console.log("======================");

                setProduct(parsedProduct);
            } catch (error) {
                console.error("Lỗi khi lấy chi tiết sản phẩm:", error);
            }
        };
        if (productSlug) fetchProduct();
    }, [productSlug]);

    useEffect(() => {
        if (product && product.available_colors && product.available_sizes) {
            setSelectedColor(product.available_colors[0]?.name || null);
            setSelectedSize(product.available_sizes[0] || null);
            setSelectedVariant(product.variants?.[0] || null);
        }
    }, [product]);

    useEffect(() => {
        if (!product || !product.variants) return;
        const variant = product.variants.find(
            (v) => v.color === selectedColor && v.size === selectedSize
        );
        setSelectedVariant(variant || null);
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

    const images = product.images || [];
    const currentStock = selectedVariant?.stock || product.stock || 0;
    const displayImages = images.length > 0 ? images : ['https://via.placeholder.com/600x600?text=No+Image'];

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
                        {displayImages.length > 1 && (
                            <div className="flex sm:flex-col gap-3.5 order-2 sm:order-1">
                                {displayImages.map((img, idx) => (
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
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = 'https://placehold.co/600x600?text=No+Image';
                                            }}
                                        />
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Main image */}
                        <div className="flex-1 bg-gray-100 rounded-2xl overflow-hidden order-1 sm:order-2">
                            <div className="relative aspect-square">
                                <img
                                    src={displayImages[selectedImage] || displayImages[0]}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = 'https://placehold.co/600x600?text=No+Image';
                                    }}
                                />
                                {product.on_sale && product.discount_percentage > 0 && (
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
                                    {formatNumber(product.price)}
                                </span>
                                {product.compare_price && (
                                    <>
                                        <span className="text-2xl text-gray-400 line-through font-medium">
                                            {formatNumber(product.compare_price)}
                                        </span>
                                        <span className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                                            -
                                            {Math.round(
                                                ((product.compare_price - product.price) /
                                                    product.compare_price) *
                                                100
                                            )}
                                            %
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>

                        <p className="text-gray-600 mb-6 leading-relaxed">
                            {product.description}
                        </p>

                        {/* Color Selection */}
                        {product.available_colors && product.available_colors.length > 0 && (
                            <div className="mb-6">
                                <h3 className="text-base text-gray-600 mb-3">
                                    Select Colors
                                </h3>
                                <div className="flex gap-2 flex-wrap">
                                    {product.available_colors.map((color, idx) => (
                                        <button
                                            key={`${color.name}-${idx}`}
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
                        {product.available_sizes && product.available_sizes.length > 0 && (
                            <div className="mb-6">
                                <h3 className="text-base text-gray-600 mb-3">
                                    Choose Size
                                </h3>
                                <div className="flex gap-3 flex-wrap">
                                    {product.available_sizes.map((size, idx) => (
                                        <button
                                            key={`${size}-${idx}`}
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
                                    disabled={quantity >= currentStock || currentStock === 0}
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>

                            <button
                                onClick={handleAddToCart}
                                disabled={currentStock === 0}
                                className="flex-1 bg-black text-white py-3.5 px-8 rounded-full font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                            >
                                {currentStock === 0 ? 'Out of Stock' : 'Add to Cart'}
                            </button>
                        </div>

                        {/* Stock info */}
                        {currentStock > 0 && (
                            <p className="text-sm text-gray-500 mt-4">
                                {currentStock} items available
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;