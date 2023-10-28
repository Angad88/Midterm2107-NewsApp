import React, { useState, useEffect } from 'react';
import './styles.css'; 

const NewsList = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const apiKey = process.env.REACT_APP_NEWS_API_KEY;
    fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`)
      .then((response) => response.json())
      .then((data) => setNews(data.articles))
      .catch((error) => console.error('Error:', error));
  }, []);

  return (
    <div>
        <div className="top-headlines-card"><h1>Top Headlines</h1></div>
      <ul className="news-list">
        {news.map((article, index) => (
          <li className="news-item" key={index}>
            <div className="card">
              {article.urlToImage && (
                <img
                  src={article.urlToImage}
                  alt={article.title}
                />
              )}
              <div className="card-content">
                <h2>{article.title}</h2>
                <div className="card-header">
                  <p className="author">{article.author}</p>
                  <p className="date">{new Date(article.publishedAt).toLocaleDateString()}</p>
                </div>
                <p className="description">{article.description}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsList;
