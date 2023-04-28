import { useContext, useEffect, useState } from "react"
import { NewContext } from "../../App"
import axios from "axios"
import './Categories.css'
import { useNavigate } from "react-router-dom"

export default function Category() {
    const navigator=useNavigate()
    const [categories, setCategories] = useState()
    useEffect(() => {
        const config = {
            url: `${process.env.REACT_APP_SERVER}/products/categories`,
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }
        axios(config).then((res) => {
            console.log(res.data)
            setCategories(res.data)
            localStorage.setItem("allprods", JSON.stringify(res.data.products))

        }).catch((err) => {
            console.log(err)
        })

    }, [])
    function handleCategory(item) {
        const config = {
            url: `${process.env.REACT_APP_SERVER}/products/category/${item}`,
            method: "get",

        }
        axios(config).then((res) => {
            console.log(res)
            localStorage.setItem("ViewProds", JSON.stringify(res.data.products))
            navigator("/viewprod")
        }).catch((err) => {
            console.log(err)
        })

    }

    return (
        <>
            <div className="categories_list">
                {
                    categories?.map((item, index) => {

                        return (


                                <p key={index} className="pointer" onClick={()=>{handleCategory(item)}}>{item}</p>

                        )
                    })
                }
            </div>
        </>
    )
}