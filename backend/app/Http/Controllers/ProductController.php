<?php

namespace App\Http\Controllers;

use App\Http\Requests\Product\CreateProductRequest;
use App\Http\Requests\Product\UpdateProductRequest;
use App\Services\Interfaces\ProductServiceInterface;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Container\Attributes\Log;
use PgSql\Lob;

class ProductController extends Controller
{
    protected $productService;
    public function __construct(ProductServiceInterface $productService)
    {
        $this->productService = $productService;
    }

    public function index()
    {
        $products = $this->productService->getAllProducts();
        return ProductResource::collection($products);
    }

    public function show(Product $product)
    {
        return new ProductResource($product);
    }

    public function store(CreateProductRequest $request)
    {
        $product = $this->productService->createProduct($request->validated());
        return (new ProductResource($product))
            ->response()
            ->setStatusCode(201);
    }
    public function update(UpdateProductRequest $request, Product $product)
    {
        $updatedProduct = $this->productService->updateProduct($product, $request->validated());
        return new ProductResource($updatedProduct);
    }

    public function destroy(Product $product)
    {
        $this->productService->deleteProduct($product);
        return response()->json([
            'message' => 'Product deleted successfully'
        ], 200);
    }
}
