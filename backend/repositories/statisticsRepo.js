const Order = require('../models/Order');
const Product = require('../models/Product');
const { 
  getDashboardPipeline, 
  getSalesChartPipeline, 
  getProductStatsPipeline,
  getOrderStatsPipeline 
} = require('../pipelines/statisticsPipeline');

const getDashboardData = async () => {
  try {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const pipeline = getDashboardPipeline(startOfToday, startOfWeek, startOfMonth);
    const [dashboardStats] = await Order.aggregate(pipeline);

    const totalProducts = await Product.countDocuments();
    const inStockProducts = await Product.countDocuments({ inStock: true });
    const outOfStockProducts = await Product.countDocuments({ inStock: false });
    const newProducts = await Product.countDocuments({ isNew: true });

    return {
      ...dashboardStats,
      products: {
        total: totalProducts,
        inStock: inStockProducts,
        outOfStock: outOfStockProducts,
        new: newProducts
      }
    };
  } catch (error) {
    console.error('Error in getDashboardData:', error);
    throw error;
  }
};

const getSalesData = async (period) => {
  try {
    const pipeline = getSalesChartPipeline(period);
    const salesData = await Order.aggregate(pipeline);
    return salesData;
  } catch (error) {
    console.error('Error in getSalesData:', error);
    throw error;
  }
};

const getProductStatsData = async () => {
  try {
    const pipeline = getProductStatsPipeline();
    const productStats = await Product.aggregate(pipeline);
    return productStats;
  } catch (error) {
    console.error('Error in getProductStatsData:', error);
    throw error;
  }
};

const getOrderStatsData = async () => {
  try {
    const pipeline = getOrderStatsPipeline();
    const orderStats = await Order.aggregate(pipeline);
    return orderStats;
  } catch (error) {
    console.error('Error in getOrderStatsData:', error);
    throw error;
  }
};

module.exports = {
  getDashboardData,
  getSalesData,
  getProductStatsData,
  getOrderStatsData
};
