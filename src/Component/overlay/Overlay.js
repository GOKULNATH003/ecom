import { useContext, useEffect } from "react";
import { NewContext } from "../../App";
import './Overlay.css'
import axios from "axios";
export default function Overlay() {


const {data,setData}=useContext(NewContext)
    const wishlist = JSON.parse(localStorage.getItem("wishlister"));
    const cart = JSON.parse(localStorage.getItem("cart"));
  
function removeCart(items){
    cart.forEach((item, index) => {
        if (item.id === items.id) {
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            window.location.reload()
        }
    });
}
function removeList(items){
    wishlist.forEach((item, index) => {
        if (item.id === items.id) {
            wishlist.splice(index, 1);
            localStorage.setItem("wishlister", JSON.stringify(wishlist));
            window.location.reload()
        }
    });
}

    return (
        <div className="overlay">
            <h1>
                Wishlist
            </h1>
            <div className="d-flex justify-center">{
                wishlist?.map((item) => {
                    return (
                        <div className="card">
                            <img src={item.thumbnail} className="card_image" alt="" />
                            <p>{item.title}</p>
                            <p>{item.description}</p>
                            <p>Price: Rs {item.price}</p>
                            <p>Discount : {item.discountPercentage} %</p>
                            <p onClick={()=>{removeList(item)}} className="pointer">Remove From list</p>
                        </div>
                    )
                })
            }

            </div>
            <h1>
                Cart
            </h1>
            <div className="d-flex justify-center">
                {
                    cart?.map((item) => {
                        return (
                            <div className="card ">
                                <img src={item.thumbnail} className="card_image" alt="" />
                                <p>{item.title}</p>
                                <p>{item.description}</p>
                                <p>Price: Rs {item.price}</p>
                                <p>Discount : {item.discountPercentage} %</p>
                                <p onClick={()=>{removeCart(item)}} className="pointer">Remove From list</p>

                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}