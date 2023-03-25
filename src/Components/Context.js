
import { createContext,useEffect,useRef,useState} from "react";
import React from "react";
import axios from 'axios';
import '../App.css';
import { useNavigate } from "react-router-dom";




export const Context = createContext();

const AppContext = ({children}) => {
    const navigate = useNavigate();
    const searchData = useRef(null)
    const [searchText,setSearchText] = useState("");
    const [imageData, setImageData] = useState([]);
    const [showSearch,setShowSearch] = useState(false)
    
    useEffect(() =>{
        const params = {
            method : "flickr.photos.search",
            api_key: "373184e0a601e19b0d277e2429d5c611",
            text: searchText,
            sort: "",
            per_page: 40,
            license: '4',
            extras: "owner_name, license",
            format: "json",
            nojsoncallback: 1 
        }
        const parameters = new URLSearchParams(params);
        const url = `https://api.flickr.com/services/rest/?${parameters}`;
        axios.get(url).then((resp) =>{
            console.log(resp.data)
       const arr= resp.data.photos.photo.map((imgData) => {
                  return fetchFlickrImageUrl(imgData,'q') ; 
                 
            });
          setImageData(arr);
            
        }).catch(() => {

        }).finally(() => {

        })


    },[searchText])

    const fetchFlickrImageUrl = (photo,size) => {
        let url = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}`
        if(size){
            url += `_${size}`
        }
        url += '.jpg'
        return url

    }

    return (
        <Context.Provider value={{imageData}}>
               <div className="main-container">
                 <p className="heading">SnapShot</p>
               <input onChange={(e)=> {searchData.current = e.target.value}} placeholder="Search..." />
               <button onClick={() => { setSearchText(searchData.current)
               setShowSearch(true) 
               navigate('/')
            }}>Search</button>
               <section>
                <button onClick={()=> {setSearchText("mountains") 
                 navigate('/mountains')
                 setShowSearch(false)}}>Mountains</button>
                <button onClick={()=> {setSearchText("beaches") 
                navigate('/beaches')
                setShowSearch(false)
            }
             }>Beaches</button>
                <button onClick={()=> {setSearchText("birds")
             navigate('/birds')
             setShowSearch(false)}}>Birds</button>
                <button onClick={()=> {setSearchText("food")
             navigate('/foods')
             setShowSearch(false)}}>Food</button>
               </section>
               </div>
              
              {showSearch && <section className="image-container">
                
                {imageData.map((imageurl,key) => {
                    return ( <article className="flickr-image">
                    <img src={imageurl} key={key}/>
                    </article>)
                })}
              
               
               </section>}
            {children} 
        </Context.Provider> 
    )

}

export default AppContext;
