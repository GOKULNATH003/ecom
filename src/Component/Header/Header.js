import './Header.css'
import wishlist from '../../Assets/Gif/heart.jpg'
import cart from '../../Assets/Gif/cart.png'
import box from '../../Assets/Gif/box.png'
export default function Header() {
    return (

        <div className="Header_container d-flex align-center justify-end">

            <div className='d-flex g5 px10'>

                <img className='icon' src={wishlist} alt="" />
                <img className='icon' src={cart} alt="" />
                <img className='icon' src={box} alt="" />
            </div>
        </div>
    )
}