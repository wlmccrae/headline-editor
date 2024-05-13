import { Heading, Text } from '@chakra-ui/react';
import ArticleList from './ArticleList.js';
import './SearchResults.css';

function SearchResults(props) {
    // console.log('***** (SearchResults) Props: ', props);
    const monthDict = {
        1: "January",
        2: "February",
        3: "March",
        4: "April",
        5: "May",
        6: "June",
        7: "July",
        8: "August",
        9: "September",
        10: "October",
        11: "November",
        12: "December"
    };
    return (
        <div className="archivedisplay">
            <Heading pt='30px' pb='10px' size='lg'>NY Times Archive for { props.formData.year } { monthDict[props.formData.month] }</Heading>
            <ArticleList listdata={props.articleData}/>
            <br></br>
            <Text className="copyright">All articles are {props.copyright}</Text>
        </div>
    );
};

export default SearchResults;
