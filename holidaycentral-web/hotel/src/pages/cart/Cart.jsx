import React from "react";
import Navbar from "../../components/navbar/Navbar";
import { ReserveContext } from "../../context/ReserveContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import "./cart.css";

const Cart = () => {
  const { cartItems } = useContext(ReserveContext);
  const { cartCount, addToCart, removeItem, total } =
    useContext(ReserveContext);

  console.log(cartItems);

  return (
    <div>
      <Navbar />
      <div>
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cartItems.map((item) => (
            <div key={item._id} className="cart-item">
              <h2 className="p1">{item.title}</h2>
              <p className="p2">Price: ${item.price}</p>
              <p className="p3">Descriptiohn: {item.description}</p>
              <p className="p4">Max People: {item.maxPeople}</p>

              <button className="btn" onClick={() => removeItem(item)}>
                Remove Item
              </button>
            </div>
          ))
        )}
        <Link to="/">
          <button className="btnCheckout">Checkout</button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
