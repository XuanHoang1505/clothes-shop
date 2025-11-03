<?php

namespace App\Repositories\Eloquent;

use App\Models\Product;
use App\Repositories\Interfaces\ProductRepositoryInterface;

class ProductRepository implements ProductRepositoryInterface
{
    public function getAll(int $perPage = 15)
    {
        return Product::paginate($perPage);
    }

    public function findById(string $id)
    {
        return Product::find($id);
    }

    public function findBySlug(string $slug)
    {
        return Product::where('slug', $slug)->first();
    }

    public function findByCategorySlug(string $categorySlug, int $page = 1, int $perPage = 15)
    {
        
        return Product::where('category.slug', $categorySlug)
            ->where('is_active', true)
            ->paginate($perPage, ['*'], 'page', $page);
    }

    public function findByCategoryName(string $categoryName, int $perPage = 15)
    {
        return Product::where('category.name', $categoryName)
            ->where('is_active', true)
            ->paginate($perPage);
    }

    public function findByParentCategory(string $parentName, int $perPage = 15)
    {
        return Product::where('category.parent', $parentName)
            ->where('is_active', true)
            ->paginate($perPage);
    }

    public function filter(array $filters, int $perPage = 15)
    {
        $query = Product::where('is_active', true);

        if (isset($filters['category_slug'])) {
            $query->where('category.slug', $filters['category_slug']);
        }

        if (isset($filters['category_name'])) {
            $query->where('category.name', $filters['category_name']);
        }

        if (isset($filters['parent_category'])) {
            $query->where('category.parent', $filters['parent_category']);
        }

        if (isset($filters['brand_slug'])) {
            $query->where('brand.slug', $filters['brand_slug']);
        }

        if (isset($filters['min_price'])) {
            $query->where('price', '>=', $filters['min_price']);
        }

        if (isset($filters['max_price'])) {
            $query->where('price', '<=', $filters['max_price']);
        }

        if (isset($filters['is_new']) && $filters['is_new']) {
            $query->where('is_new', true);
        }

        if (isset($filters['is_bestseller']) && $filters['is_bestseller']) {
            $query->where('is_bestseller', true);
        }

        if (isset($filters['is_featured']) && $filters['is_featured']) {
            $query->where('is_featured', true);
        }

        if (isset($filters['search'])) {
            $searchTerm = $filters['search'];
            $query->where(function($q) use ($searchTerm) {
                $q->where('name', 'regex', "/$searchTerm/i")
                  ->orWhere('description', 'regex', "/$searchTerm/i")
                  ->orWhere('tags', 'regex', "/$searchTerm/i");
            });
        }

        $sortBy = $filters['sort_by'] ?? 'created_at';
        $sortOrder = $filters['sort_order'] ?? 'desc';
        $query->orderBy($sortBy, $sortOrder);

        return $query->paginate($perPage);
    }

    public function getFeatured(int $limit = 10)
    {
        return Product::where('is_featured', true)
            ->where('is_active', true)
            ->limit($limit)
            ->get();
    }

    public function getNew(int $limit = 10)
    {
        return Product::where('is_new', true)
            ->where('is_active', true)
            ->orderBy('created_at', 'desc')
            ->limit($limit)
            ->get();
    }

    public function getBestseller(int $limit = 10)
    {
        return Product::where('is_bestseller', true)
            ->where('is_active', true)
            ->limit($limit)
            ->get();
    }

    public function getAllCategories()
    {
        return Product::raw(function($collection) {
            return $collection->distinct('category');
        });
    }

    public function getAllBrands()
    {
        return Product::raw(function($collection) {
            return $collection->distinct('brand');
        });
    }

    public function getRelatedProducts(string $productId, string $categorySlug, int $limit = 6)
    {
        return Product::where('category.slug', $categorySlug)
            ->where('_id', '!=', $productId)
            ->where('is_active', true)
            ->limit($limit)
            ->get();
    }

    public function create(array $data)
    {
        return Product::create($data);
    }

    public function update(string $id, array $data)
    {
        $product = Product::find($id);
        
        if (!$product) {
            return false;
        }

        return $product->update($data);
    }

    public function delete(string $id)
    {
        $product = Product::find($id);
        
        if (!$product) {
            return false;
        }

        return $product->update(['is_active' => false]);
    }

    public function forceDelete(string $id)
    {
        $product = Product::find($id);
        
        if (!$product) {
            return false;
        }

        return $product->delete();
    }

    public function updateStock(string $id, int $quantity)
    {
        $product = Product::find($id);
        
        if (!$product) {
            return false;
        }

        return $product->update(['stock' => $quantity]);
    }

    public function decreaseStock(string $id, int $quantity)
    {
        $product = Product::find($id);
        
        if (!$product || $product->stock < $quantity) {
            return false;
        }

        return $product->decrement('stock', $quantity);
    }

    public function increaseStock(string $id, int $quantity)
    {
        $product = Product::find($id);
        
        if (!$product) {
            return false;
        }

        return $product->increment('stock', $quantity);
    }

    public function isInStock(string $id, int $quantity = 1)
    {
        $product = Product::find($id);
        
        return $product && $product->stock >= $quantity;
    }

    public function getByPriceRange(int $minPrice, int $maxPrice, int $perPage = 15)
    {
        return Product::where('price', '>=', $minPrice)
            ->where('price', '<=', $maxPrice)
            ->where('is_active', true)
            ->paginate($perPage);
    }
}
