<?php

namespace App\Http\Requests\Discount;

use App\Http\Requests\BaseRequest;
use Illuminate\Validation\Rule;

class CreateDiscountRequest extends BaseRequest
{
    public function rules()
    {
        return [
            'code' => [
                'required',
                'string',
                'max:50',
                Rule::unique('discounts', 'code')->ignore($this->id) // ignore khi update
            ],

            'description' => ['nullable', 'string', 'max:255'],

            'type' => ['required', Rule::in(['percent', 'fixed'])],

            'value' => ['required', 'numeric', 'min:1'],

            'min_order_value' => ['nullable', 'numeric', 'min:0'],

            'max_discount' => ['nullable', 'numeric', 'min:0'],

            'usage_limit' => ['nullable', 'integer', 'min:0'],

            'used' => ['nullable', 'integer', 'min:0'],

            'start_date' => ['required', 'date'],

            'end_date' => ['required', 'date', 'after_or_equal:start_date'],

            'is_active' => ['boolean'],
        ];
    }

    public function messages()
    {
        return [
            'code.required' => 'Mã giảm giá không được để trống.',
            'code.unique' => 'Mã giảm giá này đã tồn tại.',
            'type.required' => 'Vui lòng chọn kiểu giảm giá.',
            'value.required' => 'Vui lòng nhập giá trị giảm.',
            'value.min' => 'Giá trị giảm phải lớn hơn 0.',
            'start_date.required' => 'Vui lòng chọn ngày bắt đầu.',
            'end_date.required' => 'Vui lòng chọn ngày kết thúc.',
            'end_date.after_or_equal' => 'Ngày kết thúc phải sau hoặc bằng ngày bắt đầu.',
        ];
    }
}
