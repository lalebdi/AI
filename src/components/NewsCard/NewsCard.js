import React from 'react';
import { Card, CardActions, CardActionArea, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import useStyles from './styles';
//  every text in Material UI is a typography
// I am destructing the article prop

const NewsCard = ({article: { description, publishedAt, source, title, url, urlToImage }, i}) => {
    const classes = useStyles();
    
    return (
        <Card>
            <CardActionArea>
                <CardMedia className={classes.media} image={urlToImage || 'https://www.industry.gov.au/sites/default/files/August%202018/image/news-placeholder-738.png'} title={title} />
                    <div>
                        <Typography variant="body2" color="textSecondary" component="h2">{(new Date(publishedAt)).toDateString()}</Typography>
                        <Typography variant="body2" color="textSecondary" component="h2">{source.name}</Typography>
                    </div>
                    <Typography gutterBottm variant="h5">{title}</Typography>
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p" >{description}</Typography>
                    </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">Read More</Button>
                <Typography variant="h5" color="textSecondary" >{i + 1}</Typography>
            </CardActions>
        </Card>
    )
}

export default NewsCard
