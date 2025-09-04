// Example: filtering by category
const applyPipeline = (category) => {
  return [
    { $match: { category: category } },
    { $sort: { createdAt: -1 } } // newest first
  ];
};

module.exports = { applyPipeline };
