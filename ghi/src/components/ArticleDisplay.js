import React, { useState } from 'react';
import { Select, Heading, Text, Button, Divider, Link, Flex, Box } from '@chakra-ui/react'

function ArticleList(props) {
    // console.log('***** (ArticleList) Articles: ', props);
    const [myArticleId, setMyArticleId] = useState({});
    const [myArticle, setMyArticle] = useState({});
    const [articleLoaded, setArticleLoaded] = useState(false);

    const handleChange = async (event) => {
      setMyArticleId(event.target.value);
    };

    const handleSubmit = async (event) => {
        // console.log('***** (ArticleList) Length of Article List: ', props.listdata.length);
        // console.log('***** (ArticleList) Selected Article ID: ', myArticleId);
        // console.log('***** (ArticleList) First Article ID: ', props.listdata[0]['_id']);
        // console.log('***** (ArticleList) First Article: ', props.listdata[0]);
        // Load that article into myArticle.
        let foundArticle = {};
        for (let i = 0; i < props.listdata.length; i++){
            if (props.listdata[i]['_id'] === myArticleId) {
                foundArticle = props.listdata[i];
            };
        };
        // console.log('***** (ArticleList) Found Article: ', foundArticle);
        setMyArticle(foundArticle);
        setArticleLoaded(true);
    };

    return (
        <>
            <Flex height='auto'>
                <Box width='38%' borderRight='1px'>
                    <form id="select-article">
                        <Select value={myArticle._id} onChange={handleChange} placeholder='Click to Select Article' size='sm' variant='filled' width='50%' paddingBottom='10px'>
                            {props.listdata.map(article => {
                                return (
                                    <option key={article._id} value={article._id}>
                                        {article.headline.main}
                                    </option>
                                )
                            })}
                        </Select>
                    </form>
                    <Button onClick={handleSubmit} size='sm' className='button'>Submit</Button>
                </Box>
                <Box className='article-display' width='60%' paddingLeft='15px'>
                    { articleLoaded ?
                        <>
                            <Divider paddingTop='10px' />
                            <Heading size='sm' paddingTop='10px'>{myArticle.headline.main}</Heading>
                            <Text className="byline">{myArticle.byline.original}</Text>
                            <br></br>
                            {myArticle.multimedia.length > 4 ? (<Text>Image URL: {myArticle.multimedia[4].url}</Text>) : (<Text>No media.</Text>)}
                            <Text>{myArticle.abstract}</Text>
                            <Text>News Desk: {myArticle.news_desk}</Text>
                            <Link textDecoration="underline" href={myArticle.web_url} target="_blank" isExternal>Original Article</Link>
                        </>
                    : <Text paddingTop='10px'>Please select an article.</Text>}
                </Box>
            </Flex>
        </>
    );
};

export default ArticleList;
