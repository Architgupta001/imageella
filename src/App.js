
import React, { useEffect, useState } from 'react';
import './App.css';
import ImageCard from './components/ImageCard';
import ImageSearch from './components/ImageSearch';

function App() {
  const [images, setImages] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState("")

  
  useEffect(() => {
    console.log("search text changed")
    fetch(`https://pixabay.com/api/?key=${process.env.REACT_APP_API_KEY}&q=${search}&image_type=photo&pretty=true`)
      
    .then(res => res.json())
    .then(data => {
      setImages(data.hits)
      setIsLoading(false)
    })
    .catch(err => console.log(err))

  }, [search]);  
  

  return (
    <div className="container mx-auto">
      <ImageSearch searchText={(text)=> setSearch(text)}/>

      {!isLoading && images.length === 0 && <div><h1 className='text-6xl text-center mx-auto mt-32'>No Images Found</h1></div>}

      {isLoading ? <div><h1 className='text-6xl text-center mx-auto mt-32'>Image are Loading....</h1></div> 
      : <div className="grid grid-cols-3 gap-4">
        {
          images.map((image,index) => (
            <ImageCard key={index} image={image}/>
          ))
        }
      </div>}

    </div>
  );
}

export default App;
