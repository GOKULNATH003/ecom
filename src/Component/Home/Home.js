import { useContext, useEffect, useState } from "react"
import { NewContext } from "../../App"
import './Home.css'
import img from './img.jpg'
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Loader from "../Loader/Loader"

export default function Home() {
    const navigator = useNavigate()

    const { data, setData, viewCategory, setViewCategory } = useContext(NewContext)
    const [categories, setCategories] = useState()
    function handleVIewroduct(item) {
        localStorage.setItem("DisplayProd", JSON.stringify(item))
        navigator("/displayproduct")
    }

    useEffect(() => {
        const config = {
            url: `${process.env.REACT_APP_SERVER}/products`,
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }
        axios(config).then((res) => {
            console.log(res.data)
            setData(res.data.products)

        }).catch((err) => {
            // console.log(err)
        })

    }, [])


    return (

        <>

            <div className="prods_container">
                {
                    data?.map((item) => {
                        return (
                            <div className="card_container" onClick={() => { handleVIewroduct(item) }}   >
                                <div className="">
                                    <img src={item.thumbnail} className="card_image" alt="" />
                                    <p className="lb30">{item.title}</p>
                                    <p className="lb30 fs09">{item.description}</p>
                                    <div>₹ {item.price} <sub className="text-line light_black">₹{parseInt(item?.price / (1 - item.discountPercentage / 100))}</sub><span className="color_r"> {item.discountPercentage}%  </span>offer</div>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        </>


    )
}