import { useEffect, useState } from "react";
import { Slider, Drawer, Spin, Rate, Pagination, message } from "antd";
import { SlidersHorizontal, ChevronRight, ShoppingCart } from "lucide-react";
import ProductService from "@/services/site/ProductService";

function CategoryPage() {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 9,
    total: 0,
  });
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: [0, 2000000],
    colors: [],
    sizes: [],
    dressStyles: [],
  });

  const [sortBy, setSortBy] = useState("popular");

  const categoryList = [
    { name: "T-shirts", slug: "t-shirts" },
    { name: "Shorts", slug: "shorts" },
    { name: "Shirts", slug: "shirts" },
    { name: "Hoodie", slug: "hoodie" },
    { name: "Jeans", slug: "jeans" },
  ];
  const colorList = [
    { name: "green", hex: "#10B981" },
    { name: "red", hex: "#EF4444" },
    { name: "yellow", hex: "#FCD34D" },
    { name: "orange", hex: "#F97316" },
    { name: "cyan", hex: "#06B6D4" },
    { name: "blue", hex: "#3B82F6" },
    { name: "purple", hex: "#A855F7" },
    { name: "pink", hex: "#EC4899" },
    { name: "white", hex: "#FFFFFF" },
    { name: "black", hex: "#000000" },
  ];

  const sizeList = [
    "XX-Small",
    "X-Small",
    "Small",
    "Medium",
    "Large",
    "X-Large",
    "XX-Large",
    "3X-Large",
    "4X-Large",
  ];

  const dressStyleList = ["Casual", "Formal", "Party", "Gym"];

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const result = await ProductService.getProducts(
        pagination.current,
        pagination.pageSize,
        {
          ...filters,
        }
      );

      setProducts(result.data || []);
      setPagination((prev) => ({
        ...prev,
        total: result.total || 0,
      }));
    } catch (error) {
      message.error("Không thể tải sản phẩm. Vui lòng thử lại!");
      console.error("Lỗi khi lấy sản phẩm theo danh mục:", error);
    } finally {
      setLoading(false);
    }
  };

  const filtersProduct = async () => {
    setLoading(true);

    try {
      const transformedFilters = {
        ...filters,
        maxPrice: filters.priceRange[1],
        minPrice: filters.priceRange[0],
        priceRange: undefined,
      };
      const result = await ProductService.filtersProduct(
        pagination.current,
        pagination.pageSize,
        transformedFilters
      );
      setProducts(result.data || []);
      setPagination((prev) => ({
        ...prev,
        total: result.total || 0,
      }));
    } catch (error) {
      message.error("Không thể tải sản phẩm. Vui lòng thử lại!");
      console.error("Lỗi khi lọc sản phẩm:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [pagination.current, pagination.pageSize]);

  const handlePaginationChange = (page, pageSize) => {
    setPagination((prev) => ({
      ...prev,
      current: page,
      pageSize: pageSize,
    }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const calculateDiscount = (originalPrice, price) => {
    if (!originalPrice || originalPrice <= price) return null;
    const discount = ((originalPrice - price) / originalPrice) * 100;
    return `-${Math.round(discount)}%`;
  };

  const toggleFilter = (filterType, value) => {
    setFilters((prev) => {
      const currentValues = prev[filterType];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];

      return {
        ...prev,
        [filterType]: newValues,
      };
    });
  };

  const handlePriceChange = (value) => {
    setFilters((prev) => ({
      ...prev,
      priceRange: value,
    }));
  };

  const applyFilters = () => {
    setPagination((prev) => ({ ...prev, current: 1 }));
    setDrawerVisible(false);
    filtersProduct();
  };

  const clearFilters = () => {
    setFilters({
      categories: [],
      priceRange: [0, 2000000],
      colors: [],
      sizes: [],
      dressStyles: [],
    });
    setPagination((prev) => ({ ...prev, current: 1 }));
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(num);
  };

  const FilterContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center pb-4 border-b">
        <h2 className="text-xl font-bold">Filters</h2>
        <button
          onClick={clearFilters}
          className="text-sm text-gray-600 hover:text-black"
        >
          Clear All
        </button>
      </div>

      {/* Categories */}
      <div className="border-b pb-4">
        <h3 className="font-bold text-lg mb-3">Categories</h3>
        {categoryList.map((category, index) => (
          <div
            key={index}
            onClick={() => toggleFilter("categories", category.slug)}
            className="flex justify-between items-center py-3 cursor-pointer hover:text-black transition-colors"
          >
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filters.categories.includes(category.slug)}
                onChange={() => {}}
                className="w-4 h-4 cursor-pointer"
              />
              <span
                className={
                  filters.categories.includes(category.slug)
                    ? "text-black font-medium"
                    : "text-gray-600"
                }
              >
                {category.name}
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
        ))}
      </div>

      {/* Price */}
      <div className="border-b pb-6">
        <h3 className="font-bold text-lg mb-4">Price</h3>
        <Slider
          range
          min={0}
          max={2000000}
          step={10000}
          value={filters.priceRange}
          onChange={handlePriceChange}
          styles={{
            track: { backgroundColor: "black" },
            tracks: { backgroundColor: "black" },
          }}
        />
        <div className="flex justify-between mt-3 text-sm font-semibold">
          <span>{formatNumber(filters.priceRange[0])}</span>
          <span>{formatNumber(filters.priceRange[1])}</span>
        </div>
      </div>

      {/* Colors */}
      <div className="border-b pb-6">
        <h3 className="font-bold text-lg mb-4">Colors</h3>
        <div className="grid grid-cols-5 gap-3">
          {colorList.map((color, index) => (
            <button
              key={index}
              onClick={() => toggleFilter("colors", color.name)}
              className={`w-9 h-9 rounded-full border-2 hover:scale-110 transition-transform cursor-pointer relative ${
                filters.colors.includes(color.name)
                  ? "ring-2 ring-black ring-offset-2"
                  : ""
              }`}
              style={{
                backgroundColor: color.hex,
                borderColor: color.hex === "#FFFFFF" ? "#e5e7eb" : color.hex,
              }}
              aria-label={color.name}
            >
              {filters.colors.includes(color.name) && (
                <span
                  className={`absolute inset-0 flex items-center justify-center text-xs font-bold ${
                    color.hex === "#FFFFFF" || color.hex === "#FCD34D"
                      ? "text-black"
                      : "text-white"
                  }`}
                >
                  ✓
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Size */}
      <div className="border-b pb-6">
        <h3 className="font-bold text-lg mb-4">Size</h3>
        <div className="grid grid-cols-3 gap-2">
          {sizeList.map((size, index) => (
            <button
              key={index}
              onClick={() => toggleFilter("sizes", size)}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                filters.sizes.includes(size)
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Dress Style */}
      <div className="pb-4">
        <h3 className="font-bold text-lg mb-3">Dress Style</h3>
        {dressStyleList.map((style, index) => (
          <div
            key={index}
            onClick={() => toggleFilter("dressStyles", style)}
            className="flex justify-between items-center py-3 cursor-pointer hover:text-black transition-colors"
          >
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filters.dressStyles.includes(style)}
                onChange={() => {}}
                className="w-4 h-4 cursor-pointer"
              />
              <span
                className={
                  filters.dressStyles.includes(style)
                    ? "text-black font-medium"
                    : "text-gray-600"
                }
              >
                {style}
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
        ))}
      </div>

      {/* Apply Filter Button */}
      <button
        onClick={applyFilters}
        className="w-full bg-black text-white py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors"
      >
        Apply Filter
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Desktop Filters */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="border rounded-3xl p-6 sticky top-6">
              <FilterContent />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-4 ms-auto">
                <span className="text-gray-600 text-sm hidden sm:inline">
                  Showing {(pagination.current - 1) * pagination.pageSize + 1}-
                  {Math.min(
                    pagination.current * pagination.pageSize,
                    pagination.total
                  )}{" "}
                  of {pagination.total} Products
                </span>
                <button
                  className="lg:hidden p-2 border rounded-full hover:bg-gray-50"
                  onClick={() => setDrawerVisible(true)}
                >
                  <SlidersHorizontal className="w-5 h-5" />
                </button>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black hidden md:block"
                >
                  <option value="popular">Most Popular</option>
                  <option value="newest">Newest</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Active Filters Display */}
            {(filters.categories.length > 0 ||
              filters.colors.length > 0 ||
              filters.sizes.length > 0 ||
              filters.dressStyles.length > 0) && (
              <div className="mb-4 flex flex-wrap gap-2">
                {filters.categories.map((cat) => (
                  <span
                    key={cat}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm"
                  >
                    {cat}
                    <button
                      onClick={() => toggleFilter("categories", cat)}
                      className="hover:text-red-600"
                    >
                      ×
                    </button>
                  </span>
                ))}
                {filters.colors.map((color) => (
                  <span
                    key={color}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm"
                  >
                    {color}
                    <button
                      onClick={() => toggleFilter("colors", color)}
                      className="hover:text-red-600"
                    >
                      ×
                    </button>
                  </span>
                ))}
                {filters.sizes.map((size) => (
                  <span
                    key={size}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm"
                  >
                    {size}
                    <button
                      onClick={() => toggleFilter("sizes", size)}
                      className="hover:text-red-600"
                    >
                      ×
                    </button>
                  </span>
                ))}
                {filters.dressStyles.map((style) => (
                  <span
                    key={style}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm"
                  >
                    {style}
                    <button
                      onClick={() => toggleFilter("dressStyles", style)}
                      className="hover:text-red-600"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Products Grid */}
            <Spin spinning={loading}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="group cursor-pointer"
                    onClick={() =>
                      (window.location.href = `/product/${product.slug}`)
                    }
                  >
                    <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden mb-3">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <Rate disabled defaultValue={5} className="text-sm" />
                      <span className="text-sm text-gray-600">5/5</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xl">
                        {formatNumber(product.price)}
                      </span>
                      {product.compare_price && (
                        <>
                          <span className="text-gray-400 line-through">
                            {formatNumber(product.compare_price)}
                          </span>
                          <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
                            {calculateDiscount(
                              product.compare_price,
                              product.price
                            )}
                          </span>
                        </>
                      )}
                      <ShoppingCart className="ms-auto" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-8 flex justify-center">
                <Pagination
                  current={pagination.current}
                  pageSize={pagination.pageSize}
                  total={pagination.total}
                  onChange={handlePaginationChange}
                  onShowSizeChange={handlePaginationChange}
                  showSizeChanger
                  showQuickJumper
                  showTotal={(total) => `Tổng ${total} sản phẩm`}
                  pageSizeOptions={["9", "15", "20", "30", "50"]}
                />
              </div>
            </Spin>
          </main>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <Drawer
        title={
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold">Filters</span>
          </div>
        }
        placement="left"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={320}
      >
        <FilterContent />
      </Drawer>
    </div>
  );
}

export default CategoryPage;
