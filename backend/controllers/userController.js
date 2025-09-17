const axios = require("axios");

const getMgmtToken = async () => {
  try {
    console.log("🔄 Requesting Management API token...");
    console.log("Domain:", process.env.AUTH0_DOMAIN);
    console.log("Client ID:", process.env.M2M_CLIENT_ID ? "Set" : "Missing");
    console.log("Client Secret:", process.env.M2M_CLIENT_SECRET ? "Set" : "Missing");

    const { data } = await axios.post(
      `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
      {
        client_id: process.env.M2M_CLIENT_ID,
        client_secret: process.env.M2M_CLIENT_SECRET,
        audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
        grant_type: "client_credentials",
      }
    );
    console.log("Management API token obtained successfully");
    return data.access_token;
  } catch (error) {
    console.error("Failed to get Management API token:");
    console.error("Status:", error.response?.status);
    console.error("Data:", error.response?.data);
    console.error("Message:", error.message);
    throw error;
  }
};

const getAllUsers = async (req, res) => {
  try {
    const token = await getMgmtToken();

    const { data } = await axios.get(
      `https://${process.env.AUTH0_DOMAIN}/api/v2/users`,
      {
        headers: { Authorization: `Bearer ${token}` },
        params: { include_totals: true, search_engine: 'v3' }
      }
    );

    const users = data.users || data;

    const usersWithRoles = await Promise.all(
      users.map(async (user) => {
        try {
          const userRoles = await axios.get(
            `https://${process.env.AUTH0_DOMAIN}/api/v2/users/${encodeURIComponent(user.user_id)}/roles`,
            { headers: { Authorization: `Bearer ${token}` } }
          );

          return {
            ...user,
            roles: userRoles.data.map(role => role.name)
          };
        } catch (err) {
          console.warn(`Failed to fetch roles for ${user.user_id}:`, err.message);
          return { ...user, roles: [] };
        }
      })
    );

    res.json({ success: true, users: usersWithRoles });
  } catch (err) {
    console.error("Error fetching users:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

const getRoleMapping = async (token) => {
  try {
    const { data } = await axios.get(
      `https://${process.env.AUTH0_DOMAIN}/api/v2/roles`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    
    const roleMap = {};
    data.forEach(role => {
      roleMap[role.name] = role.id;
    });
    
    console.log("Available roles:", roleMap);
    return roleMap;
  } catch (error) {
    console.error("Error fetching roles:", error.response?.data);
    throw error;
  }
};

const blockUser = async (req, res) => {
  const { userId } = req.params;
  try {
    console.log(`🔄 Blocking user: ${userId}`);
    const token = await getMgmtToken();
    
    await axios.patch(
      `https://${process.env.AUTH0_DOMAIN}/api/v2/users/${encodeURIComponent(userId)}`,
      { blocked: true },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    
    console.log("User blocked successfully");
    res.json({ success: true, message: "User blocked" });
  } catch (err) {
    console.error("Error blocking user:");
    console.error("Status:", err.response?.status);
    console.error("Data:", err.response?.data);
    console.error("Message:", err.message);
    
    res.status(500).json({ 
      success: false, 
      message: err.response?.data?.message || err.message || "Failed to block user"
    });
  }
};

const unblockUser = async (req, res) => {
  const { userId } = req.params;
  try {
    console.log(`Unblocking user: ${userId}`);
    const token = await getMgmtToken();
    
    await axios.patch(
      `https://${process.env.AUTH0_DOMAIN}/api/v2/users/${encodeURIComponent(userId)}`,
      { blocked: false },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    
    console.log("User unblocked successfully");
    res.json({ success: true, message: "User unblocked" });
  } catch (err) {
    console.error("Error unblocking user:");
    console.error("Status:", err.response?.status);
    console.error("Data:", err.response?.data);
    console.error("Message:", err.message);
    
    res.status(500).json({ 
      success: false, 
      message: err.response?.data?.message || err.message || "Failed to unblock user"
    });
  }
};

const deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    console.log(`🔄 Deleting user: ${userId}`);
    const token = await getMgmtToken();
    
    await axios.delete(
      `https://${process.env.AUTH0_DOMAIN}/api/v2/users/${encodeURIComponent(userId)}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    
    console.log("User deleted successfully");
    res.json({ success: true, message: "User deleted" });
  } catch (err) {
    console.error("Error deleting user:");
    console.error("Status:", err.response?.status);
    console.error("Data:", err.response?.data);
    console.error("Message:", err.message);
    
    res.status(500).json({ 
      success: false, 
      message: err.response?.data?.message || err.message || "Failed to delete user"
    });
  }
};

module.exports = {
  getAllUsers,
  blockUser,
  unblockUser,
  deleteUser,
};