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
        padding: "2rem 3rem",
        margin: "2rem",
      }}
    >
      <div>
        <h4 style={{ margin: 0, fontSize:"1.1rem" }}>{item.name}</h4>
        <p style={{ margin: "5px 0 0 0" }}>${item.price}</p>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          type="number"
          min="1"
          value={item.qty}
          onChange={(e) => qtyChangeHandler(item._id, Number(e.target.value))}
          style={{ width: "50px", marginRight: "10px" }}
        />
        <FaTrash
          onClick={removeHandler}
          style={{
            color: "#9b3803ff",
            cursor: "pointer",
            fontSize: "18px",
          }}
        />
      </div>
    </div>
  );
};

export default CartItem;
