import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const CartItem = ({ item, qtyChangeHandler, removeHandler, toggleSelect }) => {
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
        position: "relative",
      }}
    >
      {/* Checkbox */}
      <input
        type="checkbox"
        checked={item.selected || false}
        onChange={() => toggleSelect(item._id)}
        style={{ position: "absolute", top: "10px", left: "10px", transform: "scale(1.3)", }}
      />

      <Link to={`/product/${item._id}`} style={{ flex: "0 0 80px", marginRight: "1rem" }}>
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
      </Link>

      <div style={{ flex: 1 }}>
        <Link to={`/product/${item._id}`} style={{ textDecoration: "none", color: "black" }}>
          <h4 style={{ margin: 0, fontSize: "1.1rem" }}>{item.title}</h4>
        </Link>
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
