const statisticsRepo = require('../repositories/statisticsRepo');

const getDashboardStats = async () => {
  const dashboardData = await statisticsRepo.getDashboardData();
  return dashboardData;
};

const getSalesChart = async (period) => {
  const salesData = await statisticsRepo.getSalesData(period);
  return salesData;
};

const getProductStats = async () => {
  const productData = await statisticsRepo.getProductStatsData();
  return productData;
};

const getOrderStats = async () => {
  const orderData = await statisticsRepo.getOrderStatsData();
  return orderData;
};

module.exports = {
  getDashboardStats,
  getSalesChart,
  getProductStats,
  getOrderStats
};