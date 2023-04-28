import './Whishlist.css'
import del from '../../Assets/Gif/del.png'
import { useNavigate } from 'react-router-dom';
export default function Whishlist({setFav}) {
    const navigator=useNavigate()
    const wishlist = JSON.parse(localStorage.getItem("wishlister"));
    function removeList(items) {
        wishlist.forEach((item, index) => {
            if (item.id === items.id) {
                wishlist.splice(index, 1);
                localStorage.setItem("wishlister", JSON.stringify(wishlist));
                window.location.reload()
            }
        });
    }
    function handleVIewroduct(item) {
        localStorage.setItem("DisplayProd", JSON.stringify(item))
        navigator("/displayproduct")
        setFav(false)
    }
    return (
        <div className="wishlist-layer" onClick={(e) => { e.stopPropagation() }}>
            <div className="d-flex fdc g2  ">{
                wishlist?.map((item) => {
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
                {wishlist.length <= 0 &&
                    <p>No data Found</p>

                }
            </div>
        </div>
    )
}