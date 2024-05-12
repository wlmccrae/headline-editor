import React, { useState } from 'react';
import { Select, Divider } from '@chakra-ui/react'

function ArticleList(props) {
    console.log('***** (ArticleList) Articles: ', props);
    const [myArticle, setMyArticle] = useState({});

    const handleChange = (event) => {
      setMyArticle(event.target.value)
    }

    return (
        <>
            <form>
                <Select value={myArticle._id} onChange={handleChange} placeholder='Click to Select Article' size='sm' variant='filled' width='30%'>
                    {props.listdata.map(article => {
                        return (
                            <option key={article._id} value={article._id}>
                                {article.headline.main}
                            </option>
                        )
                    })}
                </Select>
            </form>
            <div className='article-display' width='70%'>
                <Divider orientation='vertical' />
            </div>

        </>
    );
};

export default ArticleList;
