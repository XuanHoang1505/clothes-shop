<?php

namespace App\Http\Requests\Product;

use App\Http\Requests\BaseRequest;
use Illuminate\Support\Str;

class CreateProductRequest extends BaseRequest
{
    public function rules(): array
    {
        return [
            // Basic info
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:products,slug',
            'description' => 'nullable|string',
            'sku' => 'required|string|max:100|unique:products,sku',
            'barcode' => 'nullable|string|max:100',
            
            // Category (Embedded object)
            'category' => 'required|array',
            'category.name' => 'required|string|max:255',
            'category.slug' => 'required|string|max:255',
            'category.parent' => 'nullable|string|max:255',
            
            // Brand (Embedded object)
            'brand' => 'required|array',
            'brand.name' => 'required|string|max:255',
            'brand.slug' => 'required|string|max:255',
            'brand.country' => 'nullable|string|max:100',
            'brand.logo' => 'nullable|url',
            
            // Pricing
            'price' => 'required|numeric|min:0',
            'compare_price' => 'nullable|numeric|min:0|gte:price',
            'cost_price' => 'nullable|numeric|min:0',
            
            // Inventory
            'stock' => 'nullable|integer|min:0',
            
            // Images (Array of objects)
            'images' => 'nullable|array',
            'images.*.url' => 'required|url',
            'images.*.alt' => 'nullable|string|max:255',
            'images.*.is_primary' => 'nullable|boolean',
            'images.*.order' => 'nullable|integer|min:1',
            
            // Variants (Array of objects)
            'variants' => 'nullable|array',
            'variants.*.sku' => 'required|string|max:100|distinct',
            'variants.*.size' => 'required|string|max:50',
            'variants.*.color' => 'required|string|max:50',
            'variants.*.color_code' => 'nullable|string|max:20',
            'variants.*.stock' => 'required|integer|min:0',
            'variants.*.price' => 'required|numeric|min:0',
            'variants.*.weight' => 'nullable|integer|min:0',
            
            // Product details
            'tags' => 'nullable|array',
            'tags.*' => 'string|max:50',
            'material' => 'nullable|string|max:255',
            'care_instructions' => 'nullable|string',
            
            // Dimensions
            'weight' => 'nullable|integer|min:0',
            'dimensions' => 'nullable|array',
            'dimensions.length' => 'nullable|numeric|min:0',
            'dimensions.width' => 'nullable|numeric|min:0',
            'dimensions.height' => 'nullable|numeric|min:0',
            
            // SEO
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
            'meta_keywords' => 'nullable|array',
            'meta_keywords.*' => 'string|max:100',
            
            // Status
            'is_featured' => 'nullable|boolean',
            'is_active' => 'nullable|boolean',
            'is_new' => 'nullable|boolean',
            'is_bestseller' => 'nullable|boolean',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Tên sản phẩm là bắt buộc',
            'sku.required' => 'Mã SKU là bắt buộc',
            'sku.unique' => 'Mã SKU đã tồn tại',
            'price.required' => 'Giá sản phẩm là bắt buộc',
            'price.min' => 'Giá phải lớn hơn hoặc bằng 0',
            'compare_price.gte' => 'Giá so sánh phải lớn hơn hoặc bằng giá bán',
            'category.required' => 'Danh mục là bắt buộc',
            'category.name.required' => 'Tên danh mục là bắt buộc',
            'brand.required' => 'Thương hiệu là bắt buộc',
            'brand.name.required' => 'Tên thương hiệu là bắt buộc',
            'variants.*.sku.distinct' => 'Mã SKU của biến thể phải là duy nhất',
        ];
    }

    protected function prepareForValidation()
    {
        // Auto generate slug from name if not provided
        if (!$this->slug && $this->name) {
            $this->merge([
                'slug' => Str::slug($this->name)
            ]);
        }

        // Set default values
        $this->merge([
            'is_active' => $this->is_active ?? true,
            'is_featured' => $this->is_featured ?? false,
            'is_new' => $this->is_new ?? false,
            'is_bestseller' => $this->is_bestseller ?? false,
            'stock' => $this->stock ?? 0,
        ]);
    }
}
