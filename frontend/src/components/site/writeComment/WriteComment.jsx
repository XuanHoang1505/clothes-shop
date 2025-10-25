import { useState } from 'react';
import { SlidersHorizontal, ChevronDown, MoreHorizontal, ChevronUp, Check, X } from 'lucide-react';

function WriteComment() {
    const [selectedTab, setSelectedTab] = useState('reviews');
    const [sortBy, setSortBy] = useState('Mới nhất');
    const [showSortDropdown, setShowSortDropdown] = useState(false);
    const [openFaqIndex, setOpenFaqIndex] = useState(null);
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [hoverRating, setHoverRating] = useState(0);
    const [rating, setRating] = useState(0);
    const [reviewName, setReviewName] = useState('');
    const [reviewContent, setReviewContent] = useState('');
    const [showSuccessToast, setShowSuccessToast] = useState(false);

    const reviews = [
        {
            id: 1,
            name: 'Samantha D.',
            verified: true,
            rating: 4.5,
            date: 'August 14, 2023',
            comment: '"I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It\'s become my favorite go-to shirt!"'
        },
        {
            id: 2,
            name: 'Alex M.',
            verified: true,
            rating: 4,
            date: 'August 15, 2023',
            comment: '"The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I\'m quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me."'
        },
        {
            id: 3,
            name: 'Ethan R.',
            verified: true,
            rating: 4,
            date: 'August 16, 2023',
            comment: '"This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer\'s touch in every aspect of this shirt!"'
        },
        {
            id: 4,
            name: 'Olivia P.',
            verified: true,
            rating: 4,
            date: 'August 17, 2023',
            comment: '"As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It\'s evident that the designer poured their creativity into making this t-shirt stand out."'
        },
        {
            id: 5,
            name: 'Liam K.',
            verified: true,
            rating: 4,
            date: 'August 18, 2023',
            comment: '"This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer\'s skill. It\'s like wearing a piece of art that reflects my passion for both design and fashion."'
        },
        {
            id: 6,
            name: 'Ava H.',
            verified: true,
            rating: 4.5,
            date: 'August 19, 2023',
            comment: '"I\'m not just wearing a t-shirt; I\'m wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter."'
        }
    ];

    const faqs = [
        {
            id: 1,
            question: 'What materials is this t-shirt made from?',
            answer: 'This t-shirt is crafted from 100% premium cotton, ensuring maximum comfort and breathability. The fabric is pre-shrunk and maintains its shape and softness even after multiple washes.'
        },
        {
            id: 2,
            question: 'How should I care for this t-shirt?',
            answer: 'For best results, machine wash cold with similar colors. Tumble dry on low heat or hang dry. Avoid using bleach or harsh detergents. Iron on low heat if needed, avoiding direct contact with the printed design.'
        },
        {
            id: 3,
            question: 'What is your return policy?',
            answer: 'We offer a 30-day return policy for all unworn items with original tags attached. If you\'re not completely satisfied with your purchase, you can return it for a full refund or exchange. Return shipping costs are covered for defective items.'
        },
        {
            id: 4,
            question: 'How does the sizing run?',
            answer: 'Our t-shirts run true to size. We recommend ordering your regular size for a comfortable fit. If you prefer a looser fit, consider sizing up. Check our detailed size chart for specific measurements.'
        },
        {
            id: 5,
            question: 'How long does shipping take?',
            answer: 'Standard shipping typically takes 5-7 business days. Express shipping (2-3 business days) is also available at checkout. International orders may take 10-15 business days depending on your location.'
        },
        {
            id: 6,
            question: 'Is the design print durable?',
            answer: 'Yes! We use high-quality screen printing techniques that ensure the design remains vibrant and intact even after many washes. The print is tested for durability and colorfastness.'
        }
    ];

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <svg key={`full-${i}`} className="w-5 h-5 fill-yellow-400" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
            );
        }

        if (hasHalfStar) {
            stars.push(
                <svg key="half" className="w-5 h-5" viewBox="0 0 20 20">
                    <defs>
                        <linearGradient id={`half-gradient-${rating}`}>
                            <stop offset="50%" stopColor="#FACC15" />
                            <stop offset="50%" stopColor="#E5E7EB" />
                        </linearGradient>
                    </defs>
                    <path fill={`url(#half-gradient-${rating})`} d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
            );
        }

        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars.push(
                <svg key={`empty-${i}`} className="w-5 h-5 fill-gray-300" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
            );
        }

        return stars;
    };

    const toggleFaq = (index) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    const handleSubmitReview = (e) => {
        e.preventDefault();
        if (reviewContent.length < 20) {
            alert('Vui lòng nhập ít nhất 20 ký tự');
            return;
        }
        if (rating === 0) {
            alert('Vui lòng chọn số sao đánh giá');
            return;
        }

        setShowReviewModal(false);
        setShowSuccessToast(true);

        // Reset form
        setReviewName('');
        setReviewContent('');
        setRating(0);
        setHoverRating(0);

        // Hide toast after 3 seconds
        setTimeout(() => setShowSuccessToast(false), 3000);
    };

    const getRatingEmoji = (stars) => {
        if (stars === 5) return { emoji: '⭐', text: 'Tuyệt vời!', color: 'text-yellow-600' };
        if (stars === 4) return { emoji: '😊', text: 'Rất tốt!', color: 'text-green-600' };
        if (stars === 3) return { emoji: '👍', text: 'Ổn!', color: 'text-blue-600' };
        if (stars === 2) return { emoji: '😐', text: 'Được!', color: 'text-orange-600' };
        return { emoji: '😞', text: 'Cần cải thiện', color: 'text-red-600' };
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Success Toast */}
            {showSuccessToast && (
                <div className="fixed top-4 right-4 z-50 animate-slideInRight">
                    <div className="bg-green-500 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3">
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                            <Check className="w-5 h-5 text-green-500" />
                        </div>
                        <div>
                            <p className="font-semibold">Thành công!</p>
                            <p className="text-sm">Cảm ơn bạn đã gửi đánh giá</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Tabs */}
            <div className="flex items-center justify-center border-b-2 border-gray-200 mb-8">
                <button
                    onClick={() => setSelectedTab('details')}
                    className={`px-8 py-4 font-semibold transition-all relative ${selectedTab === 'details'
                        ? 'text-gray-900'
                        : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    Product Details
                    {selectedTab === 'details' && (
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-900 to-gray-600 rounded-t-lg"></div>
                    )}
                </button>
                <button
                    onClick={() => setSelectedTab('reviews')}
                    className={`px-8 py-4 font-semibold transition-all relative ${selectedTab === 'reviews'
                        ? 'text-gray-900'
                        : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    Rating & Reviews
                    {selectedTab === 'reviews' && (
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-900 to-gray-600 rounded-t-lg"></div>
                    )}
                </button>
                <button
                    onClick={() => setSelectedTab('faqs')}
                    className={`px-8 py-4 font-semibold transition-all relative ${selectedTab === 'faqs'
                        ? 'text-gray-900'
                        : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    FAQs
                    {selectedTab === 'faqs' && (
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-900 to-gray-600 rounded-t-lg"></div>
                    )}
                </button>
            </div>

            {/* Product Details Tab */}
            {selectedTab === 'details' && (
                <div className="max-w-5xl mx-auto">
                    <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 shadow-sm border border-gray-100">
                        <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                            Product Information
                        </h2>

                        <div className="space-y-8">
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <span className="w-1 h-6 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full"></span>
                                    Description
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    The ONE LIFE Graphic T-Shirt is more than just a piece of clothing—it's a statement.
                                    Designed for those who appreciate quality and style, this t-shirt features a unique
                                    graphic print that captures the essence of modern design philosophy. Perfect for casual
                                    outings, creative workspaces, or everyday wear.
                                </p>
                            </div>

                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <span className="w-1 h-6 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full"></span>
                                    Key Features
                                </h3>
                                <ul className="space-y-3">
                                    {[
                                        'Premium 100% cotton fabric for ultimate comfort',
                                        'High-quality screen printing with vibrant, long-lasting colors',
                                        'Pre-shrunk fabric to maintain size and shape',
                                        'Reinforced double-stitching on sleeves and bottom hem',
                                        'Tagless label for maximum comfort'
                                    ].map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-gray-600">
                                            <div className="w-5 h-5 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <Check className="w-3 h-3 text-white" strokeWidth={3} />
                                            </div>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <span className="w-1 h-6 bg-gradient-to-b from-pink-400 to-red-500 rounded-full"></span>
                                    Specifications
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {[
                                        { label: 'Material', value: '100% Cotton' },
                                        { label: 'Fit', value: 'Regular Fit' },
                                        { label: 'Neckline', value: 'Crew Neck' },
                                        { label: 'Sleeve Type', value: 'Short Sleeve' },
                                        { label: 'Pattern', value: 'Graphic Print' },
                                        { label: 'Care', value: 'Machine Washable' }
                                    ].map((spec, idx) => (
                                        <div key={idx} className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-100 rounded-xl p-4 hover:border-gray-300 transition-all">
                                            <p className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">{spec.label}</p>
                                            <p className="font-bold text-gray-900">{spec.value}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <span className="w-1 h-6 bg-gradient-to-b from-indigo-400 to-blue-500 rounded-full"></span>
                                    Size Guide
                                </h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="bg-gradient-to-r from-gray-900 to-gray-700 text-white">
                                                <th className="px-6 py-4 text-left font-bold rounded-tl-xl">Size</th>
                                                <th className="px-6 py-4 text-left font-bold">Chest (inches)</th>
                                                <th className="px-6 py-4 text-left font-bold">Length (inches)</th>
                                                <th className="px-6 py-4 text-left font-bold rounded-tr-xl">Shoulder (inches)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {[
                                                { size: 'Small', chest: '36-38', length: '27', shoulder: '17' },
                                                { size: 'Medium', chest: '38-40', length: '28', shoulder: '18' },
                                                { size: 'Large', chest: '40-42', length: '29', shoulder: '19' },
                                                { size: 'X-Large', chest: '42-44', length: '30', shoulder: '20' }
                                            ].map((row, idx) => (
                                                <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                                    <td className="px-6 py-4 font-semibold text-gray-900">{row.size}</td>
                                                    <td className="px-6 py-4 text-gray-600">{row.chest}</td>
                                                    <td className="px-6 py-4 text-gray-600">{row.length}</td>
                                                    <td className="px-6 py-4 text-gray-600">{row.shoulder}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Reviews Tab */}
            {selectedTab === 'reviews' && (
                <>
                    {/* Reviews Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                        <h2 className="text-3xl font-bold">
                            All Reviews <span className="text-gray-500 font-normal text-xl">(451)</span>
                        </h2>

                        <div className="flex items-center gap-3 flex-wrap">
                            <button className="p-3 rounded-xl bg-gradient-to-br from-gray-100 to-gray-50 hover:from-gray-200 hover:to-gray-100 transition-all shadow-sm">
                                <SlidersHorizontal className="w-5 h-5" />
                            </button>

                            <div className="relative">
                                <button
                                    onClick={() => setShowSortDropdown(!showSortDropdown)}
                                    className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-br from-gray-100 to-gray-50 hover:from-gray-200 hover:to-gray-100 transition-all shadow-sm"
                                >
                                    <span className="font-semibold">{sortBy}</span>
                                    <ChevronDown className={`w-4 h-4 transition-transform ${showSortDropdown ? 'rotate-180' : ''}`} />
                                </button>

                                {showSortDropdown && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-gray-200 py-2 z-10">
                                        {['Mới nhất', 'Cũ nhất', 'Từ cao đến thấp', 'Từ thấp đến cao'].map((option) => (
                                            <button
                                                key={option}
                                                onClick={() => {
                                                    setSortBy(option);
                                                    setShowSortDropdown(false);
                                                }}
                                                className={`w-full px-4 py-3 text-left transition-all ${sortBy === option
                                                    ? 'bg-gray-900 text-white font-semibold'
                                                    : 'hover:bg-gray-50'
                                                    }`}
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={() => setShowReviewModal(true)}
                                className="px-6 py-3 bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-xl font-semibold hover:from-gray-800 hover:to-gray-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                            >
                                Write a Review
                            </button>
                        </div>
                    </div>

                    {/* Reviews Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-4 sm:gap-6 mb-8">
                        {reviews.map((review) => (
                            <div
                                key={review.id}
                                className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 hover:border-gray-300 hover:shadow-md transition-all duration-300"
                            >
                                {/* Stars */}
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex gap-1 flex-wrap">{renderStars(review.rating)}</div>
                                    <button className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded-lg transition-all">
                                        <MoreHorizontal className="w-4 h-4 sm:w-5 sm:h-5" />
                                    </button>
                                </div>

                                {/* Name */}
                                <div className="flex items-center gap-2 mb-3">
                                    <h3 className="font-bold text-base sm:text-lg">{review.name}</h3>
                                    {review.verified && (
                                        <div className="bg-green-500 rounded-full p-0.5">
                                            <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" strokeWidth={3} />
                                        </div>
                                    )}
                                </div>

                                <p className="text-gray-600 text-sm sm:text-base mb-3 leading-relaxed break-words">
                                    {review.comment}
                                </p>

                                <p className="text-gray-400 text-xs sm:text-sm font-medium">
                                    {review.date}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Load More Button */}
                    <div className="flex justify-center">
                        <button className="px-6 sm:px-10 py-3 sm:py-4 border border-gray-300 rounded-xl text-sm sm:text-base font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all">
                            Load More Reviews
                        </button>
                    </div>

                    {/* Review Modal */}
                    {showReviewModal && (
                        <div
                            className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50 p-3 sm:p-4"
                            onClick={() => setShowReviewModal(false)}
                        >
                            <div
                                className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 w-full max-w-sm sm:max-w-md md:max-w-lg relative overflow-y-auto max-h-[90vh]"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Gradient Bar */}
                                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 rounded-t-2xl sm:rounded-t-3xl"></div>

                                {/* Close */}
                                <button
                                    onClick={() => setShowReviewModal(false)}
                                    className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 sm:w-10 h-8 sm:h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-red-500 text-gray-600 hover:text-white transition-all group"
                                >
                                    <X className="w-4 sm:w-5 h-4 sm:h-5 transform group-hover:rotate-90 transition-transform duration-300" />
                                </button>

                                {/* Header */}
                                <div className="text-center mb-6 sm:mb-8 mt-4">
                                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-yellow-400 via-orange-400 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-md animate-pulse">
                                        <svg className="w-8 sm:w-10 h-8 sm:h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    </div>
                                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">Viết đánh giá</h2>
                                    <p className="text-gray-500 text-sm sm:text-base">Chia sẻ trải nghiệm của bạn</p>
                                </div>

                                {/* Form */}
                                <form onSubmit={handleSubmitReview} className="space-y-4 sm:space-y-6">
                                    {/* Name */}
                                    <div>
                                        <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-2">
                                            Tên của bạn <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={reviewName}
                                            onChange={(e) => setReviewName(e.target.value)}
                                            placeholder="Nhập tên của bạn"
                                            className="w-full border border-gray-200 rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-sm focus:border-black focus:ring-4 focus:ring-gray-100 focus:outline-none transition-all"
                                        />
                                    </div>

                                    {/* Rating */}
                                    <div>
                                        <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-3">
                                            Đánh giá của bạn <span className="text-red-500">*</span>
                                        </label>
                                        <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl py-4 sm:py-6 px-2 sm:px-4 border border-gray-200">
                                            <div className="flex items-center justify-center space-x-2 sm:space-x-3 flex-wrap">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <button
                                                        key={star}
                                                        type="button"
                                                        onClick={() => setRating(star)}
                                                        onMouseEnter={() => setHoverRating(star)}
                                                        onMouseLeave={() => setHoverRating(0)}
                                                        className="focus:outline-none transform hover:scale-110 sm:hover:scale-125 transition-transform duration-200"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 24 24"
                                                            fill={(hoverRating || rating) >= star ? '#FACC15' : '#E5E7EB'}
                                                            className="w-8 sm:w-10 h-8 sm:h-10 transition-all duration-200 drop-shadow-lg"
                                                        >
                                                            <path d="M12 .587l3.668 7.568L24 9.748l-6 5.84 1.417 8.251L12 19.771l-7.417 4.068L6 15.588 0 9.748l8.332-1.593z" />
                                                        </svg>
                                                    </button>
                                                ))}
                                            </div>

                                            <div className="text-center mt-3 sm:mt-4">
                                                {rating ? (
                                                    <div className="inline-flex items-center gap-2 bg-white px-3 sm:px-4 py-2 rounded-full shadow border border-gray-200">
                                                        <span className="text-xl sm:text-2xl">{getRatingEmoji(rating).emoji}</span>
                                                        <span className={`font-bold text-sm sm:text-base ${getRatingEmoji(rating).color}`}>
                                                            {getRatingEmoji(rating).text}
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <span className="text-gray-400 text-sm font-medium">Nhấp để chọn sao</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Comment */}
                                    <div>
                                        <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-2">
                                            Nội dung đánh giá <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            rows="4"
                                            required
                                            value={reviewContent}
                                            onChange={(e) => setReviewContent(e.target.value)}
                                            className="w-full border border-gray-200 rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-sm focus:border-black focus:ring-4 focus:ring-gray-100 focus:outline-none transition-all resize-none"
                                            placeholder="Chia sẻ cảm nhận của bạn..."
                                        ></textarea>
                                    </div>

                                    {/* Submit */}
                                    <button
                                        type="submit"
                                        className="w-full py-3 sm:py-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-white rounded-xl font-bold text-sm sm:text-base hover:from-gray-800 hover:to-gray-600 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                        Gửi đánh giá
                                    </button>
                                </form>
                            </div>
                        </div>

                    )}
                </>
            )}

            {/* FAQs Tab */}
            {selectedTab === 'faqs' && (
                <div className="max-w-4xl mx-auto">
                    <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 shadow-sm border border-gray-100">
                        <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                            Frequently Asked Questions
                        </h2>

                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <div
                                    key={faq.id}
                                    className={`bg-white border-2 rounded-2xl overflow-hidden transition-all ${openFaqIndex === index
                                        ? 'border-gray-900 shadow-lg'
                                        : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    <button
                                        onClick={() => toggleFaq(index)}
                                        className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                                    >
                                        <h3 className="font-bold text-lg pr-8">{faq.question}</h3>
                                        <div className={`w-8 h-8 flex items-center justify-center rounded-full transition-all ${openFaqIndex === index
                                            ? 'bg-gray-900 text-white'
                                            : 'bg-gray-100 text-gray-500'
                                            }`}>
                                            {openFaqIndex === index ? (
                                                <ChevronUp className="w-5 h-5" />
                                            ) : (
                                                <ChevronDown className="w-5 h-5" />
                                            )}
                                        </div>
                                    </button>

                                    {openFaqIndex === index && (
                                        <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-100 pt-4 animate-fadeIn">
                                            {faq.answer}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl p-8 text-white shadow-xl">
                            <h3 className="font-bold text-xl mb-3">Still have questions?</h3>
                            <p className="text-gray-200 mb-6">
                                Can't find the answer you're looking for? Please contact our customer support team.
                            </p>
                            <button className="px-8 py-4 bg-white text-gray-900 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
                                Contact Support
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }
                
                .animate-slideInRight {
                    animation: slideInRight 0.3s ease-out;
                }
                
                .animate-fadeIn {
                    animation: fadeIn 0.2s ease-out;
                }
            `}</style>
        </div>
    );
}

export default WriteComment;