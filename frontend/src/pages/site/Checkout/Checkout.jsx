import React, { useState, useEffect } from 'react';
import { X, MapPin, User, CreditCard, Lock, ArrowLeft } from 'lucide-react';

function Checkout() {
    const [cartItems, setCartItems] = useState([]);
    const [appliedDiscount, setAppliedDiscount] = useState(null);
    const [discount, setDiscount] = useState(0);

    // Customer Information
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    // Shipping Address
    const [houseNumber, setHouseNumber] = useState('');
    const [province, setProvince] = useState('');
    const [ward, setWard] = useState('');
    const [note, setNote] = useState('');

    // Payment Information
    const [paymentMethod, setPaymentMethod] = useState('cod'); // cod, card, bank
    const [cardNumber, setCardNumber] = useState('');
    const [cardName, setCardName] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');

    const [isProcessing, setIsProcessing] = useState(false);


    useEffect(() => {
        const saved = localStorage.getItem("shippingAddress");
        if (saved) {
            const address = JSON.parse(saved);
            setHouseNumber(address.houseNumber || "");
            setProvince(address.province || "");
            setWard(address.ward || "");
        }
    }, []);


    useEffect(() => {
        // Load cart from localStorage
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(cart);

        // Load discount if applied
        const savedDiscount = JSON.parse(localStorage.getItem('appliedDiscount'));
        if (savedDiscount) {
            setAppliedDiscount(savedDiscount);
            setDiscount(parseFloat(localStorage.getItem('discountAmount')) || 0);
        }

        // Load address from localStorage if saved
        const savedAddress = JSON.parse(localStorage.getItem('shippingAddress'));
        if (savedAddress) {
            setHouseNumber(savedAddress.houseNumber || '');
            setProvince(savedAddress.province || '');
            setWard(savedAddress.ward || '');
        }
    }, []);

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const deliveryFee = 15000;
    const total = subtotal - discount + deliveryFee;

    const formatNumber = (num) => {
        return new Intl.NumberFormat('vi-VN').format(num);
    };

    const isFormValid = () => {
        const basicInfoValid = fullName && email && phone && houseNumber && province && ward;

        if (paymentMethod === 'card') {
            return basicInfoValid && cardNumber && cardName && expiryDate && cvv;
        }

        return basicInfoValid;
    };

    const handlePlaceOrder = async () => {
        if (!isFormValid()) {
            alert('Vui lòng điền đầy đủ thông tin!');
            return;
        }

        setIsProcessing(true);

        // Simulate API call
        setTimeout(() => {
            const orderData = {
                customer: { fullName, email, phone },
                address: { houseNumber, province, ward, note },
                items: cartItems,
                payment: {
                    method: paymentMethod,
                    amount: total
                },
                discount: appliedDiscount,
                createdAt: new Date().toISOString()
            };

            console.log('Order placed:', orderData);

            // Clear cart
            localStorage.removeItem('cart');
            localStorage.removeItem('appliedDiscount');
            localStorage.removeItem('discountAmount');

            alert('Đặt hàng thành công! Cảm ơn bạn đã mua hàng.');
            setIsProcessing(false);

            // Redirect to success page or home
            window.location.href = '/';
        }, 2000);
    };

    const handleVNPayPayment = async (amount) => {
        if (!isFormValid()) {
            alert('Vui lòng điền đầy đủ thông tin trước khi thanh toán!');
            return;
        }

        setIsProcessing(true); // Thêm loading state

        try {
            // Chuẩn bị dữ liệu đơn hàng theo format controller yêu cầu
            const orderData = {
                customer_info: {
                    fullName: fullName,
                    email: email,
                    phone: phone
                },
                shipping_address: {
                    houseNumber: houseNumber,
                    province: province,
                    ward: ward,
                    note: note || ''
                },
                items: cartItems.map(item => ({
                    product_id: item.id || item._id || '', // ID sản phẩm
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                    size: item.size || null,
                    color: item.color || null,
                    image: item.image || null
                })),
                subtotal: subtotal,
                discount: discount,
                delivery_fee: deliveryFee,
                total_vnpay: total, // Sử dụng total thay vì amount
                note: note || ''
            };

            const response = await fetch('http://127.0.0.1:8000/api/vnpay_payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(orderData)
            });

            const data = await response.json();

            if (data.code === '00' && data.payment_url) {
                // Lưu order_code để tracking sau khi thanh toán
                localStorage.setItem('current_order_code', data.order_code);
                localStorage.setItem('current_order_id', data.order_id);

                // Redirect sang VNPAY
                window.location.href = data.payment_url;
            } else {
                alert(data.message || 'Có lỗi xảy ra. Vui lòng thử lại!');
                setIsProcessing(false);
            }
        } catch (error) {
            console.error('Lỗi thanh toán VNPAY:', error);
            alert('Có lỗi xảy ra khi kết nối server. Vui lòng thử lại!');
            setIsProcessing(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Top Banner */}
            <div className="bg-black text-white text-center py-2 px-4 text-sm relative">
                Sign up and get 20% off to your first order. <span className="underline font-medium cursor-pointer">Sign Up Now</span>
                <button className="absolute right-4 top-1/2 -translate-y-1/2">
                    <X size={16} />
                </button>
            </div>

            {/* Header */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">SHOP.CO</h1>
                </div>
            </div>

            {/* Breadcrumb */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 py-4 text-sm text-gray-600">
                    <span>Home</span> <span className="mx-2">›</span>
                    <span>Cart</span> <span className="mx-2">›</span>
                    <span className="text-black">Checkout</span>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex items-center gap-3 mb-8">
                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center gap-2 text-gray-600 hover:text-black"
                    >
                        <ArrowLeft size={20} />
                        <span>Back to Cart</span>
                    </button>
                </div>

                <h2 className="text-3xl font-bold mb-8">CHECKOUT</h2>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column - Forms */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Customer Information */}
                        <div className="bg-white border rounded-lg p-6">
                            <div className="flex items-center gap-2 mb-6">
                                <User size={20} className="text-gray-700" />
                                <h3 className="text-xl font-bold">Thông Tin Khách Hàng</h3>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Họ và tên <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        placeholder="Nguyễn Văn A"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="example@email.com"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Số điện thoại <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            placeholder="0123456789"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Shipping Address */}
                        <div className="bg-white border rounded-lg p-6">
                            <div className="flex items-center gap-2 mb-6">
                                <MapPin size={20} className="text-gray-700" />
                                <h3 className="text-xl font-bold">Địa Chỉ Giao Hàng</h3>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Số nhà, tên đường <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={houseNumber}
                                        readOnly
                                        placeholder="123 Nguyễn Trãi"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Tỉnh/Thành phố <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={province}
                                            readOnly
                                            placeholder="Hà Nội"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Quận/Huyện <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={ward}
                                            readOnly
                                            placeholder="Đống Đa"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Ghi chú (không bắt buộc)
                                    </label>
                                    <textarea
                                        value={note}
                                        onChange={(e) => setNote(e.target.value)}
                                        placeholder="Ghi chú thêm về địa chỉ, thời gian giao hàng..."
                                        rows="3"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="bg-white border rounded-lg p-6">
                            <div className="flex items-center gap-2 mb-6">
                                <CreditCard size={20} className="text-gray-700" />
                                <h3 className="text-xl font-bold">Phương Thức Thanh Toán</h3>
                            </div>

                            <div className="space-y-4">
                                {/* COD Option */}
                                <label className="flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="cod"
                                        checked={paymentMethod === 'cod'}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        className="mt-1"
                                    />
                                    <div className="flex-1">
                                        <div className="font-semibold">Thanh toán khi nhận hàng (COD)</div>
                                        <p className="text-sm text-gray-600 mt-1">
                                            Thanh toán bằng tiền mặt khi nhận hàng
                                        </p>
                                    </div>
                                </label>

                                {/* Card Option */}
                                <label className="flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="card"
                                        checked={paymentMethod === 'card'}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        className="mt-1"
                                    />
                                    <div className="flex-1">
                                        <div className="font-semibold">Thẻ tín dụng/Ghi nợ</div>
                                        <p className="text-sm text-gray-600 mt-1">
                                            Thanh toán bằng thẻ Visa, Mastercard, JCB
                                        </p>
                                    </div>
                                </label>

                                {/* Card Details Form */}
                                {paymentMethod === 'card' && (
                                    <div className="space-y-4 mt-4 p-4 bg-gray-50 rounded-lg">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Số thẻ <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={cardNumber}
                                                onChange={(e) => setCardNumber(e.target.value)}
                                                placeholder="1234 5678 9012 3456"
                                                maxLength="19"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Tên trên thẻ <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={cardName}
                                                onChange={(e) => setCardName(e.target.value)}
                                                placeholder="NGUYEN VAN A"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Ngày hết hạn <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={expiryDate}
                                                    onChange={(e) => setExpiryDate(e.target.value)}
                                                    placeholder="MM/YY"
                                                    maxLength="5"
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    CVV <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={cvv}
                                                    onChange={(e) => setCvv(e.target.value)}
                                                    placeholder="123"
                                                    maxLength="3"
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                                            <Lock size={16} />
                                            <span>Thông tin thẻ được mã hóa và bảo mật</span>
                                        </div>
                                    </div>
                                )}

                                {/* Bank Transfer Option */}
                                <label className="flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="bank"
                                        checked={paymentMethod === 'bank'}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        className="mt-1"
                                    />
                                    <div className="flex-1">
                                        <div className="font-semibold">Thanh toán VNPAY</div>
                                        <p className="text-sm text-gray-600 mt-1">
                                            Thanh toán qua cổng VNPAY - Nhanh chóng và bảo mật
                                        </p>

                                        {paymentMethod === 'bank' && (
                                            <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-200">
                                                <div className="flex items-center gap-2 text-sm text-gray-700 mb-3">
                                                    <Lock size={16} className="text-green-600" />
                                                    <span>Giao dịch được mã hóa và bảo mật bởi VNPAY</span>
                                                </div>

                                                <button
                                                    onClick={() => handleVNPayPayment(total)}
                                                    disabled={isProcessing}
                                                    className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    {isProcessing ? (
                                                        <>
                                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                            Đang xử lý...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <CreditCard size={18} />
                                                            Thanh toán ngay với VNPAY
                                                        </>
                                                    )}
                                                </button>

                                                <p className="text-xs text-gray-500 text-center mt-3">
                                                    Hỗ trợ thanh toán qua ATM, Internet Banking, Ví điện tử
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white border rounded-lg p-6 sticky top-4">
                            <h3 className="text-xl font-bold mb-6">Đơn Hàng Của Bạn</h3>

                            {/* Cart Items */}
                            <div className="space-y-4 mb-6 max-h-60 overflow-y-auto">
                                {cartItems.map((item, index) => (
                                    <div key={index} className="flex gap-3">
                                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                                            {item.image && (
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-medium text-sm truncate">{item.name}</h4>
                                            <p className="text-xs text-gray-600">
                                                {item.size && `Size: ${item.size}`}
                                                {item.color && ` • ${item.color}`}
                                            </p>
                                            <div className="flex justify-between items-center mt-1">
                                                <span className="text-xs text-gray-600">x{item.quantity}</span>
                                                <span className="font-semibold text-sm">{formatNumber(item.price * item.quantity)} đ</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Price Summary */}
                            <div className="space-y-3 pt-4 border-t">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Tạm tính</span>
                                    <span className="font-medium">{formatNumber(subtotal)} đ</span>
                                </div>

                                {discount > 0 && (
                                    <div className="flex justify-between text-sm text-red-500">
                                        <span>Giảm giá</span>
                                        <span className="font-medium">-{formatNumber(discount)} đ</span>
                                    </div>
                                )}

                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Phí vận chuyển</span>
                                    <span className="font-medium">{formatNumber(deliveryFee)} đ</span>
                                </div>

                                <div className="border-t pt-3 flex justify-between">
                                    <span className="font-bold text-lg">Tổng cộng</span>
                                    <span className="font-bold text-lg text-black">{formatNumber(total)} đ</span>
                                </div>
                            </div>

                            {/* Place Order Button */}
                            <button
                                onClick={handlePlaceOrder}
                                disabled={!isFormValid() || isProcessing}
                                className="w-full mt-6 bg-black text-white py-4 rounded-full font-medium hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                            >
                                {isProcessing ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Đang xử lý...
                                    </>
                                ) : (
                                    <>
                                        <Lock size={18} />
                                        Đặt hàng
                                    </>
                                )}
                            </button>

                            {!isFormValid() && (
                                <p className="text-xs text-gray-500 text-center mt-3">
                                    Vui lòng điền đầy đủ thông tin để đặt hàng
                                </p>
                            )}

                            <p className="text-xs text-gray-500 text-center mt-4">
                                Bằng việc đặt hàng, bạn đồng ý với điều khoản sử dụng của chúng tôi
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-100 py-8 mt-16">
                <div className="max-w-7xl mx-auto px-4 text-center text-gray-600 text-sm">
                    © 2024 SHOP.CO. All rights reserved.
                </div>
            </div>
        </div>
    );
}

export default Checkout;