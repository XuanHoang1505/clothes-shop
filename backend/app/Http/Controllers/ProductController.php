<?php

namespace App\Http\Controllers;

use App\Http\Requests\Product\CreateProductRequest;
use App\Http\Requests\Product\UpdateProductRequest;
use App\Services\Interfaces\ProductServiceInterface;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    protected $productService;

    public function __construct(ProductServiceInterface $productService)
    {
        $this->productService = $productService;
    }

    /**
     * GET /api/products
     * Lấy danh sách sản phẩm với pagination, filter, search
     */
    public function index(Request $request)
    {
        $page = $request->input('current', 1);
        $pageSize = $request->input('pageSize', 15);

        // Nếu có category trong query
        if ($request->has('category')) {
            $result = $this->productService->getProductsByCategory(
                $request->input('category'),
                $page,
                $pageSize
            );
            return response()->json($result);
        }

        // Nếu có search keyword
        if ($request->has('search')) {
            $result = $this->productService->searchProducts(
                $request->input('search'),
                $page,
                $pageSize
            );
            return response()->json($result);
        }

        // Filter với nhiều điều kiện
        $filters = $request->only([
            'category_slug',
            'category_name',
            'parent_category',
            'brand_slug',
            'min_price',
            'max_price',
            'is_new',
            'is_bestseller',
            'is_featured',
            'sort_by',
            'sort_order'
        ]);

        // Nếu không có filter gì, lấy tất cả
        if (empty(array_filter($filters))) {
            $result = $this->productService->getAllProducts($page, $pageSize);
            return response()->json($result);
        }

        // Có filter
        $result = $this->productService->filterProducts($filters, $page, $pageSize);
        return response()->json($result);
    }

    public function getByCategory(string $slug, Request $request)
    {
        $page = $request->input('current', 1);
        $pageSize = $request->input('pageSize', 15);
        
        $result = $this->productService->getProductsByCategory($slug, $page, $pageSize);
        
        return response()->json($result);
    }

    public function show(string $slug)
    {
        $result = $this->productService->getProductDetail($slug);
        
        $status = $result['success'] ? 200 : 404;
        return response()->json($result, $status);
    }

    public function featured(Request $request)
    {
        $limit = $request->input('limit', 10);
        
        $result = $this->productService->getFeaturedProducts($limit);
        
        return response()->json($result);
    }

    public function newProducts(Request $request)
    {
        $limit = $request->input('limit', 10);
        
        $result = $this->productService->getNewProducts($limit);
        
        return response()->json($result);
    }


    public function bestseller(Request $request)
    {
        $limit = $request->input('limit', 10);
        
        $result = $this->productService->getBestsellerProducts($limit);
        
        return response()->json($result);
    }

    public function store(CreateProductRequest $request)
    {
        $result = $this->productService->createProduct($request->validated());
        
        $status = $result['success'] ? 201 : 400;
        return response()->json($result, $status);
    }

    public function update(UpdateProductRequest $request, string $id)
    {
        $result = $this->productService->updateProduct($id, $request->validated());
        
        $status = $result['success'] ? 200 : 400;
        return response()->json($result, $status);
    }

    public function destroy(string $id)
    {
        $result = $this->productService->deleteProduct($id);
        
        $status = $result['success'] ? 200 : 400;
        return response()->json($result, $status);
    }

    public function checkStock(string $id, Request $request)
    {
        $quantity = $request->input('quantity', 1);
        
        $result = $this->productService->checkStock($id, $quantity);
        
        return response()->json($result);
    }

    public function categories()
    {
        $result = $this->productService->getAllCategories();
        
        return response()->json($result);
    }

    public function brands()
    {
        $result = $this->productService->getAllBrands();
        
        return response()->json($result);
    }

    public function getByPriceRange(Request $request)
    {
        $request->validate([
            'min_price' => 'required|integer|min:0',
            'max_price' => 'required|integer|min:0',
            'pageSize' => 'nullable|integer|min:1|max:100'
        ]);

        $page = $request->input('current', 1);
        $pageSize = $request->input('pageSize', 15);

        $result = $this->productService->filterProducts([
            'min_price' => $request->min_price,
            'max_price' => $request->max_price
        ], $page, $pageSize);
        
        return response()->json($result);
    }
}