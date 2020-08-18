import React, { useState, useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import NewsCards from './components/NewsCards/NewsCards';
import useStyles from './styles';
import wordsToNumbers from 'words-to-numbers'; // for the fuzzy search
import header from './assets/header2.jpg';
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
            onCommand: ({command, articles, number}) => {
                if(command === 'newHeadlines'){
                    // console.log(articles)
                    setNewsArticles(articles);
                    setActiveArticle(-1); // to reset every time we do the news
                } else if(command === 'highlight'){
                        setActiveArticle((prevActiveArticle) => prevActiveArticle +1);
                        // This is recommended by react. Once you change the state to the previous state you call it as a callback and increment it
                } else if(command === 'open'){
                    // console.log(number);
                    // sometimes when the number is complex it makes it a string and I want it as a number
                    const parsedNymber = number.length > 2 ? wordsToNumbers(number,{}): number;
                    const article = articles[parsedNymber - 1];
                    // one last check is if the number is too large the voice will say try again.

                    if(parsedNymber > 20){
                        alanBtn().playText('please try that again.')
                    } else if(article){
                        
                        window.open(article.url, '_blank');
                        alanBtn().playText('Opening...')
                    }
                }
                // in future I will consider using a switch statement above
                
            }
        })
    }, [])

    return (
        <div>
            <div className={classes.logoContainer}>
                <img src={header} className={classes.alanLogo} alt="logo" />
            </div>
            <NewsCards articles={newsArticles} activeArticle={activeArticle} />
        </div>
    )
}
