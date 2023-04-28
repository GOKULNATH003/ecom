import './Cart.css'
import del from '../../Assets/Gif/del.png'
import { useNavigate } from 'react-router-dom';
export default function Cart({setCart}) {
    const navigator=useNavigate()
    const cart = JSON.parse(localStorage.getItem("cart"));
    function removeList(items) {
        cart.forEach((item, index) => {
            if (item.id === items.id) {
                cart.splice(index, 1);
                localStorage.setItem("cart", JSON.stringify(cart));
                window.location.reload()
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
            <div className="d-flex fdc g2">{
                cart?.map((item) => {
                    return (
                        <div className="card" onClick={() => { handleVIewroduct(item) }} >
                            <img src={item.thumbnail} className="card_image_layer" alt="" />
                            <p className='layer_title'>{item.title}</p>
                            <p className='layer_des'>{item.description}</p>
                            <div className='layer_price'>₹ {item.price} <sub className="text-line light_black">₹{parseInt(item?.price / (1 - item.discountPercentage / 100))}</sub><span className="color_r"> {item.discountPercentage}%  </span>offer</div>
                            <div className='layer_del'>
                                <img className="pointer del_img" src={del} onClick={() => { removeList(item) }} alt="" />
                            </div>
                        </div>
                    )
                })
            }

            </div>
            <div>
                {cart.length <= 0 &&
                    <p>No data Found</p>

                }
            </div>
        </div>
    )
}