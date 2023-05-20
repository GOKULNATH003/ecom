import './Order.css'
import { useState } from 'react';
export default function Order() {
    const OrderData = JSON.parse(localStorage.getItem("order"));
    const [Order, setOrder] = useState(OrderData)
    function removeList(items) {
        Order.forEach((item, index) => {
            if (item.id === items.id) {
                Order.splice(index, 1);
                localStorage.setItem("order", JSON.stringify(Order));
                setOrder(JSON.parse(localStorage.getItem("order")))
            }
        });
    }
    return (
        <div className="wishlist-layer" onClick={(e) => { e.stopPropagation() }}>
            <h1 className='text-center text_white'>Orders</h1>
            <div className="d-flex fdc g2">{
                Order?.map((item) => {
                    return (
                        <div className="card">
                            <img src={item.thumbnail} className="card_image_layer" alt="" />
                            <p className='layer_title'>{item.title}</p>
                            <p className='layer_title'>quantity-{item.quantity}
                                <br />
                                total amount- ₹{item.amount}
                            </p>
                            <p className='layer_des'>{item.description}</p>
                            <div className='layer_price'>₹ {item.price} <sub className="text-line light_black">₹{parseInt(item?.price / (1 - item.discountPercentage / 100))}</sub><span className="color_r"> {item.discountPercentage}%  </span>offer</div>
                            <div className='layer_del' onClick={e => e.stopPropagation()}>
                                <span onClick={() => { removeList(item) }} className='pointer cancel_order'>Cancel Order</span>

                            </div>
                        </div>
                    )
                })
            }

            </div>
            <div>
                {Order.length <= 0 &&
                    <p className='text_white'>No data Found</p>

                }
            </div>
        </div>
    )
}