<?php

namespace App\Http\Requests\Product;

use App\Http\Requests\BaseRequest;
use Illuminate\Validation\Rule;
use Illuminate\Support\Str;

class UpdateProductRequest extends BaseRequest
{
    public function rules(): array
    {
        $productId = $this->route('product')?->_id;

        return [
            // Basic info
            'name' => 'sometimes|required|string|max:255',
            'slug' => [
                'sometimes',
                'nullable',
                'string',
                'max:255',
                Rule::unique('products', 'slug')->ignore($productId, '_id')
            ],
            'description' => 'sometimes|nullable|string',
            'sku' => [
                'sometimes',
                'required',
                'string',
                'max:100',
                Rule::unique('products', 'sku')->ignore($productId, '_id')
            ],
            'barcode' => 'sometimes|nullable|string|max:100',
            
            // Category (Embedded object)
            'category' => 'sometimes|required|array',
            'category.name' => 'required_with:category|string|max:255',
            'category.slug' => 'required_with:category|string|max:255',
            'category.parent' => 'nullable|string|max:255',
            
            // Brand (Embedded object)
            'brand' => 'sometimes|required|array',
            'brand.name' => 'required_with:brand|string|max:255',
            'brand.slug' => 'required_with:brand|string|max:255',
            'brand.country' => 'nullable|string|max:100',
            'brand.logo' => 'nullable|url',
            
            // Pricing
            'price' => 'sometimes|required|numeric|min:0',
            'compare_price' => 'sometimes|nullable|numeric|min:0',
            'cost_price' => 'sometimes|nullable|numeric|min:0',
            
            // Inventory
            'stock' => 'sometimes|nullable|integer|min:0',
            
            // Images (Array of objects)
            'images' => 'sometimes|nullable|array',
            'images.*.url' => 'required|url',
            'images.*.alt' => 'nullable|string|max:255',
            'images.*.is_primary' => 'nullable|boolean',
            'images.*.order' => 'nullable|integer|min:1',
            
            // Variants (Array of objects)
            'variants' => 'sometimes|nullable|array',
            'variants.*.sku' => 'required|string|max:100|distinct',
            'variants.*.size' => 'required|string|max:50',
            'variants.*.color' => 'required|string|max:50',
            'variants.*.color_code' => 'nullable|string|max:20',
            'variants.*.stock' => 'required|integer|min:0',
            'variants.*.price' => 'required|numeric|min:0',
            'variants.*.weight' => 'nullable|integer|min:0',
            
            // Product details
            'tags' => 'sometimes|nullable|array',
            'tags.*' => 'string|max:50',
            'material' => 'sometimes|nullable|string|max:255',
            'care_instructions' => 'sometimes|nullable|string',
            
            // Dimensions
            'weight' => 'sometimes|nullable|integer|min:0',
            'dimensions' => 'sometimes|nullable|array',
            'dimensions.length' => 'nullable|numeric|min:0',
            'dimensions.width' => 'nullable|numeric|min:0',
            'dimensions.height' => 'nullable|numeric|min:0',
            
            // SEO
            'meta_title' => 'sometimes|nullable|string|max:255',
            'meta_description' => 'sometimes|nullable|string|max:500',
            'meta_keywords' => 'sometimes|nullable|array',
            'meta_keywords.*' => 'string|max:100',
            
            // Status
            'is_featured' => 'sometimes|nullable|boolean',
            'is_active' => 'sometimes|nullable|boolean',
            'is_new' => 'sometimes|nullable|boolean',
            'is_bestseller' => 'sometimes|nullable|boolean',
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
            'category.name.required_with' => 'Tên danh mục là bắt buộc',
            'brand.name.required_with' => 'Tên thương hiệu là bắt buộc',
            'variants.*.sku.distinct' => 'Mã SKU của biến thể phải là duy nhất',
        ];
    }

    protected function prepareForValidation()
    {
        // Auto generate slug from name if name is updated but slug is not provided
        if ($this->name && !$this->slug) {
            $this->merge([
                'slug' => Str::slug($this->name)
            ]);
        }
    }
}
