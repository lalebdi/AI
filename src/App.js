import React, { useState, useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import NewsCards from './components/NewsCards/NewsCards';
import useStyles from './styles'
require('dotenv').config()

const alanKey = process.env.REACT_APP_ALAN;


export default function App() {
    const [newsArticles, setNewsArticles] = useState([]);
    const [activeArticle, setActiveArticle] = useState(-1);
    const classes = useStyles();
// useEffect takes 2 params. one is a callback and the second is a dependency array. if the array is empty it will run once when the it mounts.
    useEffect(() => {
        alanBtn({
            key: alanKey,
            onCommand: ({command, articles}) => {
                if(command === 'newHeadlines'){
                    // console.log(articles)
                    setNewsArticles(articles);
                    setActiveArticle(-1); // to reset every time we do the news
                } else if(command === 'highlight'){
                        setActiveArticle((prevActiveArticle) => prevActiveArticle +1);
                        // This is recommended by react. Once you change the state to the previous state you call it as a callback and increment it
                }

                
            }
        })
    }, [])

    return (
        <div>
            <div className={classes.logoContainer}>
                <img src="https://alan.app/voice/images/previews/preview.jpg" className={classes.alanLogo} alt="logo" />
            </div>
            <NewsCards articles={newsArticles} activeArticle={activeArticle} />
        </div>
    )
}
