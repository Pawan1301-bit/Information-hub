import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";

function App() {
  const [news, setNews] = useState([])
  const API_KEY = '7aed10846c9d41288b6adee251a6b846';
  const API_URL = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=7aed10846c9d41288b6adee251a6b846`;
  
  useEffect(() => {
    async function fetchdata() {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        console.log(data.articles);
        setNews(data.articles);
      } catch (error) {
        console.log(`error fetching the news #${error}`);
      }
    }
    fetchdata();
  }, [])

  return (
    <>
      <Navbar />
      {news.map((article, index)=>(
          <div key={index} className="box mt-6 p-4 border-2 border-black w-[90vw] m-auto flex justify-between">
            <div>
              <p className="font-bold text-lg">{article.title}</p>
              <p>{article.description}</p>
              <p className="font-bold text-center">{article.author}</p>
            </div>
            <img className="w-80 h-48 object-cover rounded-lg right-0" src={article.urlToImage} alt="image not available" />
          </div>
      ))} 

    </>
  )
}

export default App;

/*
{news ? (
        <div className="box mt-6 p-4 border-2 border-black w-[90vw] m-auto flex justify-between">
          <div>
            <p className="font-bold text-lg">{news.title}</p>
            <p>{news.description}</p>
            <p className="font-bold text-center">{news.author}</p>
          </div>
          <img className="w-80 h-48 object-cover rounded-lg right-0" src={news.urlToImage} alt="image not available" />
        </div>
      ) :
        <p>wait a second newloading...</p>
      }
*/


/*
<h1 className="text-3xl">Todays top headline <button onClick={fetchdata}>fetch</button></h1>
      {news?(
        <div>
          <p>{news.title}</p>
          <p>{news.description}</p>
          <p>{news.author}</p>
          <img  src={news.urlToImage}  alt="image not available" />
        </div>
      ):
      <p>news loading </p>
      }
*/