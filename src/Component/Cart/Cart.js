import './Cart.css'
import del from '../../Assets/Gif/del.png'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
export default function Cart({setCart}) {
    const navigator=useNavigate()
    const cartData = JSON.parse(localStorage.getItem("cart"));
    const [cart,setCartdata]=useState(cartData)
    function removeList(items) {
        cart.forEach((item, index) => {
            if (item.id === items.id) {
                cart.splice(index, 1);
                localStorage.setItem("cart", JSON.stringify(cart));
                setCartdata(JSON.parse(localStorage.getItem("cart")))
            }
        });
    }
    function handleVIewroduct(item) {
        localStorage.setItem("DisplayProd", JSON.stringify(item))
        navigator("/displayproduct")
        setCart(false)
    }
    return (
        <div className="wishlist-layer" onClick={(e) => { e.stopPropagation() }}>
            <h1 className='text-center text_white'>Cart</h1>
            <div className="d-flex fdc g2">{
                cart?.map((item) => {
                    return (
                        <div className="card" onClick={() => { handleVIewroduct(item) }} >
                            <img src={item.thumbnail} className="card_image_layer" alt="" />
                            <p className='layer_title'>{item.title}</p>
                            <p className='layer_des'>{item.description}</p>
                            <div className='layer_price'>₹ {item.price} <sub className="text-line light_black">₹{parseInt(item?.price / (1 - item.discountPercentage / 100))}</sub><span className="color_r"> {item.discountPercentage}%  </span>offer</div>
                            <div className='layer_del' onClick={e=>e.stopPropagation()}>
                                <img className="pointer del_img" src={del} onClick={() => { removeList(item) }} alt="" />
                            </div>
                        </div>
                    )
                })
            }

            </div>
            <div>
                {cart.length <= 0 &&
                    <p className='text_white'>No data Found</p>

                }
            </div>
        </div>
    )
}