import React, { useEffect, useState } from "react";
import {
  Input,
  InputNumber,
  Button,
  Tabs,
  Card,
  Statistic,
  Row,
  Col,
  Table,
  Tag,
  Switch,
  Upload,
  message,
  Modal,
  Select,
  Divider,
  Typography,
  Badge,
  Spin,
  Alert,
} from "antd";
import {
  SaveOutlined,
  PlusOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  CloseCircleOutlined,
  ShoppingOutlined,
  DollarOutlined,
  PercentageOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import ProductService from "@/services/site/ProductService";
import { useParams } from "react-router-dom";

const { TextArea } = Input;
const { Title, Text } = Typography;

const ProductAdminPanel = () => {
  const { slug } = useParams();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState("basic");
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    fetchProductData();
  }, []);

  const fetchProductData = async () => {
    try {
      setLoading(true);
      const response = await ProductService.getProductBySlug(slug);
      setProduct(response.data);
    } catch (error) {
      toast.error("Không thể tải dữ liệu sản phẩm");
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field, value) => {
    setProduct((prev) => ({ ...prev, [field]: value }));
    setIsDirty(true);
  };

  const updateNestedField = (parentField, childField, value) => {
    setProduct((prev) => ({
      ...prev,
      [parentField]: {
        ...prev[parentField],
        [childField]: value,
      },
    }));
    setIsDirty(true);
  };

  const updateDimension = (dimension, value) => {
    setProduct((prev) => ({
      ...prev,
      dimensions: {
        ...prev.dimensions,
        [dimension]: value,
      },
    }));
    setIsDirty(true);
  };

  const updateVariant = (index, field, value) => {
    setProduct((prev) => {
      const newVariants = [...prev.variants];
      newVariants[index] = {
        ...newVariants[index],
        [field]: field === "stock" || field === "price" ? value || 0 : value,
      };
      return { ...prev, variants: newVariants };
    });
    setIsDirty(true);
  };

  const addVariant = () => {
    setProduct((prev) => ({
      ...prev,
      variants: [
        ...prev.variants,
        { size: "M", color: "black", stock: 0, price: product?.price || 0 },
      ],
    }));
    setIsDirty(true);
  };

  const removeVariant = (index) => {
    Modal.confirm({
      title: "Xác nhận xóa",
      content: "Bạn có chắc muốn xóa biến thể này?",
      okText: "Xóa",
      cancelText: "Hủy",
      okType: "danger",
      onOk: () => {
        setProduct((prev) => ({
          ...prev,
          variants: prev.variants.filter((_, i) => i !== index),
        }));
        setIsDirty(true);
      },
    });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = [];
    const newPreviews = [];

    files.forEach((file) => {
      // Validate
      if (!file.type.startsWith("image/")) {
        message.error(`${file.name} không phải là file ảnh`);
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        message.error(`${file.name} vượt quá 5MB`);
        return;
      }

      const previewUrl = URL.createObjectURL(file);

      validFiles.push(file);
      newPreviews.push(previewUrl);
    });

    setProduct((prev) => ({
      ...prev,
      images: [...prev.images, ...validFiles],
    }));

    setImagePreviews((prev) => [...prev, ...newPreviews]);

    // Reset input
    e.target.value = "";
  };

  const removeImage = (index) => {
    setProduct((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
    setIsDirty(true);
  };

  const handleSave = async () => {
    if (!product.name?.trim()) {
      message.error("Vui lòng nhập tên sản phẩm");
      return;
    }
    if (!product.slug?.trim()) {
      message.error("Vui lòng nhập slug");
      return;
    }
    if (product.price <= 0) {
      message.error("Giá sản phẩm phải lớn hơn 0");
      return;
    }

    try {
      setSaving(true);
      await ProductService.updateProduct(product.id, product);
      toast.success("Lưu sản phẩm thành công!");
      setIsDirty(false);
    } catch (error) {
      message.error("Có lỗi khi lưu sản phẩm");
    } finally {
      setSaving(false);
    }
  };

  if (loading || !product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spin size="large" tip="Đang tải dữ liệu..." />
      </div>
    );
  }

  const totalStock = product.variants.reduce(
    (sum, v) => sum + (v?.stock || 0),
    0
  );
  const lowStockCount = product.variants.filter(
    (v) => (v?.stock || 0) < 10 && (v?.stock || 0) > 0
  ).length;
  const outOfStockCount = product.variants.filter(
    (v) => (v?.stock || 0) === 0
  ).length;
  const discount =
    product.compare_price > 0
      ? Math.round((1 - product.price / product.compare_price) * 100)
      : 0;

  const variantColumns = [
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
      width: 100,
      render: (text, record, index) => (
        <Input
          value={text}
          onChange={(e) => updateVariant(index, "size", e.target.value)}
        />
      ),
    },
    {
      title: "Màu sắc",
      dataIndex: "color",
      key: "color",
      width: 120,
      render: (text, record, index) => (
        <Input
          value={text}
          onChange={(e) => updateVariant(index, "color", e.target.value)}
        />
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "stock",
      key: "stock",
      width: 120,
      render: (text, record, index) => (
        <InputNumber
          min={0}
          value={text}
          onChange={(value) => updateVariant(index, "stock", value)}
          style={{ width: "100%" }}
        />
      ),
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      width: 150,
      render: (text, record, index) => (
        <InputNumber
          min={0}
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
          value={text}
          onChange={(value) => updateVariant(index, "price", value)}
          style={{ width: "100%" }}
          addonAfter="đ"
        />
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "stock",
      key: "status",
      width: 150,
      render: (stock) => {
        if (stock === 0) {
          return (
            <Tag icon={<CloseCircleOutlined />} color="error">
              Hết hàng
            </Tag>
          );
        } else if (stock < 10) {
          return (
            <Tag icon={<ExclamationCircleOutlined />} color="warning">
              Sắp hết
            </Tag>
          );
        }
        return (
          <Tag icon={<CheckCircleOutlined />} color="success">
            Còn hàng
          </Tag>
        );
      },
    },
    {
      title: "",
      key: "action",
      width: 80,
      render: (_, record, index) => (
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={() => removeVariant(index)}
        />
      ),
    },
  ];

  const tabItems = [
    {
      key: "basic",
      label: "Thông tin cơ bản",
      children: (
        <div className="space-y-4">
          <Row gutter={16}>
            <Col span={12}>
              <div>
                <label className="block mb-2 font-medium">Tên sản phẩm *</label>
                <Input
                  size="large"
                  placeholder="Nhập tên sản phẩm"
                  value={product.name}
                  onChange={(e) => updateField("name", e.target.value)}
                />
              </div>
            </Col>
            <Col span={12}>
              <div>
                <label className="block mb-2 font-medium">Slug *</label>
                <Input
                  size="large"
                  placeholder="ao-thun-premium"
                  value={product.slug}
                  onChange={(e) => updateField("slug", e.target.value)}
                />
              </div>
            </Col>
          </Row>

          <div>
            <label className="block mb-2 font-medium">Mô tả sản phẩm</label>
            <TextArea
              rows={4}
              placeholder="Nhập mô tả chi tiết sản phẩm"
              value={product.description}
              onChange={(e) => updateField("description", e.target.value)}
            />
          </div>

          <Row gutter={16}>
            <Col span={12}>
              <div>
                <label className="block mb-2 font-medium">Giá bán *</label>
                <InputNumber
                  size="large"
                  min={0}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  style={{ width: "100%" }}
                  addonAfter="đ"
                  value={product.price}
                  onChange={(value) => updateField("price", value)}
                />
              </div>
            </Col>
            <Col span={12}>
              <div>
                <label className="block mb-2 font-medium">Giá so sánh</label>
                <InputNumber
                  size="large"
                  min={0}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  style={{ width: "100%" }}
                  addonAfter="đ"
                  value={product.compare_price}
                  onChange={(value) => updateField("compare_price", value)}
                />
              </div>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <div>
                <label className="block mb-2 font-medium">Danh mục</label>
                <Input
                  size="large"
                  placeholder="Áo thun, Quần jean..."
                  value={product.category?.name}
                  onChange={(e) =>
                    updateNestedField("category", "name", e.target.value)
                  }
                />
              </div>
            </Col>
            <Col span={12}>
              <div>
                <label className="block mb-2 font-medium">Thương hiệu</label>
                <Input
                  size="large"
                  placeholder="Nike, Adidas..."
                  value={product.brand?.name}
                  onChange={(e) =>
                    updateNestedField("brand", "name", e.target.value)
                  }
                />
              </div>
            </Col>
          </Row>
        </div>
      ),
    },
    {
      key: "details",
      label: "Chi tiết sản phẩm",
      children: (
        <div className="space-y-4">
          <div>
            <label className="block mb-2 font-medium">Chất liệu</label>
            <Input
              size="large"
              placeholder="Cotton 100%, Polyester..."
              value={product.material}
              onChange={(e) => updateField("material", e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Hướng dẫn bảo quản</label>
            <TextArea
              rows={3}
              placeholder="Giặt máy nước lạnh..."
              value={product.care_instructions}
              onChange={(e) => updateField("care_instructions", e.target.value)}
            />
          </div>

          <Divider>Kích thước</Divider>
          <Row gutter={16}>
            <Col span={8}>
              <div>
                <label className="block mb-2 font-medium">Dài</label>
                <Input
                  size="large"
                  placeholder="70cm"
                  value={product.dimensions?.length}
                  onChange={(e) => updateDimension("length", e.target.value)}
                />
              </div>
            </Col>
            <Col span={8}>
              <div>
                <label className="block mb-2 font-medium">Ngực</label>
                <Input
                  size="large"
                  placeholder="50cm"
                  value={product.dimensions?.chest}
                  onChange={(e) => updateDimension("chest", e.target.value)}
                />
              </div>
            </Col>
            <Col span={8}>
              <div>
                <label className="block mb-2 font-medium">Vai</label>
                <Input
                  size="large"
                  placeholder="45cm"
                  value={product.dimensions?.shoulder}
                  onChange={(e) => updateDimension("shoulder", e.target.value)}
                />
              </div>
            </Col>
          </Row>

          <Divider>Phong cách</Divider>
          <Row gutter={16}>
            <Col span={12}>
              <div>
                <label className="block mb-2 font-medium">Tên phong cách</label>
                <Input
                  size="large"
                  placeholder="Casual, Formal..."
                  value={product.dressStyle?.name}
                  onChange={(e) =>
                    updateNestedField("dressStyle", "name", e.target.value)
                  }
                />
              </div>
            </Col>
            <Col span={12}>
              <div>
                <label className="block mb-2 font-medium">
                  Slug phong cách
                </label>
                <Input
                  size="large"
                  placeholder="casual, formal..."
                  value={product.dressStyle?.slug}
                  onChange={(e) =>
                    updateNestedField("dressStyle", "slug", e.target.value)
                  }
                />
              </div>
            </Col>
          </Row>
        </div>
      ),
    },
    {
      key: "variants",
      label: (
        <Badge count={product.variants.length} offset={[10, 0]}>
          Biến thể & Kho
        </Badge>
      ),
      children: (
        <div>
          <div className="mb-4 flex justify-between items-center">
            <Title level={4}>Quản lý biến thể</Title>
            <Button type="primary" icon={<PlusOutlined />} onClick={addVariant}>
              Thêm biến thể
            </Button>
          </div>

          {lowStockCount > 0 && (
            <Alert
              message={`Có ${lowStockCount} biến thể sắp hết hàng`}
              type="warning"
              showIcon
              closable
              className="mb-4"
            />
          )}

          {outOfStockCount > 0 && (
            <Alert
              message={`Có ${outOfStockCount} biến thể đã hết hàng`}
              type="error"
              showIcon
              closable
              className="mb-4"
            />
          )}

          <Table
            columns={variantColumns}
            dataSource={product.variants}
            pagination={false}
            rowKey={(record, index) => index}
            bordered
          />
        </div>
      ),
    },
    {
      key: "images",
      label: (
        <Badge count={product.images.length} offset={[10, 0]}>
          Hình ảnh
        </Badge>
      ),
      children: (
        <div>
          <Title level={4} className="mb-4">
            Hình ảnh sản phẩm
          </Title>

          <Row gutter={16}>
            {product.images.map((img, index) => (
              <Col span={6} key={index}>
                <Card
                  hoverable
                  cover={
                    <img
                      alt={`Product ${index + 1}`}
                      src={img}
                      className="h-48 object-cover"
                    />
                  }
                  actions={[
                    <Button
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => removeImage(index)}
                    >
                      Xóa
                    </Button>,
                  ]}
                >
                  <Card.Meta description={`Ảnh ${index + 1}`} />
                </Card>
              </Col>
            ))}
            <Col span={6}>
              <Upload listType="picture-card" showUploadList={false}>
                <div className="flex flex-col items-center justify-center h-48">
                  <PlusOutlined className="text-2xl mb-2" />
                  <div>Thêm ảnh</div>
                </div>
              </Upload>
            </Col>
          </Row>
        </div>
      ),
    },
    {
      key: "seo",
      label: "SEO & Cài đặt",
      children: (
        <div className="space-y-4">
          <div>
            <label className="block mb-2 font-medium">Tags</label>
            <Select
              mode="tags"
              size="large"
              placeholder="Nhập tag và nhấn Enter"
              style={{ width: "100%" }}
              value={product.tags}
              onChange={(value) => updateField("tags", value)}
            />
          </div>

          <Divider>Cài đặt hiển thị</Divider>

          <Row gutter={16}>
            <Col span={12}>
              <Card>
                <div className="flex justify-between items-center">
                  <div>
                    <Title level={5} className="mb-1">
                      Sản phẩm nổi bật
                    </Title>
                    <Text type="secondary">Hiển thị ở trang chủ</Text>
                  </div>
                  <Switch
                    checked={product.is_featured}
                    onChange={(checked) => updateField("is_featured", checked)}
                  />
                </div>
              </Card>
            </Col>
            <Col span={12}>
              <Card>
                <div className="flex justify-between items-center">
                  <div>
                    <Title level={5} className="mb-1">
                      Kích hoạt
                    </Title>
                    <Text type="secondary">Hiển thị trên website</Text>
                  </div>
                  <Switch
                    checked={product.is_active}
                    onChange={(checked) => updateField("is_active", checked)}
                  />
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      ),
    },
  ];
  console.log(product);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <Card className="mb-6 shadow-sm">
          <div className="flex justify-between items-start mb-6">
            <div>
              <Title level={2} className="mb-2">
                {product.name}
              </Title>
              <Text type="secondary">ID: {product.id}</Text>
              {isDirty && (
                <div className="mt-2">
                  <Tag color="warning" icon={<ExclamationCircleOutlined />}>
                    Có thay đổi chưa lưu
                  </Tag>
                </div>
              )}
            </div>
            <Button
              type="primary"
              size="large"
              icon={saving ? <Spin size="small" /> : <SaveOutlined />}
              onClick={handleSave}
              loading={saving}
              disabled={!isDirty}
            >
              {saving ? "Đang lưu..." : "Lưu thay đổi"}
            </Button>
          </div>

          <Row gutter={16}>
            <Col span={6}>
              <Card bordered={false} className="bg-blue-50">
                <Statistic
                  title="Tổng số lượng"
                  value={totalStock}
                  prefix={<ShoppingOutlined />}
                  valueStyle={{ color: "#1890ff" }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card bordered={false} className="bg-green-50">
                <Statistic
                  title="Giá bán"
                  value={product.price}
                  prefix={<DollarOutlined />}
                  suffix="đ"
                  valueStyle={{ color: "#52c41a" }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card bordered={false} className="bg-orange-50">
                <Statistic
                  title="Giảm giá"
                  value={discount}
                  prefix={<PercentageOutlined />}
                  suffix="%"
                  valueStyle={{ color: "#fa8c16" }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card bordered={false} className="bg-red-50">
                <Statistic
                  title="Cảnh báo tồn kho"
                  value={lowStockCount + outOfStockCount}
                  prefix={<WarningOutlined />}
                  valueStyle={{ color: "#ff4d4f" }}
                />
              </Card>
            </Col>
          </Row>
        </Card>

        <Card className="shadow-sm">
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            items={tabItems}
          />
        </Card>
      </div>
    </div>
  );
};

export default ProductAdminPanel;
