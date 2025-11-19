<?php
namespace App\Services\Implementations;

use App\Services\Interfaces\ProductServiceInterface;
use App\Repositories\Interfaces\ProductRepositoryInterface;
use Illuminate\Support\Facades\Log;

class ProductService implements ProductServiceInterface
{
    protected $productRepository;

    public function __construct(ProductRepositoryInterface $productRepository)
    {
        $this->productRepository = $productRepository;
    }

    public function getAllProducts(int $page = 1, int $pageSize = 15): array
    {
        try {
            $products = $this->productRepository->getAll($page, $pageSize);

            return [
                'success' => true,
                'data' => $products->items(),
                'total' => $products->total(),
                'current' => $products->currentPage(),
                'pageSize' => $products->perPage(),
            ];
        } catch (\Exception $e) {
            Log::error('Error getting all products', [
                'error' => $e->getMessage()
            ]);

            return [
                'success' => false,
                'message' => 'Không thể lấy danh sách sản phẩm'
            ];
        }
    }


    public function getProductsByCategory(string $categorySlug, int $page = 1, int $pageSize = 15): array
    {
        try {
            $products = $this->productRepository->findByCategorySlug($categorySlug, $page, $pageSize );

            if ($products->isEmpty()) {
                return [
                    'success' => false,
                    'message' => 'Không tìm thấy sản phẩm trong danh mục này'
                ];
            }

            return [
                'success' => true,
                'data' => $products->items(),
                'total' => $products->total(),
                'current' => $products->currentPage(),
                'pageSize' => $products->perPage(),
            ];
        } catch (\Exception $e) {
            Log::error('Error getting products by category', [
                'category_slug' => $categorySlug,
                'error' => $e->getMessage()
            ]);

            return [
                'success' => false,
                'message' => 'Không thể lấy danh sách sản phẩm'
            ];
        }
    }

    public function getProductDetail(string $slug): array
    {
        try {
            $product = $this->productRepository->findBySlug($slug);

            if (!$product) {
                return [
                    'success' => false,
                    'message' => 'Không tìm thấy sản phẩm'
                ];
            }

            $relatedProducts = $this->productRepository->getRelatedProducts(
                $product->_id,
                $product->category['slug'],
                6
            );

            return [
                'success' => true,
                'data' => $product,
                'related_products' => $relatedProducts
            ];
        } catch (\Exception $e) {
            Log::error('Error getting product detail', [
                'slug' => $slug,
                'error' => $e->getMessage()
            ]);

            return [
                'success' => false,
                'message' => 'Không thể lấy thông tin sản phẩm'
            ];
        }
    }

    public function filterProducts(array $filters, int $page = 1, int $pageSize = 15): array
    {
        try {
            $products = $this->productRepository->filter($filters, $page, $pageSize );

            return [
                'success' => true,
                'data' => $products->items(),
                'total' => $products->total(),
                'current' => $products->currentPage(),
                'pageSize' => $products->perPage(),
                'filters_applied' => $filters
            ];
        } catch (\Exception $e) {
            Log::error('Error filtering products', [
                'filters' => $filters,
                'error' => $e->getMessage()
            ]);

            return [
                'success' => false,
                'message' => 'Không thể lọc sản phẩm'
            ];
        }
    }

    public function searchProducts(string $keyword, int $page = 1, int $pageSize = 15): array
    {
        try {
            $products = $this->productRepository->filter([
                'search' => $keyword
            ], $pageSize);

            return [
                'success' => true,
                'data' => $products->items(),
                'total' => $products->total(),
                'current' => $products->currentPage(),
                'pageSize' => $products->perPage(),
                'keyword' => $keyword
            ];
        } catch (\Exception $e) {
            Log::error('Error searching products', [
                'keyword' => $keyword,
                'error' => $e->getMessage()
            ]);

            return [
                'success' => false,
                'message' => 'Không thể tìm kiếm sản phẩm'
            ];
        }
    }

    public function getFeaturedProducts(int $limit = 10): array
    {
        try {
            $products = $this->productRepository->getFeatured($limit);

            return [
                'success' => true,
                'data' => $products
            ];
        } catch (\Exception $e) {
            Log::error('Error getting featured products', [
                'error' => $e->getMessage()
            ]);

            return [
                'success' => false,
                'message' => 'Không thể lấy sản phẩm nổi bật'
            ];
        }
    }

    public function getNewProducts(int $limit = 10): array
    {
        try {
            $products = $this->productRepository->getNew($limit);

            return [
                'success' => true,
                'data' => $products
            ];
        } catch (\Exception $e) {
            Log::error('Error getting new products', [
                'error' => $e->getMessage()
            ]);

            return [
                'success' => false,
                'message' => 'Không thể lấy sản phẩm mới'
            ];
        }
    }

    public function getBestsellerProducts(int $limit = 10): array
    {
        try {
            $products = $this->productRepository->getBestseller($limit);

            return [
                'success' => true,
                'data' => $products
            ];
        } catch (\Exception $e) {
            Log::error('Error getting bestseller products', [
                'error' => $e->getMessage()
            ]);

            return [
                'success' => false,
                'message' => 'Không thể lấy sản phẩm bán chạy'
            ];
        }
    }

    public function getAllCategories(): array
    {
        try {
            $categories = $this->productRepository->getAllCategories();

            return [
                'success' => true,
                'data' => $categories
            ];
        } catch (\Exception $e) {
            Log::error('Error getting categories', [
                'error' => $e->getMessage()
            ]);

            return [
                'success' => false,
                'message' => 'Không thể lấy danh sách danh mục'
            ];
        }
    }

    public function getAllDressStyles(): array
    {
        try {
            $dressStyles = $this->productRepository->getAllDressStyles();

            return [
                'success' => true,
                'data' => $dressStyles
            ];
        } catch (\Exception $e) {
            Log::error('Error getting dress styles', [
                'error' => $e->getMessage()
            ]);

            return [
                'success' => false,
                'message' => 'Không thể lấy danh sách kiểu váy'
            ];
        }
    }

    public function getAllBrands(): array
    {
        try {
            $brands = $this->productRepository->getAllBrands();

            return [
                'success' => true,
                'data' => $brands
            ];
        } catch (\Exception $e) {
            Log::error('Error getting brands', [
                'error' => $e->getMessage()
            ]);

            return [
                'success' => false,
                'message' => 'Không thể lấy danh sách thương hiệu'
            ];
        }
    }
    public function getProductById(string $id)
    {
        return $this->productRepository->findById($id);
    }

    public function getProductBySlug(string $slug)
    {
        return $this->productRepository->findBySlug($slug);
    }


    public function createProduct(array $data): array
    {
        try {
            $product = $this->productRepository->create($data);

            return [
                'success' => true,
                'message' => 'Tạo sản phẩm thành công',
                'data' => $product
            ];
        } catch (\Exception $e) {
            Log::error('Error creating product', [
                'data' => $data,
                'error' => $e->getMessage()
            ]);

            return [
                'success' => false,
                'message' => 'Không thể tạo sản phẩm'
            ];
        }
    }

    public function updateProduct(string $id, array $data): array
    {
        try {
            $updated = $this->productRepository->update($id, $data);

            if (!$updated) {
                return [
                    'success' => false,
                    'message' => 'Không tìm thấy sản phẩm'
                ];
            }

            return [
                'success' => true,
                'message' => 'Cập nhật sản phẩm thành công'
            ];
        } catch (\Exception $e) {
            Log::error('Error updating product', [
                'id' => $id,
                'data' => $data,
                'error' => $e->getMessage()
            ]);

            return [
                'success' => false,
                'message' => 'Không thể cập nhật sản phẩm'
            ];
        }
    }

    public function deleteProduct(string $id): array
    {
        try {
            $deleted = $this->productRepository->delete($id);

            if (!$deleted) {
                return [
                    'success' => false,
                    'message' => 'Không tìm thấy sản phẩm'
                ];
            }

            return [
                'success' => true,
                'message' => 'Xóa sản phẩm thành công'
            ];
        } catch (\Exception $e) {
            Log::error('Error deleting product', [
                'id' => $id,
                'error' => $e->getMessage()
            ]);

            return [
                'success' => false,
                'message' => 'Không thể xóa sản phẩm'
            ];
        }
    }

    public function checkStock(string $id, int $quantity = 1): array
    {
        try {
            $inStock = $this->productRepository->isInStock($id, $quantity);

            return [
                'success' => true,
                'in_stock' => $inStock
            ];
        } catch (\Exception $e) {
            Log::error('Error checking stock', [
                'id' => $id,
                'quantity' => $quantity,
                'error' => $e->getMessage()
            ]);

            return [
                'success' => false,
                'message' => 'Không thể kiểm tra tồn kho'
            ];
        }
    }
}

