const statisticsService = require('../services/statisticsService');

const getDashboardStats = async (req, res) => {
  try {
    const stats = await statisticsService.getDashboardStats();
    res.status(200).json({ 
      success: true, 
      stats,
      message: 'Dashboard statistics fetched successfully'
    });
  } catch (err) {
    console.error('Dashboard stats error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

const getSalesChart = async (req, res) => {
  try {
    const { period = '7days' } = req.query; // 7days, 30days, 12months
    const chartData = await statisticsService.getSalesChart(period);
    res.status(200).json({ 
      success: true, 
      chartData,
      message: 'Sales chart data fetched successfully'
    });
  } catch (err) {
    console.error('Sales chart error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

const getProductStats = async (req, res) => {
  try {
    const productStats = await statisticsService.getProductStats();
    res.status(200).json({ 
      success: true, 
      productStats,
      message: 'Product statistics fetched successfully'
    });
  } catch (err) {
    console.error('Product stats error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

const getOrderStats = async (req, res) => {
  try {
    const orderStats = await statisticsService.getOrderStats();
    res.status(200).json({ 
      success: true, 
      orderStats,
      message: 'Order statistics fetched successfully'
    });
  } catch (err) {
    console.error('Order stats error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getDashboardStats,
  getSalesChart,
  getProductStats,
  getOrderStats
};