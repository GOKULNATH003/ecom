import './Order.css'
import del from '../../Assets/Gif/del.png'
export default function Order() {
    const Order = JSON.parse(localStorage.getItem("order"));
    function removeList(items) {
        Order.forEach((item, index) => {
            if (item.id === items.id) {
                Order.splice(index, 1);
                localStorage.setItem("order", JSON.stringify(Order));
                window.location.reload()
            }
        });
    }
    return (
        <div className="wishlist-layer" onClick={(e) => { e.stopPropagation() }}>
            <div className="d-flex fdc g2">{
                Order?.map((item) => {
                    return (
                        <div className="card">
                            <img src={item.thumbnail} className="card_image_layer" alt="" />
                            <p className='layer_title'>{item.title}</p>
                            <p className='layer_title'>quantity-{item.quantity}</p>
                            <p className='layer_title'>total amount- ₹{item.amount}</p>
                            <p className='layer_des'>{item.description}</p>
                            <div className='layer_price'>₹ {item.price} <sub className="text-line light_black">₹{parseInt(item?.price / (1 - item.discountPercentage / 100))}</sub><span className="color_r"> {item.discountPercentage}%  </span>offer</div>
                            <div className='layer_del'>
                                <span onClick={() => { removeList(item) }} className='pointer cancel_order'>Cancel Order</span>

                            </div>
                        </div>
                    )
                })
            }

            </div>
            <div>
                {Order.length <= 0 &&
                    <p>No data Found</p>

                }
            </div>
        </div>
    )
}