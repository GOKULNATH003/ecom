import { useEffect, useRef, useState } from 'react'
import './DisplayProduct.css'
import { Rating } from '@mui/material'
import arrow from '../../Assets/Gif/arrow.png'
import { useNavigate } from 'react-router-dom'
export default function DisplayProduct() {
    const DisplayProd = JSON.parse(localStorage.getItem("DisplayProd"))
    const [imageIndex, setImageIndex] = useState(0)
    const navigator = useNavigate()
    const [fav, setFav] = useState(false)
    const [cart, setCart] = useState(false);
    const [preview, setPreView] = useState(false)
    const ImgRef = useRef()
    console.log(DisplayProd)
    const [getInput, setGetInput] = useState({
        mobNumber: "",
        address: "",
        quantity: "",
    })
    const wishlister = JSON.parse(localStorage.getItem("wishlister"))
    const cartData = JSON.parse(localStorage.getItem("cart"))
    const orders = JSON.parse(localStorage.getItem("order"))
    useEffect(() => {

        if (!localStorage.getItem("cart")) {
            localStorage.setItem("cart", JSON.stringify([]))
        }

        if (!localStorage.getItem("wishlister")) {
            localStorage.setItem("wishlister", JSON.stringify([]))
        }

        if (!localStorage.getItem("order")) {
            localStorage.setItem("order", JSON.stringify([]))
        }

    }, [])
    useEffect(() => {
        wishlister?.map((item) => {
            if (item.id === DisplayProd.id) {
                setFav(true)
            }

        })
        cartData?.map((item) => {
            if (item.id === DisplayProd.id) {
                setCart(true)
            }
        })
    }, [])
    function handleSubmit(e) {
        e.preventDefault();

        DisplayProd.amount = getInput.quantity * DisplayProd.price;
        DisplayProd.quantity = getInput.quantity
        DisplayProd.address = getInput.address
        DisplayProd.mobNumber = getInput.mobNumber
        if (!orders?.includes(DisplayProd.id)) {
            orders.push(DisplayProd)
            localStorage.setItem("order", JSON.stringify(orders))
        }
        alert("Order Placed")
        setPreView(false)
        navigator("/")
    }

    function handlewishcart(e) {

        switch (e.target.id) {
            case 'addwishlist':
                setFav(true);
                if (!wishlister?.includes(DisplayProd.id)) {
                    wishlister?.push(DisplayProd)
                    localStorage.setItem("wishlister", JSON.stringify(wishlister))
                }
                break;

            case 'removewishlist':
                setFav(false);
                wishlister?.forEach((item, index) => {
                    if (item.id === DisplayProd.id) {
                        wishlister?.splice(index, 1);
                        localStorage.setItem("wishlister", JSON.stringify(wishlister));
                    }
                });
                break;
            case 'addcart':
                setCart(true);
                if (!cartData?.includes(DisplayProd.id)) {
                    cartData?.push(DisplayProd)
                    localStorage.setItem("cart", JSON.stringify(cartData))
                }

                break;
            case 'removecart':
                setCart(false);
                cartData?.forEach((item, index) => {
                    if (item.id === DisplayProd.id) {
                        cartData?.splice(index, 1)
                        localStorage.setItem("cart", JSON.stringify(cartData))
                    }
                })

        }
    }
    function handleslide(state) {
        // debugger
        // if (imageIndex <=DisplayProd.images.length-1) {
        switch (state) {
            case "reduce":
                if (imageIndex <= 0) {
                    setImageIndex(DisplayProd.images.length - 1)
                }
                else {

                    setImageIndex(imageIndex - 1)
                }
                break;
            case "add":
                if (imageIndex <= DisplayProd.images.length - 2) {

                    setImageIndex(imageIndex + 1)
                }
                else {
                    setImageIndex(0)
                }
                break;
            default:
                setImageIndex(0)
        }
        // }
        // else{
        //     setImageIndex(0)
        // }


    }
    function handleClick() {
        setPreView(true)
    }


    console.log(imageIndex)
    return (
        <div className='d-flex justify-center'>
            <div className=' py5 d-flex justify-center  align-center dp_container'>
                <div className='slide_container'>


                    <button className='pointer left_arr' onClick={() => { handleslide("reduce") }}> <img src={arrow} alt="" className='arr1' /> </button>
                    <img className='image_size' ref={ImgRef} src={DisplayProd.images[imageIndex]} alt="" />
                    {/* <div className=" imageContainer"> */}
                    {/* {
                    DisplayProd.images.map((item) => {
                        return (
                            <img src={item} className='image_size' style={{ transform: `translateX(-${100 * imageIndex}%)` }} alt="" />
                            )
                        })
                } */}
                    {/* </div> */}
                    <button className='pointer right_arr' onClick={() => { handleslide("add") }}> <img src={arrow} alt="" className='arr2' /></button>
                </div>
                <div className='text-start dp_bottom'>
                    <p>{DisplayProd.title} - {DisplayProd.brand}</p>
                    <p>{DisplayProd.description}</p>
                    <div className=' d-flex'>₹{DisplayProd.price} &nbsp; <sub className="text-line light_black">₹{parseInt(DisplayProd?.price / (1 - DisplayProd.discountPercentage / 100))}</sub> &nbsp;<span className="color_r"> {DisplayProd.discountPercentage}%  </span>offer</div>
                    <p>{DisplayProd.stock} stocks available</p>
                    <Rating name="read-only" value={DisplayProd.rating} readOnly />
                    {fav ? <p className='danger pointer' id='removewishlist' onClick={(e) => { handlewishcart(e) }}>Remove from wish list</p> : <p className='info pointer' id='addwishlist' onClick={(e) => { handlewishcart(e) }}>add to wish list</p>}
                    {cart ? <p className='danger pointer' id='removecart' onClick={(e) => { handlewishcart(e) }}>Remove from Cart</p> : <p className='info pointer' id='addcart' onClick={(e) => { handlewishcart(e) }}>add to Cart</p>}
                    <button className="buynow_btn pointer" onClick={() => { handleClick() }}>Buy Now</button>
                </div>
                {preview &&

                    <Preview DisplayProd={DisplayProd} setPreView={setPreView} getInput={getInput} setGetInput={setGetInput} handleSubmit={handleSubmit} />
                }
            </div>
        </div>
    )
}





const Preview = ({ DisplayProd, getInput, setGetInput, handleSubmit, setPreView }) => {

    function handleChange(e) {
        if (e.target.name === "address") {

            setGetInput((prev) => {
                return { ...prev, [e.target.name]: e.target.value }
            })
        }
        else {
            const pattern = new RegExp('[0-9]$')
            if (e.target.value === "" || pattern.test(e.target.value)) {


                setGetInput((prev) => {
                    return { ...prev, [e.target.name]: e.target.value }
                })
            }
        }
    }
    console.log(getInput)


    return (
        <div className='preview_container' onClick={() => { setPreView(false) }}>
            <div className="preview_layer" onClick={(e) => { e.stopPropagation() }}>
                <div className='d-flex g2 align-center'>
                    <img src={DisplayProd.thumbnail} className='thumbnail_img' alt="" />
                    <div className='view_layer'>

                        <p className='text-start'>{DisplayProd.title} - {DisplayProd.brand}</p>
                        <p className='text-start'>{DisplayProd.description}</p>
                        <div className=' d-flex'><span>₹ {DisplayProd.price}</span>  &nbsp;<span className="text-line light_black fs-09">  ₹{parseInt(DisplayProd?.price / (1 - DisplayProd.discountPercentage / 100))}</span> &nbsp;<span className="color_r"> {DisplayProd.discountPercentage}%  </span>&nbsp;<span>offer</span></div>

                        <p className='text-start'>{DisplayProd.stock} Stocks available</p>

                        <Rating name="read-only" value={DisplayProd.rating} readOnly />

                    </div>
                </div>
                <div>
                    < form onSubmit={handleSubmit} >

                        <div className='input_cont'>

                            <label>Mobile Number  :</label>
                            <input type="text" required name='mobNumber' maxLength={10} value={getInput?.mobNumber} onChange={handleChange} />
                        </div>
                        <div className='input_cont'>

                            <label>Address  :</label>
                            <input type="text" required name='address' value={getInput?.address} onChange={handleChange} />
                        </div>
                        <div className='input_cont'>

                            <label>Quantity  :</label>
                            <input type="text" required name="quantity" maxLength={3} value={getInput?.quantity} onChange={handleChange} />
                        </div>
                        <label>Total Amount</label>
                        <p>{getInput.quantity * DisplayProd.price}</p>
                        {getInput?.quantity<=DisplayProd?.stock?

                            <input type="submit" className='pointer' value="Submit" id="" />:
                            <p className='danger'>Out of Stock</p>
                        }
                    </form>
                </div>

            </div>
        </div>
    )
}