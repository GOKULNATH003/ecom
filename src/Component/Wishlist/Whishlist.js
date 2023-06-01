import './Whishlist.css'
import del from '../../Assets/Gif/del.png'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
export default function Whishlist({ setFav }) {
    const navigator = useNavigate()
    let wishlistData = JSON.parse(localStorage.getItem("wishlister"));
    const [wishlist, setWishlist] = useState(wishlistData)
    function removeList(items) {
        wishlist.forEach((item, index) => {
            if (item.id === items.id) {
                wishlist.splice(index, 1);
                localStorage.setItem("wishlister", JSON.stringify(wishlist));
                setWishlist(JSON.parse(localStorage.getItem("wishlister")));

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
            <h1 className='text-center text_white'>Wishlist</h1>
            <div className="d-flex fdc g3  ">{
                wishlist?.map((item) => {
                    return (
                        <div className="card" onClick={() => { handleVIewroduct(item) }} >
                            <img src={item.thumbnail} className="card_image_layer" alt="" />
                            <p className='layer_title'>{item.title}</p>
                            <p className='layer_des'>{item.description}</p>
                            <div className='layer_price'>₹ {item.price} <sub className="text-line light_black">₹{parseInt(item?.price / (1 - item.discountPercentage / 100))}</sub><span className="color_r"> {item.discountPercentage}%  </span>offer</div>
                            <div className='layer_del' onClick={e => e.stopPropagation()} >
                                <img className="pointer del_img" src={del} onClick={() => { removeList(item) }} alt="" />
                            </div>
                        </div>
                    )
                })
            }

            </div>
            <div>
                {wishlist?.length <= 0 &&
                    <p className='text_white'>No data Found</p>

                }
            </div>
        </div>
    )
}