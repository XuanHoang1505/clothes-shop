import React, { useState, useEffect } from 'react';
import { X, Package, Calendar, User, MapPin, CreditCard, ChevronDown, ChevronUp, Search, Filter } from 'lucide-react';

function OrderManagement() {
    const [orders, setOrders] = useState([]);
    const [expandedOrder, setExpandedOrder] = useState(null);
    const [filterStatus, setFilterStatus] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilterMenu, setShowFilterMenu] = useState(false);


    useEffect(() => {

    }, []);


    useEffect(() => {
        // Giả lập load đơn hàng từ API/localStorage
        // Trong thực tế, bạn sẽ fetch từ backend
        const mockOrders = [
            {
                id: 'ORD001',
                orderCode: 'SHOP20241119001',
                customer: {
                    fullName: 'Nguyễn Văn A',
                    email: 'nguyenvana@email.com',
                    phone: '0123456789'
                },
                address: {
                    houseNumber: '123 Nguyễn Trãi',
                    province: 'Hà Nội',
                    ward: 'Đống Đa',
                    note: 'Gọi trước khi giao'
                },
                items: [
                    {
                        name: 'T-shirt Graphic Design',
                        quantity: 2,
                        price: 260000,
                        size: 'L',
                        color: 'Black',
                        image: null
                    }
                ],
                payment: {
                    method: 'cod',
                    amount: 535000
                },
                subtotal: 520000,
                discount: 0,
                deliveryFee: 15000,
                status: 'pending',
                createdAt: '2024-11-19T10:30:00Z'
            },
            {
                id: 'ORD002',
                orderCode: 'SHOP20241119002',
                customer: {
                    fullName: 'Trần Thị B',
                    email: 'tranthib@email.com',
                    phone: '0987654321'
                },
                address: {
                    houseNumber: '456 Lê Lợi',
                    province: 'Đà Nẵng',
                    ward: 'Hải Châu',
                    note: ''
                },
                items: [
                    {
                        name: 'Skinny Fit Jeans',
                        quantity: 1,
                        price: 450000,
                        size: 'M',
                        color: 'Blue',
                        image: null
                    },
                    {
                        name: 'Checkered Shirt',
                        quantity: 1,
                        price: 320000,
                        size: 'L',
                        color: 'Red',
                        image: null
                    }
                ],
                payment: {
                    method: 'bank',
                    amount: 785000
                },
                subtotal: 770000,
                discount: 0,
                deliveryFee: 15000,
                status: 'processing',
                createdAt: '2024-11-19T09:15:00Z'
            },
            {
                id: 'ORD003',
                orderCode: 'SHOP20241118001',
                customer: {
                    fullName: 'Lê Văn C',
                    email: 'levanc@email.com',
                    phone: '0912345678'
                },
                address: {
                    houseNumber: '789 Trần Hưng Đạo',
                    province: 'TP.HCM',
                    ward: 'Quận 1',
                    note: 'Giao giờ hành chính'
                },
                items: [
                    {
                        name: 'Polo Shirt',
                        quantity: 3,
                        price: 280000,
                        size: 'XL',
                        color: 'White',
                        image: null
                    }
                ],
                payment: {
                    method: 'card',
                    amount: 855000
                },
                subtotal: 840000,
                discount: 0,
                deliveryFee: 15000,
                status: 'completed',
                createdAt: '2024-11-18T14:20:00Z'
            }
        ];

        setOrders(mockOrders);
    }, []);

    const formatNumber = (num) => {
        return new Intl.NumberFormat('vi-VN').format(num);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusColor = (status) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-800',
            processing: 'bg-blue-100 text-blue-800',
            shipping: 'bg-purple-100 text-purple-800',
            completed: 'bg-green-100 text-green-800',
            cancelled: 'bg-red-100 text-red-800'
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    const getStatusText = (status) => {
        const texts = {
            pending: 'Chờ xác nhận',
            processing: 'Đang xử lý',
            shipping: 'Đang giao',
            completed: 'Hoàn thành',
            cancelled: 'Đã hủy'
        };
        return texts[status] || status;
    };

    const getPaymentMethodText = (method) => {
        const methods = {
            cod: 'Thanh toán khi nhận hàng',
            card: 'Thẻ tín dụng/Ghi nợ',
            bank: 'VNPAY'
        };
        return methods[method] || method;
    };

    const toggleOrder = (orderId) => {
        setExpandedOrder(expandedOrder === orderId ? null : orderId);
    };

    const updateOrderStatus = (orderId, newStatus) => {
        setOrders(orders.map(order =>
            order.id === orderId ? { ...order, status: newStatus } : order
        ));
    };

    const filteredOrders = orders.filter(order => {
        const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
        const matchesSearch = searchQuery === '' ||
            order.orderCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.customer.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.customer.phone.includes(searchQuery);
        return matchesStatus && matchesSearch;
    });

    const statusCounts = {
        all: orders.length,
        pending: orders.filter(o => o.status === 'pending').length,
        processing: orders.filter(o => o.status === 'processing').length,
        shipping: orders.filter(o => o.status === 'shipping').length,
        completed: orders.filter(o => o.status === 'completed').length,
        cancelled: orders.filter(o => o.status === 'cancelled').length
    };

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold">ORDER MANAGEMENT</h2>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Package size={18} />
                        <span>{filteredOrders.length} orders</span>
                    </div>
                </div>

                {/* Filters and Search */}
                <div className="bg-white border rounded-lg p-4 mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Tìm kiếm theo mã đơn, tên khách hàng, SĐT..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                            />
                        </div>

                        {/* Status Filter */}
                        <div className="relative">
                            <button
                                onClick={() => setShowFilterMenu(!showFilterMenu)}
                                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <Filter size={18} />
                                <span>Lọc trạng thái</span>
                                <ChevronDown size={16} />
                            </button>

                            {showFilterMenu && (
                                <div className="absolute right-0 mt-2 w-56 bg-white border rounded-lg shadow-lg z-10">
                                    {Object.entries(statusCounts).map(([status, count]) => (
                                        <button
                                            key={status}
                                            onClick={() => {
                                                setFilterStatus(status);
                                                setShowFilterMenu(false);
                                            }}
                                            className={`w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center justify-between ${filterStatus === status ? 'bg-gray-100 font-semibold' : ''
                                                }`}
                                        >
                                            <span>{status === 'all' ? 'Tất cả' : getStatusText(status)}</span>
                                            <span className="text-gray-500 text-sm">({count})</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Quick Status Filters */}
                    <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                        {Object.entries(statusCounts).map(([status, count]) => (
                            <button
                                key={status}
                                onClick={() => setFilterStatus(status)}
                                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filterStatus === status
                                    ? 'bg-black text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {status === 'all' ? 'Tất cả' : getStatusText(status)} ({count})
                            </button>
                        ))}
                    </div>
                </div>

                {/* Orders List */}
                <div className="space-y-4">
                    {filteredOrders.length === 0 ? (
                        <div className="bg-white border rounded-lg p-12 text-center">
                            <Package size={48} className="mx-auto text-gray-400 mb-4" />
                            <p className="text-gray-600">Không tìm thấy đơn hàng nào</p>
                        </div>
                    ) : (
                        filteredOrders.map((order) => (
                            <div key={order.id} className="bg-white border rounded-lg overflow-hidden">
                                {/* Order Header */}
                                <div className="p-4 bg-gray-50 border-b">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div className="flex items-center gap-4">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="font-bold text-lg">{order.orderCode}</span>
                                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                                                        {getStatusText(order.status)}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <Calendar size={14} />
                                                    <span>{formatDate(order.createdAt)}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <div className="text-right">
                                                <div className="text-sm text-gray-600">Tổng tiền</div>
                                                <div className="font-bold text-lg">{formatNumber(order.payment.amount)} đ</div>
                                            </div>
                                            <button
                                                onClick={() => toggleOrder(order.id)}
                                                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                                            >
                                                {expandedOrder === order.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Order Details (Expanded) */}
                                {expandedOrder === order.id && (
                                    <div className="p-6">
                                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                                            {/* Customer Info */}
                                            <div>
                                                <div className="flex items-center gap-2 mb-4">
                                                    <User size={18} className="text-gray-700" />
                                                    <h4 className="font-bold">Thông tin khách hàng</h4>
                                                </div>
                                                <div className="space-y-2 text-sm">
                                                    <div>
                                                        <span className="text-gray-600">Tên:</span>{' '}
                                                        <span className="font-medium">{order.customer.fullName}</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-gray-600">Email:</span>{' '}
                                                        <span className="font-medium">{order.customer.email}</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-gray-600">SĐT:</span>{' '}
                                                        <span className="font-medium">{order.customer.phone}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Shipping Address */}
                                            <div>
                                                <div className="flex items-center gap-2 mb-4">
                                                    <MapPin size={18} className="text-gray-700" />
                                                    <h4 className="font-bold">Địa chỉ giao hàng</h4>
                                                </div>
                                                <div className="text-sm">
                                                    <p className="font-medium">{order.address.houseNumber}</p>
                                                    <p className="text-gray-600">{order.address.ward}, {order.address.province}</p>
                                                    {order.address.note && (
                                                        <p className="text-gray-600 mt-2">
                                                            <span className="font-medium">Ghi chú:</span> {order.address.note}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Order Items */}
                                        <div className="mb-6">
                                            <h4 className="font-bold mb-4">Sản phẩm đã đặt</h4>
                                            <div className="space-y-3">
                                                {order.items.map((item, index) => (
                                                    <div key={index} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                                                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                                                            {item.image && (
                                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                            )}
                                                        </div>
                                                        <div className="flex-1">
                                                            <h5 className="font-medium">{item.name}</h5>
                                                            <p className="text-sm text-gray-600">
                                                                {item.size && `Size: ${item.size}`}
                                                                {item.color && ` • ${item.color}`}
                                                            </p>
                                                            <div className="flex justify-between items-center mt-1">
                                                                <span className="text-sm text-gray-600">Số lượng: {item.quantity}</span>
                                                                <span className="font-semibold">{formatNumber(item.price * item.quantity)} đ</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Payment Summary */}
                                        <div className="border-t pt-4">
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div>
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <CreditCard size={18} className="text-gray-700" />
                                                        <h4 className="font-bold">Thanh toán</h4>
                                                    </div>
                                                    <p className="text-sm text-gray-600">{getPaymentMethodText(order.payment.method)}</p>
                                                </div>

                                                <div className="space-y-2">
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-gray-600">Tạm tính:</span>
                                                        <span className="font-medium">{formatNumber(order.subtotal)} đ</span>
                                                    </div>
                                                    {order.discount > 0 && (
                                                        <div className="flex justify-between text-sm text-red-500">
                                                            <span>Giảm giá:</span>
                                                            <span className="font-medium">-{formatNumber(order.discount)} đ</span>
                                                        </div>
                                                    )}
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-gray-600">Phí vận chuyển:</span>
                                                        <span className="font-medium">{formatNumber(order.deliveryFee)} đ</span>
                                                    </div>
                                                    <div className="flex justify-between pt-2 border-t">
                                                        <span className="font-bold">Tổng cộng:</span>
                                                        <span className="font-bold text-lg">{formatNumber(order.payment.amount)} đ</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex gap-3 mt-6 pt-6 border-t">
                                            {order.status === 'pending' && (
                                                <>
                                                    <button
                                                        onClick={() => updateOrderStatus(order.id, 'processing')}
                                                        className="flex-1 bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                                                    >
                                                        Xác nhận đơn
                                                    </button>
                                                    <button
                                                        onClick={() => updateOrderStatus(order.id, 'cancelled')}
                                                        className="px-6 bg-red-500 text-white py-3 rounded-lg font-medium hover:bg-red-600 transition-colors"
                                                    >
                                                        Hủy đơn
                                                    </button>
                                                </>
                                            )}
                                            {order.status === 'processing' && (
                                                <button
                                                    onClick={() => updateOrderStatus(order.id, 'shipping')}
                                                    className="flex-1 bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
                                                >
                                                    Chuyển sang đang giao
                                                </button>
                                            )}
                                            {order.status === 'shipping' && (
                                                <button
                                                    onClick={() => updateOrderStatus(order.id, 'completed')}
                                                    className="flex-1 bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition-colors"
                                                >
                                                    Hoàn thành đơn hàng
                                                </button>
                                            )}
                                            {order.status === 'completed' && (
                                                <button
                                                    disabled
                                                    className="flex-1 bg-gray-200 text-gray-500 py-3 rounded-lg font-medium cursor-not-allowed"
                                                >
                                                    Đơn hàng đã hoàn thành
                                                </button>
                                            )}
                                            {order.status === 'cancelled' && (
                                                <button
                                                    disabled
                                                    className="flex-1 bg-gray-200 text-gray-500 py-3 rounded-lg font-medium cursor-not-allowed"
                                                >
                                                    Đơn hàng đã hủy
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>

        </div>
    );
}

export default OrderManagement;