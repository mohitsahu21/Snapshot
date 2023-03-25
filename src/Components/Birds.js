import { Context } from "./Context"
import { useContext } from "react"
import '../App.css';
import { useNavigate } from "react-router-dom";

export default function Bird(){
    const navigate = useNavigate();
    const {imageData} = useContext(Context)
    return (
         <> <div className="title">Birds Pictures</div>
        <section className="image-container">
                
                {imageData.map((imageurl,key) => {
                    return ( <article className="flickr-image">
                    <img src={imageurl} key={key}/>
                    </article>)
                })}
                </section>
                </>
    )
        
    
 }