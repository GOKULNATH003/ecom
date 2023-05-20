import "./Header.css";
import wishlist from "../../Assets/Gif/heart.jpg";
import cartimg from "../../Assets/Gif/cart.png";
import logo from "../../Assets/Gif/logo.png";
import box from "../../Assets/Gif/box.png";
import categoryimg from "../../Assets/Gif/category.png";
import Whishlist from "../Wishlist/Whishlist";
import { useEffect, useState } from "react";
import Cart from "../Cart/Cart";
import Category from "../Categories/Categories";
import { useNavigate } from "react-router-dom";
import Order from "../Order/Order";
export default function Header() {
  const [fav, setFav] = useState(false);
  const [cart, setCart] = useState(false);
  const [category, setcategory] = useState(false);
  const [order, setOrder] = useState(false);
  const navigator = useNavigate();

  return (
    <div className="Header_container d-flex align-center justify-between">
      <div className=" logo_cont">
        <img
          src={logo}
          alt=""
          className="pointer logo"
          onClick={() => {
            navigator("/products");
          }}
        />
      </div>

      <div className="d-flex g5  header_right_content">
        <p
          className="pointer  header_links"
          onClick={() => {
            setFav(true);
          }}
        >
          Whishlist
        </p>
        <p
          className="pointer  header_links"
          onClick={() => {
            setCart(true);
          }}
        >
          Cart
        </p>
        <p
          className="pointer  header_links"
          onClick={() => {
            setOrder(true);
          }}
        >
          Orders
        </p>
        <p
          className="pointer  header_links"
          onClick={() => {
            setcategory(true);
          }}
        >
          Category
        </p>
        {/* <img className='icon icon1' src={wishlist} onClick={() => { setFav(true) }} alt="" />
                <img className='icon' src={cartimg} onClick={() => { setCart(true) }} alt="" />
                <img className='icon' src={box} alt="" onClick={()=>{setOrder(true)}} />
                <img className="icon" src={categoryimg} alt="" onClick={() => { setcategory(true) }} /> */}
      </div>
      {fav && (
        <div
          className="wishlist_Container"
          onClick={() => {
            setFav(false);
          }}
        >
          <Whishlist setFav={setFav} />
        </div>
      )}
      {cart && (
        <div
          className="wishlist_Container"
          onClick={() => {
            setCart(false);
          }}
        >
          <Cart setCart={setCart} />
        </div>
      )}
      {category && (
        <div
          className="wishlist_Container1"
          onClick={() => {
            setcategory(false);
          }}
        >
          <Category setcategory={setcategory} />
        </div>
      )}
      {order && (
        <div
          className="wishlist_Container1"
          onClick={() => {
            setOrder(false);
          }}
        >
          <Order setOrder={setOrder} />
        </div>
      )}
    </div>
  );
}
