import { useState } from "react";
import { Slider, Drawer, Button, Rate, Pagination } from "antd";
import { SlidersHorizontal, ChevronRight, X } from "lucide-react";

function CategoryPage() {
  const [priceRange, setPriceRange] = useState([50, 200]);
  const [selectedSize, setSelectedSize] = useState("Large");
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const categoryList = ["T-shirts", "Shorts", "Shirts", "Hoodie", "Jeans"];
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
    { name: "black", hex: "#000000" }
  ];

  const sizeList = ["XX-Small", "X-Small", "Small", "Medium", "Large", "X-Large", "XX-Large", "3X-Large", "4X-Large"];
  
  const dressStyleList = ["Casual", "Formal", "Party", "Gym"];

  const products = [
    { id: 1, name: "Gradient Graphic T-shirt", price: 145, originalPrice: null, discount: null, rating: 3.5, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop" },
    { id: 2, name: "Polo with Tipping Details", price: 180, originalPrice: 242, discount: "-20%", rating: 4.5, image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=300&h=300&fit=crop" },
    { id: 3, name: "Black Striped T-shirt", price: 120, originalPrice: 160, discount: "-30%", rating: 5.0, image: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=300&h=300&fit=crop" },
    { id: 4, name: "Skinny Fit Jeans", price: 240, originalPrice: 260, discount: "-20%", rating: 3.5, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=300&fit=crop" },
    { id: 5, name: "Checkered Shirt", price: 180, originalPrice: null, discount: null, rating: 4.5, image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&h=300&fit=crop" },
    { id: 6, name: "Sleeve Striped T-shirt", price: 130, originalPrice: 160, discount: "-30%", rating: 4.5, image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=300&h=300&fit=crop" },
    { id: 7, name: "Vertical Striped Shirt", price: 212, originalPrice: 232, discount: "-20%", rating: 5.0, image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&h=300&fit=crop" },
    { id: 8, name: "Courage Graphic T-shirt", price: 145, originalPrice: null, discount: null, rating: 4.0, image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=300&h=300&fit=crop" },
    { id: 9, name: "Loose Fit Bermuda Shorts", price: 80, originalPrice: null, discount: null, rating: 3.0, image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=300&h=300&fit=crop" }
  ];

  const FilterContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center pb-4 border-b">
        <h2 className="text-xl font-bold">Filters</h2>
        <SlidersHorizontal className="w-5 h-5 text-gray-600" />
      </div>

      {/* Categories */}
      <div className="border-b pb-4">
        {categoryList.map((category, index) => (
          <div
            key={index}
            className="flex justify-between items-center py-3 cursor-pointer hover:text-black transition-colors"
          >
            <span className="text-gray-600">{category}</span>
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
          max={500}
          step={10}
          value={priceRange}
          onChange={setPriceRange}
          styles={{
            track: { backgroundColor: "black" },
            tracks: { backgroundColor: "black" }
          }}
        />
        <div className="flex justify-between mt-3 text-sm font-semibold">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      {/* Colors */}
      <div className="border-b pb-6">
        <h3 className="font-bold text-lg mb-4">Colors</h3>
        <div className="grid grid-cols-5 gap-3">
          {colorList.map((color, index) => (
            <button
              key={index}
              className="w-9 h-9 rounded-full border-2 border-gray-200 hover:scale-110 transition-transform cursor-pointer"
              style={{ 
                backgroundColor: color.hex,
                borderColor: color.hex === "#FFFFFF" ? "#e5e7eb" : color.hex
              }}
              aria-label={color.name}
            />
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
              onClick={() => setSelectedSize(size)}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                selectedSize === size
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
            className="flex justify-between items-center py-3 cursor-pointer hover:text-black transition-colors"
          >
            <span className="text-gray-600">{style}</span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
        ))}
      </div>

      {/* Apply Filter Button */}
      <button className="w-full bg-black text-white py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors">
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
              <h1 className="text-3xl font-bold">Casual</h1>
              <div className="flex items-center gap-4">
                <span className="text-gray-600 text-sm hidden sm:inline">
                  Showing 1-10 of 100 Products
                </span>
                <button
                  className="lg:hidden p-2 border rounded-full hover:bg-gray-50"
                  onClick={() => setDrawerVisible(true)}
                >
                  <SlidersHorizontal className="w-5 h-5" />
                </button>
                <select className="border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black hidden md:block">
                  <option>Most Popular</option>
                  <option>Newest</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="group cursor-pointer">
                  <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden mb-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <Rate disabled defaultValue={product.rating} className="text-sm" />
                    <span className="text-sm text-gray-600">{product.rating}/5</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xl">${product.price}</span>
                    {product.originalPrice && (
                      <>
                        <span className="text-gray-400 line-through">
                          ${product.originalPrice}
                        </span>
                        <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
                          {product.discount}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-center">
              <Pagination
                current={currentPage}
                total={100}
                pageSize={9}
                onChange={setCurrentPage}
                showSizeChanger={false}
              />
            </div>
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