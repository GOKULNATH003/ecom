import { useEffect, useRef, useState } from 'react'
import './DisplayProduct.css'
export default function DisplayProduct() {
    const DisplayProd = JSON.parse(localStorage.getItem("DisplayProd"))
    const [imageIndex, setImageIndex] = useState(0)

    const [fav, setFav] = useState(false)
    const [cart, setCart] = useState(false);
    const ImgRef = useRef()
    console.log(DisplayProd)
    const wishlister = JSON.parse(localStorage.getItem("wishlister"))
    const cartData = JSON.parse(localStorage.getItem("cart"))
    useEffect(() => {

        if (!localStorage.getItem("cart")) {
            localStorage.setItem("cart", JSON.stringify([]))
        }

        if (!localStorage.getItem("wishlister")) {
            localStorage.setItem("wishlister", JSON.stringify([]))
        }

    }, [])
    useEffect(() => {
        wishlister.map((item) => {
            if (item.id === DisplayProd.id) {
                setFav(true)
            }

        })
        cartData.map((item) => {
            if (item.id === DisplayProd.id) {
                setCart(true)
            }
        })
    }, [])
    function handlewishcart(e) {

        switch (e.target.id) {
            case 'addwishlist':
                setFav(true);
                if (!wishlister?.includes(DisplayProd.id)) {
                    wishlister.push(DisplayProd)
                    localStorage.setItem("wishlister", JSON.stringify(wishlister))
                }
                break;

            case 'removewishlist':
                setFav(false);
                wishlister.forEach((item, index) => {
                    if (item.id === DisplayProd.id) {
                        wishlister.splice(index, 1);
                        localStorage.setItem("wishlister", JSON.stringify(wishlister));
                    }
                });
                break;
            case 'addcart':
                setCart(true);
                if (!cartData.includes(DisplayProd.id)) {
                    cartData.push(DisplayProd)
                    localStorage.setItem("cart", JSON.stringify(cartData))
                }

                break;
            case 'removecart':
                setCart(false);
                cartData.forEach((item, index) => {
                    if (item.id === DisplayProd.id) {
                        cartData.splice(index, 1)
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



    console.log(imageIndex)
    return (

        <div className=' py5 d-flex justify-center fdc align-center'>
            <div className='slide_container'>


                <button  className='pointer left_arr' onClick={() => { handleslide("reduce") }}> &lt;--- </button>
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
                <button className='pointer right_arr' onClick={() => { handleslide("add") }}> ---&gt; </button>
            </div>
            <div className='text-start'>
                <p>{DisplayProd.brand}</p>
                <p>{DisplayProd.title}</p>
                <p>{DisplayProd.description}</p>
                <p>{DisplayProd.price}</p>
                <p>{DisplayProd.rating}</p>
                <p>{DisplayProd.stock}</p>
                <p>{DisplayProd.discountPercentage}</p>
                {fav ? <p className='danger pointer' id='removewishlist' onClick={(e) => { handlewishcart(e) }}>Remove from wish list</p> : <p className='info pointer' id='addwishlist' onClick={(e) => { handlewishcart(e) }}>add to wish list</p>}
                {cart ? <p className='danger pointer' id='removecart' onClick={(e) => { handlewishcart(e) }}>Remove from Cart</p> : <p className='info pointer' id='addcart' onClick={(e) => { handlewishcart(e) }}>add to Cart</p>}
            </div>

        </div>
    )
}