const getDashboardPipeline = (startOfToday, startOfWeek, startOfMonth) => {
  return [
    {
      $facet: {
        totalStats: [
          {
            $group: {
              _id: null,
              totalOrders: { $sum: 1 },
              totalRevenue: {
                $sum: {
                  $cond: [
                    { $ne: ['$status', 'cancelled'] },
                    '$totalAmount',
                    0
                  ]
                }
              },
              averageOrderValue: {
                $avg: {
                  $cond: [
                    { $ne: ['$status', 'cancelled'] },
                    '$totalAmount',
                    null
                  ]
                }
              }
            }
          }
        ],
        todayStats: [
          {
            $match: {
              createdAt: { $gte: startOfToday }
            }
          },
          {
            $group: {
              _id: null,
              todayOrders: { $sum: 1 },
              todayRevenue: {
                $sum: {
                  $cond: [
                    { $ne: ['$status', 'cancelled'] },
                    '$totalAmount',
                    0
                  ]
                }
              }
            }
          }
        ],
        weekStats: [
          {
            $match: {
              createdAt: { $gte: startOfWeek }
            }
          },
          {
            $group: {
              _id: null,
              weekOrders: { $sum: 1 },
              weekRevenue: {
                $sum: {
                  $cond: [
                    { $ne: ['$status', 'cancelled'] },
                    '$totalAmount',
                    0
                  ]
                }
              }
            }
          }
        ],
        monthStats: [
          {
            $match: {
              createdAt: { $gte: startOfMonth }
            }
          },
          {
            $group: {
              _id: null,
              monthOrders: { $sum: 1 },
              monthRevenue: {
                $sum: {
                  $cond: [
                    { $ne: ['$status', 'cancelled'] },
                    '$totalAmount',
                    0
                  ]
                }
              }
            }
          }
        ],
        statusBreakdown: [
          {
            $group: {
              _id: '$status',
              count: { $sum: 1 }
            }
          }
        ],
        paymentMethodBreakdown: [
          {
            $group: {
              _id: '$paymentMethod',
              count: { $sum: 1 },
              revenue: {
                $sum: {
                  $cond: [
                    { $ne: ['$status', 'cancelled'] },
                    '$totalAmount',
                    0
                  ]
                }
              }
            }
          }
        ]
      }
    },
    {
      $project: {
        totalOrders: { $arrayElemAt: ['$totalStats.totalOrders', 0] },
        totalRevenue: { $arrayElemAt: ['$totalStats.totalRevenue', 0] },
        averageOrderValue: { $arrayElemAt: ['$totalStats.averageOrderValue', 0] },
        todayOrders: { $arrayElemAt: ['$todayStats.todayOrders', 0] },
        todayRevenue: { $arrayElemAt: ['$todayStats.todayRevenue', 0] },
        weekOrders: { $arrayElemAt: ['$weekStats.weekOrders', 0] },
        weekRevenue: { $arrayElemAt: ['$weekStats.weekRevenue', 0] },
        monthOrders: { $arrayElemAt: ['$monthStats.monthOrders', 0] },
        monthRevenue: { $arrayElemAt: ['$monthStats.monthRevenue', 0] },
        statusBreakdown: '$statusBreakdown',
        paymentMethodBreakdown: '$paymentMethodBreakdown'
      }
    }
  ];
};

const getSalesChartPipeline = (period) => {
  let matchStage = {};
  let groupStage = {};
  
  const now = new Date();
  
  switch (period) {
    case '7days':
      const sevenDaysAgo = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000));
      matchStage = { createdAt: { $gte: sevenDaysAgo } };
      groupStage = {
        _id: {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' },
          day: { $dayOfMonth: '$createdAt' }
        },
        date: { $first: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } } },
        orders: { $sum: 1 },
        revenue: {
          $sum: {
            $cond: [{ $ne: ['$status', 'cancelled'] }, '$totalAmount', 0]
          }
        }
      };
      break;
      
    case '30days':
      const thirtyDaysAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));
      matchStage = { createdAt: { $gte: thirtyDaysAgo } };
      groupStage = {
        _id: {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' },
          day: { $dayOfMonth: '$createdAt' }
        },
        date: { $first: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } } },
        orders: { $sum: 1 },
        revenue: {
          $sum: {
            $cond: [{ $ne: ['$status', 'cancelled'] }, '$totalAmount', 0]
          }
        }
      };
      break;
      
    case '12months':
      const twelveMonthsAgo = new Date(now.getFullYear() - 1, now.getMonth(), 1);
      matchStage = { createdAt: { $gte: twelveMonthsAgo } };
      groupStage = {
        _id: {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' }
        },
        date: { $first: { $dateToString: { format: '%Y-%m', date: '$createdAt' } } },
        orders: { $sum: 1 },
        revenue: {
          $sum: {
            $cond: [{ $ne: ['$status', 'cancelled'] }, '$totalAmount', 0]
          }
        }
      };
      break;
  }

  return [
    { $match: matchStage },
    { $group: groupStage },
    { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } },
    {
      $project: {
        _id: 0,
        date: 1,
        orders: 1,
        revenue: { $round: ['$revenue', 2] }
      }
    }
  ];
};

const getProductStatsPipeline = () => {
  return [
    {
      $facet: {
        categoryStats: [
          {
            $group: {
              _id: '$category',
              count: { $sum: 1 },
              inStock: {
                $sum: { $cond: [{ $eq: ['$inStock', true] }, 1, 0] }
              },
              outOfStock: {
                $sum: { $cond: [{ $eq: ['$inStock', false] }, 1, 0] }
              },
              averagePrice: { $avg: '$price' }
            }
          }
        ],
        typeStats: [
          {
            $group: {
              _id: '$type',
              count: { $sum: 1 },
              averagePrice: { $avg: '$price' }
            }
          }
        ],
        priceRanges: [
          {
            $bucket: {
              groupBy: '$price',
              boundaries: [0, 50, 100, 200, 500, 1000, Infinity],
              default: 'Other',
              output: {
                count: { $sum: 1 },
                products: { $push: '$title' }
              }
            }
          }
        ]
      }
    }
  ];
};

const getOrderStatsPipeline = () => {
  return [
    {
      $facet: {
        statusDistribution: [
          {
            $group: {
              _id: '$status',
              count: { $sum: 1 },
              totalValue: {
                $sum: {
                  $cond: [{ $ne: ['$status', 'cancelled'] }, '$totalAmount', 0]
                }
              }
            }
          }
        ],
        paymentMethods: [
          {
            $group: {
              _id: '$paymentMethod',
              count: { $sum: 1 },
              totalValue: {
                $sum: {
                  $cond: [{ $ne: ['$status', 'cancelled'] }, '$totalAmount', 0]
                }
              }
            }
          }
        ],
        monthlyTrends: [
          {
            $group: {
              _id: {
                year: { $year: '$createdAt' },
                month: { $month: '$createdAt' }
              },
              orders: { $sum: 1 },
              revenue: {
                $sum: {
                  $cond: [{ $ne: ['$status', 'cancelled'] }, '$totalAmount', 0]
                }
              }
            }
          },
          { $sort: { '_id.year': -1, '_id.month': -1 } },
          { $limit: 12 }
        ]
      }
    }
  ];
};

module.exports = {
  getDashboardPipeline,
  getSalesChartPipeline,
  getProductStatsPipeline,
  getOrderStatsPipeline
};