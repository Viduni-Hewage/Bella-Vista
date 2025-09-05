import { FaTrash } from "react-icons/fa";

const CartItem = ({ item, qtyChangeHandler, removeHandler }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        border: "2px solid rgba(0,0,0,0.2)",
        borderRadius: 9,
        padding: "1.5rem 2rem",
        margin: "2rem",
      }}
    >
      <div style={{ flex: "0 0 80px", marginRight: "1rem" }}>
        <img
          src={item.image}
          alt={item.title}
          style={{
            width: "80px",
            height: "80px",
            objectFit: "contain",
            borderRadius: 5,
            border: "1px solid #ccc",
          }}
        />
      </div>

      <div style={{ flex: 1 }}>
        <h4 style={{ margin: 0, fontSize: "1.1rem" }}>{item.title}</h4>
        <p style={{ margin: "5px 0 0 0" }}>${item.price}</p>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <input
          type="number"
          min="1"
          value={item.qty}
          onChange={(e) => qtyChangeHandler(item._id, Number(e.target.value))}
          style={{ width: "50px" }}
        />
        <FaTrash
          onClick={removeHandler}
          style={{ color: "#9b3803ff", cursor: "pointer", fontSize: "18px" }}
        />
      </div>
    </div>
  );
};

export default CartItem;
