import { useNavigate } from 'react-router-dom'
import girl1 from '../../Assets/Gif/girl1.png'
import girl2 from '../../Assets/Gif/girl2.png'
export default function HomeContent(){
    const navigator=useNavigate()
    return(
        <>
        <div className='image_grid'>
            <img className='girls_image' src={girl1} alt="" />
            <div className="explore_content">
             <p className='tagline'>
                Shop with ease,anytime,anywhere !
             </p>
            <button className='explore_btn' onClick={()=>{navigator("/products")}}>Explore Now</button>
            </div>
            <img className='girls_image1' src={girl2} alt="" />
        </div>

        </>
    )
}