

function WriteCommentOrder({ orderId: propId }) {

    {/* Reviews Tab */ }
    {
        selectedTab === 'reviews' && (
            <>
                {/* Button: Write Review */}
                <div className="max-w-4xl mx-auto mb-8 text-center">
                    <button
                        onClick={() => setShowReviewForm(!showReviewForm)}
                        className="px-8 py-3.5 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
                    >
                        {showReviewForm ? "Close review form" : "Write a review"}
                    </button>
                </div>

                {/* Write Review Form */}
                {showReviewForm && (
                    <div className="max-w-4xl mx-auto mb-12">
                        <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-900 mb-1 text-center">Write your review</h2>
                            <p className="text-gray-500 text-center mb-8">Share your experience about this product</p>

                            <form onSubmit={handleSubmitReview} className="space-y-6">
                                {/* Name + Rating */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* Name */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Your name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={reviewName}
                                            onChange={(e) => setReviewName(e.target.value)}
                                            placeholder="Enter your name"
                                            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:border-black focus:ring-2 focus:ring-gray-200 transition-all"
                                        />
                                    </div>

                                    {/* Rating */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Your rating <span className="text-red-500">*</span>
                                        </label>

                                        <div className="bg-gray-50 rounded-xl py-3 px-4 border border-gray-300">
                                            <div className="flex items-center space-x-2">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <button
                                                        key={star}
                                                        type="button"
                                                        onClick={() => setRating(star)}
                                                        onMouseEnter={() => setHoverRating(star)}
                                                        onMouseLeave={() => setHoverRating(0)}
                                                        className="focus:outline-none transition-transform hover:scale-125"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 24 24"
                                                            fill={(hoverRating || rating) >= star ? '#FACC15' : '#D1D5DB'}
                                                            className="w-8 h-8"
                                                        >
                                                            <path d="M12 .587l3.668 7.568L24 9.748l-6 5.84 1.417 8.251L12 19.771l-7.417 4.068L6 15.588 0 9.748l8.332-1.593z" />
                                                        </svg>
                                                    </button>
                                                ))}
                                            </div>

                                            {rating > 0 && (
                                                <p className={`mt-2 text-sm font-medium flex items-center gap-1 ${getRatingEmoji(rating).color}`}>
                                                    <span>{getRatingEmoji(rating).emoji}</span>
                                                    {getRatingEmoji(rating).text}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Review Content */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Review content <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        rows="5"
                                        required
                                        value={reviewContent}
                                        onChange={(e) => setReviewContent(e.target.value)}
                                        className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:border-black focus:ring-2 focus:ring-gray-200 resize-none"
                                        placeholder="Share your thoughts about this product (minimum 20 characters)..."
                                    ></textarea>

                                    <div className="flex justify-between items-center mt-2">
                                        <p className="text-xs text-gray-500">{reviewContent.length}/20 characters</p>
                                        {reviewContent.length >= 20 && (
                                            <span className="text-xs text-green-600 font-semibold flex items-center gap-1">
                                                <Check className="w-4 h-4" />
                                                Enough characters
                                            </span>
                                        )}
                                    </div>

                                    {/* Upload Images */}
                                    <div className="mt-3">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Upload images (optional)
                                        </label>

                                        <input
                                            id="reviewImagesInput"
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            name="images[]"
                                            onChange={handleImageUpload}
                                            className="hidden"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => document.getElementById('reviewImagesInput').click()}
                                            className="px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors shadow"
                                        >
                                            Upload images
                                        </button>

                                        {/* Image Previews */}
                                        {reviewImages.length > 0 && (
                                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-4">
                                                {reviewImages.map((img, index) => (
                                                    <div key={index} className="relative group aspect-square">
                                                        <img
                                                            src={img.url}
                                                            alt={`Preview ${index + 1}`}
                                                            className="w-full h-full object-cover rounded-xl border-2 border-gray-300"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                URL.revokeObjectURL(img.url);
                                                                setReviewImages((prev) => prev.filter((_, i) => i !== index));
                                                            }}
                                                            className="absolute -top-2 -right-2 bg-black text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shadow-lg hover:bg-red-600 transition-all"
                                                        >
                                                            ✕
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    className="w-full py-3.5 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
                                >
                                    Submit Review
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {/* Reviews List Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">
                        Reviews ({reviews.length})
                    </h2>
                </div>


                {/* Reviews List */}
                <div className="space-y-4 max-w-4xl mx-auto mb-12">
                    {reviewsLoading ? (
                        <div className="flex justify-center items-center py-8">
                            <div className="text-center">
                                <div className="relative w-12 h-12 mx-auto mb-3">
                                    <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
                                    <div className="absolute inset-0 border-4 border-transparent border-t-black rounded-full animate-spin"></div>
                                </div>
                                <p className="text-gray-700 font-semibold text-sm">Loading reviews...</p>
                            </div>
                        </div>
                    ) : reviews.length === 0 ? (
                        <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-10 text-center border border-gray-200 shadow-sm">
                            <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No reviews yet</h3>
                            <p className="text-gray-600 max-w-md mx-auto">Be the first to share your thoughts!</p>
                        </div>
                    ) : (
                        reviews.map((review) => (
                            <div key={review.id} className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md border border-gray-200 hover:border-gray-300 transition-all">
                                <div className="flex items-start justify-between gap-4 mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="relative flex-shrink-0">
                                            <div className="w-11 h-11 bg-black rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md">
                                                {review.name.charAt(0).toUpperCase()}
                                            </div>
                                            {review.verified && (
                                                <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                                                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900">{review.name}</p>
                                            <div className="flex items-center gap-2 mt-0.5">
                                                <div className="flex items-center">{renderStars(review.rating)}</div>
                                                <span className="text-gray-300">•</span>
                                                <p className="text-xs text-gray-500">{review.date}</p>
                                            </div>
                                        </div>
                                    </div>
                                    {review.verified && (
                                        <div className="flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-bold border border-green-200 whitespace-nowrap">
                                            <Check className="w-3.5 h-3.5" strokeWidth={3} />
                                            Verified
                                        </div>
                                    )}
                                </div>
                                <p className="text-gray-700 leading-relaxed text-sm mb-3">{review.comment}</p>
                                {review.images && review.images.length > 0 && (
                                    <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2">
                                        {review.images.map((img, index) => (
                                            <div key={index} className="relative aspect-square group overflow-hidden rounded-xl cursor-pointer">
                                                <img src={img} alt={`Review ${index + 1}`} className="w-full h-full object-cover border border-gray-200 group-hover:border-black transition-all group-hover:scale-110 rounded-xl" onClick={() => window.open(img, '_blank')} />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </>
        )
    }

}
export default WriteCommentOrder;