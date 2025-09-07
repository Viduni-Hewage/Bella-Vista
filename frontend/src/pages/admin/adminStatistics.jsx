import React, { useEffect, useState } from "react";
import { 
  Card, 
  Row, 
  Col, 
  Statistic, 
  Spin, 
  message, 
  Select, 
  Divider,
  Progress,
  Table,
  Tag,
  Button
} from "antd";
import {
  DollarOutlined,
  ShoppingCartOutlined,
  AppstoreOutlined,
  TrophyOutlined,
  ReloadOutlined
} from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const { Option } = Select;

const StatisticsPage = () => {
  const [loading, setLoading] = useState(true);
  const [dashboardStats, setDashboardStats] = useState({});
  const [salesChartData, setSalesChartData] = useState([]);
  const [productStats, setProductStats] = useState([]);
  const [orderStats, setOrderStats] = useState({});
  const [chartPeriod, setChartPeriod] = useState('7days');
  
  const { getAccessTokenSilently, user } = useAuth0();
  const navigate = useNavigate();

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  const fetchAllStats = async () => {
    setLoading(true);
    try {
      const roles = user?.["https://bella-vista-api/roles"] || [];
      if (!roles.includes("Admin")) {
        message.error("Access denied");
        navigate("/");
        return;
      }

      const token = await getAccessTokenSilently();
      const headers = { Authorization: `Bearer ${token}` };

      const [dashboardRes, salesRes, productRes, orderRes] = await Promise.all([
        axios.get("https://localhost:5000/api/statistics/admin/dashboard", { headers }),
        axios.get(`https://localhost:5000/api/statistics/admin/sales-chart?period=${chartPeriod}`, { headers }),
        axios.get("https://localhost:5000/api/statistics/admin/product-stats", { headers }),
        axios.get("https://localhost:5000/api/statistics/admin/order-stats", { headers })
      ]);

      setDashboardStats(dashboardRes.data.stats || {});
      setSalesChartData(salesRes.data.chartData || []);
      setProductStats(productRes.data.productStats?.[0] || {});
      setOrderStats(orderRes.data.orderStats?.[0] || {});

      message.success('Statistics loaded successfully');
    } catch (err) {
      console.error('Fetch error:', err);
      message.error('Failed to fetch statistics');
    }
    setLoading(false);
  };

  const fetchSalesChart = async (period) => {
    try {
      const token = await getAccessTokenSilently();
      const res = await axios.get(`https://localhost:5000/api/statistics/admin/sales-chart?period=${period}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSalesChartData(res.data.chartData || []);
    } catch (err) {
      console.error('Sales chart error:', err);
      message.error('Failed to fetch sales chart data');
    }
  };

  useEffect(() => {
    if (user) {
      fetchAllStats();
    }
  }, [user, getAccessTokenSilently, navigate]);

  useEffect(() => {
    if (user && chartPeriod) {
      fetchSalesChart(chartPeriod);
    }
  }, [chartPeriod]);

  const prepareStatusData = () => {
    if (!orderStats.statusDistribution) return [];
    return orderStats.statusDistribution.map(item => ({
      name: item._id || 'Unknown',
      value: item.count,
      revenue: item.totalValue || 0
    }));
  };

  const preparePaymentData = () => {
    if (!orderStats.paymentMethods) return [];
    return orderStats.paymentMethods.map(item => ({
      name: item._id || 'Unknown',
      orders: item.count,
      revenue: item.totalValue || 0
    }));
  };

  const prepareCategoryData = () => {
    if (!productStats.categoryStats) return [];
    return productStats.categoryStats.map((item, index) => ({
      key: index,
      category: item._id || 'Unknown',
      total: item.count,
      inStock: item.inStock,
      outOfStock: item.outOfStock,
      avgPrice: item.averagePrice?.toFixed(2) || 0
    }));
  };

  const categoryColumns = [
    { title: 'Category', dataIndex: 'category', key: 'category' },
    { title: 'Total Products', dataIndex: 'total', key: 'total' },
    { title: 'In Stock', dataIndex: 'inStock', key: 'inStock', render: (val) => <Tag color="green">{val}</Tag> },
    { title: 'Out of Stock', dataIndex: 'outOfStock', key: 'outOfStock', render: (val) => <Tag color="red">{val}</Tag> },
    { title: 'Avg Price', dataIndex: 'avgPrice', key: 'avgPrice', render: (val) => `$${val}` }
  ];

  if (loading) {
    return <Spin size="large" style={{ display: "block", margin: "5rem auto" }} />;
  }

  return (
    <div style={{ backgroundColor: "white", padding: "40px", margin: "-1.5rem" }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2
          style={{
            fontSize: "2rem",
            fontFamily: "'Baskervville', serif",
            color: "#9b3803ff",
            margin: 0
          }}
        >
          Statistics Dashboard
        </h2>
        <Button 
          type="primary" 
          icon={<ReloadOutlined />}
          onClick={fetchAllStats}
          loading={loading}
        >
          Refresh Data
        </Button>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: '2rem' }}>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{border:"1px solid #c5c5c5ff" }}>
            <Statistic
              title="Total Revenue"
              value={dashboardStats.totalRevenue || 0}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix={<DollarOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{border:"1px solid #c5c5c5ff" }}>
            <Statistic
              title="Total Orders"
              value={dashboardStats.totalOrders || 0}
              valueStyle={{ color: '#1890ff' }}
              prefix={<ShoppingCartOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{border:"1px solid #c5c5c5ff" }}>
            <Statistic
              title="Total Products"
              value={dashboardStats.products?.total || 0}
              valueStyle={{ color: '#722ed1' }}
              prefix={<AppstoreOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{border:"1px solid #c5c5c5ff" }}>
            <Statistic
              title="Avg Order Value"
              value={dashboardStats.averageOrderValue || 0}
              precision={2}
              valueStyle={{ color: '#fa8c16' }}
              prefix={<TrophyOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: '2rem' }}>
        <Col xs={24} sm={8}>
          <Card title="Today's Performance" size="small" style={{border:"1px solid #e3e3e3ff" }}>
            <Statistic
              title="Orders"
              value={dashboardStats.todayOrders || 0}
              valueStyle={{ color: '#1890ff' }}
            />
            <Statistic
              title="Revenue"
              value={dashboardStats.todayRevenue || 0}
              precision={2}
              prefix="$"
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card title="This Week" size="small" style={{border:"1px solid #e3e3e3ff" }}>
            <Statistic
              title="Orders"
              value={dashboardStats.weekOrders || 0}
              valueStyle={{ color: '#1890ff' }}
            />
            <Statistic
              title="Revenue"
              value={dashboardStats.weekRevenue || 0}
              precision={2}
              prefix="$"
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card title="This Month" size="small" style={{border:"1px solid #e3e3e3ff" }}>
            <Statistic
              title="Orders"
              value={dashboardStats.monthOrders || 0}
              valueStyle={{ color: '#1890ff' }}
            />
            <Statistic
              title="Revenue"
              value={dashboardStats.monthRevenue || 0}
              precision={2}
              prefix="$"
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: '2rem' }}>
        <Col xs={24} lg={12}>
          <Card title="Inventory Status" style={{border:"1px solid #e3e3e3ff" }}>
            <Row gutter={16}>
              <Col span={12}>
                <div style={{ textAlign: 'center' }}>
                  <Progress
                    type="dashboard"
                    percent={Math.round((dashboardStats.products?.inStock || 0) / (dashboardStats.products?.total || 1) * 100)}
                    format={() => `${dashboardStats.products?.inStock || 0}`}
                  />
                  <p>In Stock</p>
                </div>
              </Col>
              <Col span={12}>
                <div style={{ textAlign: 'center' }}>
                  <Progress
                    type="dashboard"
                    percent={Math.round((dashboardStats.products?.outOfStock || 0) / (dashboardStats.products?.total || 1) * 100)}
                    status="exception"
                    format={() => `${dashboardStats.products?.outOfStock || 0}`}
                  />
                  <p>Out of Stock</p>
                </div>
              </Col>
            </Row>
            <Divider />
            <div style={{ textAlign: 'center' }}>
              <Tag color="blue">New Products: {dashboardStats.products?.new || 0}</Tag>
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Order Status Distribution" style={{border:"1px solid #e3e3e3ff" }}>
            <div style={{ padding: '20px 0' }}>
              {prepareStatusData().map((item, index) => (
                <div key={item.name} style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontWeight: 500 }}>{item.name}</span>
                    <span>{item.value} orders</span>
                  </div>
                  <Progress 
                    percent={Math.round((item.value / (dashboardStats.totalOrders || 1)) * 100)}
                    strokeColor={COLORS[index % COLORS.length]}
                    showInfo={true}
                  />
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: '2rem' }}>
        <Col span={24}>
          <Card style={{border:"1px solid #e3e3e3ff" }}
            title="Sales Trends"
            extra={
              <Select
                value={chartPeriod}
                onChange={setChartPeriod}
                style={{ width: 120 }}
              >
                <Option value="7days">7 Days</Option>
                <Option value="30days">30 Days</Option>
                <Option value="12months">12 Months</Option>
              </Select>
            }
          >
            <div style={{ padding: '20px 0' }}>
              <Row gutter={16}>
                {salesChartData.slice(0, 8).map((item, index) => (
                  <Col xs={12} sm={8} md={6} lg={3} key={item.date || index}>
                    <Card size="small" style={{ textAlign: 'center', marginBottom: '16px', border:"1px solid #e3e3e3ff" }}>
                      <Statistic
                        title={item.date}
                        value={item.revenue}
                        precision={2}
                        prefix="$"
                        valueStyle={{ fontSize: '16px', color: '#3f8600' }}
                      />
                      <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
                        {item.orders} orders
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
              {salesChartData.length > 8 && (
                <div style={{ textAlign: 'center', marginTop: '16px', color: '#666', border:"1px solid #e3e3e3ff"  }}>
                  Showing latest 8 data points out of {salesChartData.length} total
                </div>
              )}
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: '2rem' }}>
        <Col xs={24} lg={12}>
          <Card title="Payment Methods" style={{border:"1px solid #e3e3e3ff" }}>
            <div style={{ padding: '20px 0' }}>
              {preparePaymentData().map((item, index) => (
                <div key={item.name} style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontWeight: 500 }}>{item.name}</span>
                    <span>{item.orders} orders - ${item.revenue?.toFixed(2) || '0.00'}</span>
                  </div>
                  <Progress 
                    percent={Math.round((item.orders / (dashboardStats.totalOrders || 1)) * 100)}
                    strokeColor={COLORS[index % COLORS.length]}
                    showInfo={false}
                  />
                </div>
              ))}
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Product Categories" style={{border:"1px solid #e3e3e3ff" }}>
            <Table
              dataSource={prepareCategoryData()}
              columns={categoryColumns}
              pagination={{ pageSize: 5 }}
              size="small"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default StatisticsPage;