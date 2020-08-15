import React, { useState, useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import NewsCards from './components/NewsCards/NewsCards';
require('dotenv').config()

const alanKey = process.env.REACT_APP_ALAN;


export default function App() {
    const [newsArticles, setNewsArticles] = useState([]);
// useEffect takes 2 params. one is a callback and the second is a dependency array. if the array is empty it will run once when the it mounts.
    useEffect(() => {
        alanBtn({
            key: alanKey,
            onCommand: ({command, articles}) => {
                if(command === 'newHeadlines'){
                    // console.log(articles)
                    setNewsArticles(articles);
                }
            }
        })
    }, [])

    return (
        <div>
            <h1> Alan AI News App </h1>
            <NewsCards articles={newsArticles} />
        </div>
    )
}
