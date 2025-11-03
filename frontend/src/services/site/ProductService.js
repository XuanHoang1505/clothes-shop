import axiosInstance from "../../config/axiosInstance";
import handleErrorResponse from "../../utils/errors/ErrorHandler";

// Đường dẫn API gốc cho sản phẩm
const API_URL = "/products";

// 🧩 Lấy tất cả sản phẩm
const getProducts = async () => {
  try {
    const response = await axiosInstance.get(API_URL);
    return response.data;
  } catch (error) {
    handleErrorResponse(error);
    throw error;
  }
};

// 🔍 Lấy sản phẩm theo ID
const getProductById = async (id) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    handleErrorResponse(error);
    console.error(`Lỗi khi lấy product ID: ${id}`, error);
    throw error;
  }
};
// Lấy sản phẩm theo slug
const getProductBySlug = async (slug) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/${slug}`);
    return response.data;
  } catch (error) {
    handleErrorResponse(error);
    console.error(`Lỗi khi lấy product slug: ${slug}`, error);
    throw error;
  }
};

const getProductsByCategory = async (categorySlug, page = 1, pageSize = 9) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/category/${categorySlug}`, {
      params: {
        current: page,
        pageSize: pageSize
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi lấy sản phẩm theo danh mục: ${categorySlug}`, error);
    throw error;
  }
};
// ➕ Tạo mới sản phẩm
const createProduct = async (productData) => {
  try {
    const response = await axiosInstance.post(API_URL, productData);
    return response.data;
  } catch (error) {
    handleErrorResponse(error);
    console.error("Lỗi khi tạo sản phẩm:", error);
    throw error;
  }
};

// ✏️ Cập nhật sản phẩm
const updateProduct = async (id, productData) => {
  try {
    const response = await axiosInstance.put(`${API_URL}/${id}`, productData);
    return response.data;
  } catch (error) {
    handleErrorResponse(error);
    console.error(`Lỗi khi cập nhật sản phẩm ID: ${id}`, error);
    throw error;
  }
};

// 🗑️ Xoá sản phẩm
const deleteProduct = async (id) => {
  try {
    const response = await axiosInstance.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    handleErrorResponse(error);
    console.error(`Lỗi khi xoá sản phẩm ID: ${id}`, error);
    throw error;
  }
};


const ProductService = {
  getProducts,
  getProductById,
  getProductBySlug,
  getProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
};

export default ProductService;
