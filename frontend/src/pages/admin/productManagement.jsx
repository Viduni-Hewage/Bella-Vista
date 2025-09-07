import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, InputNumber, Switch, message, Spin } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const ProductManagementPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const { getAccessTokenSilently, user } = useAuth0();
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const roles = user?.["https://bella-vista-api/roles"] || [];
      if (!roles.includes("Admin")) {
        message.error("Access denied");
        navigate("/");
        return;
      }

      console.log('Fetching products for admin...');
      const token = await getAccessTokenSilently();
      
      const res = await axios.get("https://localhost:5000/api/products/admin/all", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log('Response:', res.data);
      
      if (res.data && res.data.success) {
        setProducts(res.data.products || []);
        message.success(`Loaded ${res.data.products?.length || 0} products`);
      } else {
        message.error('Failed to fetch products - Invalid response format');
        setProducts([]);
      }
    } catch (err) {
      console.error('Fetch error:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch products';
      message.error(`Error: ${errorMessage}`);
      setProducts([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      fetchProducts();
    }
  }, [user, getAccessTokenSilently, navigate]);

  const openModal = (product = null) => {
    setEditingProduct(product);
    if (product) {
      form.setFieldsValue(product);
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingProduct(null);
  };

  const handleSubmit = async (values) => {
    try {
      const token = await getAccessTokenSilently();
      
      if (editingProduct) {
        await axios.patch(`https://localhost:5000/api/products/${editingProduct._id}`, values, {
          headers: { Authorization: `Bearer ${token}` },
        });
        message.success("Product updated successfully");
      } else {
        await axios.post("https://localhost:5000/api/products", values, {
          headers: { Authorization: `Bearer ${token}` },
        });
        message.success("Product created successfully");
      }
      handleCancel();
      fetchProducts();
    } catch (err) {
      console.error(err);
      message.error(err.response?.data?.message || "Action failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = await getAccessTokenSilently();
      await axios.delete(`https://localhost:5000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      message.success("Product deleted successfully");
      fetchProducts();
    } catch (err) {
      console.error(err);
      message.error("Failed to delete product");
    }
  };

  const columns = [
    { 
      title: "Title", 
      dataIndex: "title", 
      key: "title",
      width: 200,
    },
    { 
      title: "Category", 
      dataIndex: "category", 
      key: "category",
      width: 120,
    },
    { 
      title: "Type", 
      dataIndex: "type", 
      key: "type",
      width: 120,
    },
    { 
      title: "Price", 
      dataIndex: "price", 
      key: "price",
      width: 100,
      render: (val) => `$${val?.toFixed(2) || '0.00'}`
    },
    { 
      title: "In Stock", 
      dataIndex: "inStock", 
      key: "inStock", 
      width: 100,
      render: (val) => (val ? "Yes" : "No") 
    },
    { 
      title: "New", 
      dataIndex: "isNew", 
      key: "isNew", 
      width: 80,
      render: (val) => (val ? "Yes" : "No") 
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 150,
      render: (text) => text ? new Date(text).toLocaleString() : 'N/A',
    },
    {
      title: "Actions",
      key: "actions",
      width: 150,
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => openModal(record)}>Edit</Button>
          <Button type="link" danger onClick={() => handleDelete(record._id)}>Delete</Button>
        </>
      )
    }
  ];

  if (loading) {
    return <Spin size="large" style={{ display: "block", margin: "5rem auto" }} />;
  }

  return (
    <div style={{ backgroundColor: "white", padding: "40px", margin: "-1.5rem" }}>
      <h2
        style={{
          fontSize: "2rem",
          fontFamily: "'Baskervville', serif",
          color: "#9b3803ff",
          textAlign: "Left",
          marginBottom: "2rem",
        }}
      >
        Product Management
      </h2>
      
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={() => openModal()} style={{ marginRight: 8 }}>
          Add Product
        </Button>
        <Button onClick={fetchProducts} disabled={loading}>
          Refresh
        </Button>
      </div>

      <Table 
        columns={columns} 
        dataSource={products} 
        rowKey="_id" 
        loading={loading}
        bordered
        scroll={{ x: 800 }}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} products`,
        }}
      />

      <Modal
        title={editingProduct ? "Edit Product" : "Add Product"}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item name="title" label="Title" rules={[{ required: true, message: "Title is required" }]}>
            <Input />
          </Form.Item>

          <Form.Item name="description" label="Description" rules={[{ required: true, message: "Description is required" }]}>
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item name="image" label="Image URL" rules={[{ required: true, message: "Image URL is required" }]}>
            <Input />
          </Form.Item>

          <Form.Item name="price" label="Price" rules={[{ required: true, type: "number", min: 0.01, message: "Price must be > 0" }]}>
            <InputNumber style={{ width: "100%" }} min={0.01} step={0.01} />
          </Form.Item>

          <Form.Item name="category" label="Category" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="type" label="Type" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <div style={{ display: 'flex', gap: '20px' }}>
            <Form.Item name="inStock" label="In Stock" valuePropName="checked">
              <Switch />
            </Form.Item>

            <Form.Item name="isNew" label="Is New" valuePropName="checked">
              <Switch />
            </Form.Item>
          </div>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }} size="large">
              {editingProduct ? "Update Product" : "Add Product"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductManagementPage;