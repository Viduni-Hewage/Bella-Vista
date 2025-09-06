// import React, { useEffect, useState } from "react";
// import { Table, Spin, message } from "antd";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useAuth0 } from "@auth0/auth0-react";

// const SummaryPage = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { getAccessTokenSilently, user } = useAuth0();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const roles = user?.["https://bella-vista-api/roles"] || [];
//         if (!roles.includes("Admin")) {
//           message.error("Access denied");
//           navigate("/");
//           return;
//         }

//         const token = await getAccessTokenSilently();
//         const res = await axios.get("https://localhost:5000/api/orders/summary", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         setOrders(res.data.orders);
//         setLoading(false);
//       } catch (error) {
//         console.error(error);
//         message.error("Failed to fetch orders");
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, [getAccessTokenSilently, user, navigate]);

//   const columns = [
//     { title: "Order ID", dataIndex: "_id", key: "_id" },
//     { title: "User ID", dataIndex: "userId", key: "userId" },
//     { title: "NIC", dataIndex: "nic", key: "nic" },
//     { title: "Phone", dataIndex: "phone", key: "phone" },
//     { title: "Address", dataIndex: "address", key: "address" },
//     { title: "Total Amount", dataIndex: "totalAmount", key: "totalAmount" },
//     { title: "Payment Method", dataIndex: "paymentMethod", key: "paymentMethod" },
//     { title: "Status", dataIndex: "status", key: "status" },
//     {
//       title: "Created At",
//       dataIndex: "createdAt",
//       key: "createdAt",
//       render: (text) => new Date(text).toLocaleString(),
//     },
//   ];

//   if (loading) return <Spin size="large" style={{ display: "block", margin: "5rem auto" }} />;

//   return (
//     <div style={{ backgroundColor: "#fcf3eeff", minHeight: "100vh", padding: 0 }}>
//   <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px 20px" }}>
//     <h1
//       style={{
//         fontSize: "2rem",
//         margin: "3rem 2rem",
//         fontWeight: "bold",
//         fontFamily: "'Baskervville', serif",
//         color: "#9b3803ff",
//       }}
//     >
//       Order Summary
//     </h1>
//     <Table
//       dataSource={orders}
//       columns={columns}
//       rowKey="_id"
//       bordered
//       pagination={{ pageSize: 10 }}
//       style={{ backgroundColor: "#fcf3eeff", borderRadius: 0 }}
//     />
//   </div>
// </div>

//   );
// };

// export default SummaryPage;



// import React, { useEffect, useState } from "react";
// import { Table, Spin, message, Select } from "antd";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useAuth0 } from "@auth0/auth0-react";

// const { Option } = Select;

// const SummaryPage = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { getAccessTokenSilently, user } = useAuth0();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const roles = user?.["https://bella-vista-api/roles"] || [];
//         if (!roles.includes("Admin")) {
//           message.error("Access denied");
//           navigate("/");
//           return;
//         }

//         const token = await getAccessTokenSilently();
//         const res = await axios.get("https://localhost:5000/api/orders/summary", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         setOrders(res.data.orders);
//         setLoading(false);
//       } catch (error) {
//         console.error(error);
//         message.error("Failed to fetch orders");
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, [getAccessTokenSilently, user, navigate]);

//   const handleStatusChange = async (orderId, newStatus) => {
//     try {
//       const token = await getAccessTokenSilently();
//       await axios.patch(
//         `https://localhost:5000/api/orders/${orderId}/status`,
//         { status: newStatus },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       // Update table locally
//       setOrders((prev) =>
//         prev.map((order) =>
//           order._id === orderId ? { ...order, status: newStatus } : order
//         )
//       );

//       message.success("Order status updated");
//     } catch (error) {
//       console.error(error);
//       message.error("Failed to update status");
//     }
//   };

//   const columns = [
//     { title: "Order ID", dataIndex: "_id", key: "_id" },
//     { title: "User ID", dataIndex: "userId", key: "userId" },
//     { title: "NIC", dataIndex: "nic", key: "nic" },
//     { title: "Phone", dataIndex: "phone", key: "phone" },
//     { title: "Address", dataIndex: "address", key: "address" },
//     { title: "Total Amount", dataIndex: "totalAmount", key: "totalAmount" },
//     { title: "Payment Method", dataIndex: "paymentMethod", key: "paymentMethod" },
//     {
//       title: "Status",
//       dataIndex: "status",
//       key: "status",
//       render: (text, record) => (
//         <Select
//           value={text}
//           onChange={(value) => handleStatusChange(record._id, value)}
//           style={{ width: 150 }}
//         >
//           <Option value="Pending">Pending</Option>
//           <Option value="Processing">Processing</Option>
//           <Option value="Shipped">Shipped</Option>
//           <Option value="Delivered">Delivered</Option>
//           <Option value="Cancelled">Cancelled</Option>
//         </Select>
//       ),
//     },
//     {
//       title: "Created At",
//       dataIndex: "createdAt",
//       key: "createdAt",
//       render: (text) => new Date(text).toLocaleString(),
//     },
//   ];

//   if (loading)
//     return <Spin size="large" style={{ display: "block", margin: "5rem auto" }} />;

//   return (
//     <div style={{ backgroundColor: "#fcf3eeff", minHeight: "100vh", padding: 0 }}>
//       <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px 20px" }}>
//         <h1
//           style={{
//             fontSize: "2rem",
//             margin: "2rem",
//             fontWeight: "bold",
//             fontFamily: "'Baskervville', serif",
//             color: "#9b3803ff",
//           }}
//         >
//           Order Summary
//         </h1>
//         <Table
//   dataSource={orders}
//   columns={columns}
//   rowKey="_id"
//   bordered
//   pagination={{ pageSize: 10 }}
//   style={{ borderRadius: 0 }}
//   className="custom-table"
// />
//       </div>
//     </div>
//   );
// };

// export default SummaryPage;

import React, { useEffect, useState } from "react";
import { Table, Spin, message, Select } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const { Option } = Select;

const SummaryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getAccessTokenSilently, user } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const roles = user?.["https://bella-vista-api/roles"] || [];
        if (!roles.includes("Admin")) {
          message.error("Access denied");
          navigate("/");
          return;
        }

        const token = await getAccessTokenSilently();
        const res = await axios.get("https://localhost:5000/api/orders/summary", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setOrders(res.data.orders);
        setLoading(false);
      } catch (error) {
        console.error(error);
        message.error("Failed to fetch orders");
        setLoading(false);
      }
    };

    fetchOrders();
  }, [getAccessTokenSilently, user, navigate]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const token = await getAccessTokenSilently();
      await axios.patch(
        `https://localhost:5000/api/orders/${orderId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update table locally
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );

      message.success("Order status updated");
    } catch (error) {
      console.error(error);
      message.error("Failed to update status");
    }
  };

  const columns = [
    { title: "Order ID", dataIndex: "_id", key: "_id" },
    { title: "User ID", dataIndex: "userId", key: "userId" },
    { title: "NIC", dataIndex: "nic", key: "nic" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Address", dataIndex: "address", key: "address" },
    { title: "Total Amount", dataIndex: "totalAmount", key: "totalAmount" },
    { title: "Payment Method", dataIndex: "paymentMethod", key: "paymentMethod" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => (
        <Select
          value={text}
          onChange={(value) => handleStatusChange(record._id, value)}
          style={{ width: 150 }}
        >
          <Option value="pending">Pending</Option>
          <Option value="processing">Processing</Option>
          <Option value="shipped">Shipped</Option>
          <Option value="delivered">Delivered</Option>
          <Option value="cancelled">Cancelled</Option>
        </Select>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => new Date(text).toLocaleString(),
    },
  ];

  if (loading)
    return <Spin size="large" style={{ display: "block", margin: "5rem auto" }} />;

  return (
    <div style={{ backgroundColor: "#fcf3eeff", minHeight: "100vh", padding: 0 }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px 20px" }}>
        <h1
          style={{
            fontSize: "2rem",
            margin: "2rem",
            fontWeight: "bold",
            fontFamily: "'Baskervville', serif",
            color: "#9b3803ff",
            textAlign: "center"
          }}
        >
          Order Summary
        </h1>
        <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <Table
            dataSource={orders}
            columns={columns}
            rowKey="_id"
            bordered
            pagination={{ pageSize: 10 }}
            style={{ borderRadius: 0 }}
            className="custom-table"
          />
        </div>
      </div>
    </div>
  );
};

export default SummaryPage;