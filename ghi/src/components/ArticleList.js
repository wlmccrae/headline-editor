import React, { useState } from 'react';
import { Text } from '@chakra-ui/react'

function ArticleList(props) {
    // console.log('***** (ArticleList) Articles: ', props);
    const [myArticle, setMyArticle] = useState({});

    const handleChange = (event) => {
      setMyArticle(event.target.value)
    }

    return (
        <>
            <Text>Select an article to display.</Text>
            <form>
                <select value={myArticle} onChange={handleChange}>
                    {props.listdata.map(article => {
                        return (
                            <option value={article.headline.main}>
                                {article.headline.main}
                            </option>
                            )
                    })}
                </select>
            </form>
        </>
    );
};

export default ArticleList;
