<?php
namespace App\Services\Interfaces;

use App\Models\Product;

interface ProductServiceInterface
{
    /**
     * Lấy tất cả sản phẩm
     */
    public function getAllProducts(int $page = 1, int $pageSize = 15): array;

    /**
     * Lấy sản phẩm theo category slug
     */
    public function getProductsByCategory(string $categorySlug, int $page = 1, int $pageSize = 15): array;

    /**
     * Lấy chi tiết sản phẩm
     */
    public function getProductDetail(string $slug): array;

    /**
     * Filter sản phẩm
     */
    public function filterProducts(array $filters, int $page = 1, int $pageSize = 15): array;

    /**
     * Search sản phẩm
     */
    public function searchProducts(string $keyword, int $page = 1, int $pageSize = 15): array;

    /**
     * Lấy sản phẩm nổi bật
     */
    public function getFeaturedProducts(int $limit = 10): array;

    /**
     * Lấy sản phẩm mới
     */
    public function getNewProducts(int $limit = 10): array;

    /**
     * Lấy sản phẩm bán chạy
     */
    public function getBestsellerProducts(int $limit = 10): array;

    /**
     * Lấy tất cả categories
     */
    public function getAllCategories(): array;

    /**
     * Lấy tất cả brands
     */
    public function getAllBrands(): array;

    /**
     * Tạo sản phẩm mới
     */
    public function createProduct(array $data): array;

    /**
     * Cập nhật sản phẩm
     */
    public function updateProduct(string $id, array $data): array;

    /**
     * Xóa sản phẩm
     */
    public function deleteProduct(string $id): array;

    /**
     * Kiểm tra sản phẩm còn hàng
     */
    public function checkStock(string $id, int $quantity = 1): array;
}