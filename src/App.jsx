import { useEffect, useState } from "react";

// Simple Navbar component since it wasn't provided
function Navbar() {
  return (
    <nav className="bg-orange-500 text-white shadow-lg border-b-2 border-orange-600 ">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <h1 className="text-2xl font-bold ">NewsApp</h1>
          {/* <div className="flex space-x-4">
            <button className=" hover:text-gray-600 font-medium">Home</button>
            <button className=" hover:text-gray-600 font-medium">Business</button>
            <button className=" hover:text-gray-600 font-medium">Tech</button> */}
          {/* </div> */}
        </div>
      </div>
    </nav>
  );
}

function App() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const API_KEY = import.meta.env.VITE_KEY
  const API_URL = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${API_KEY}`;

  useEffect(() => {
    async function fetchdata() {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        const data = await response.json();
        
        if (data.status === 'error') {
          throw new Error(data.message || 'Failed to fetch news');
        }
        
        console.log(data.articles);
        setNews(data.articles || []);
        setError(null);
      } catch (error) {
        console.log(`Error fetching the news: ${error}`);
        setError(`Failed to load news: ${error.message}`);
        setNews([]);
      } finally {
        setLoading(false);
      }
    }
    fetchdata();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-black mx-auto mb-4"></div>
            <p className="text-xl font-semibold text-gray-700">Loading latest news...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-black mb-2">Today's Top Headlines</h2>
            <div className="w-24 h-1 bg-black"></div>
          </div>
          
          {error && (
            <div className="bg-red-100 border-2 border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((article, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg shadow-lg border-2 border-gray-200 hover:border-black transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 overflow-hidden group"
              >
                {/* Image Section */}
                <div className="relative overflow-hidden h-48">
                  <img 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                    src={article.urlToImage || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=300&fit=crop"} 
                    alt="News image" 
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=300&fit=crop";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                {/* Content Section */}
                <div className="p-6">
                  <h3 className="font-bold text-lg text-black mb-3 line-clamp-2 group-hover:text-gray-800 transition-colors">
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                    {article.description}
                  </p>
                  
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <div className="flex flex-col">
                      <p className="font-semibold text-sm text-black">
                        {article.author || "Unknown Author"}
                      </p>
                      {article.publishedAt && (
                        <p className="text-xs text-gray-500 mt-1">
                          {formatDate(article.publishedAt)}
                        </p>
                      )}
                    </div>
                    <button 
                      onClick={() => window.open(article.url, '_blank')}
                      className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors duration-200 hover:shadow-lg"
                    >
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {news.length === 0 && !loading && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No news articles available at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;