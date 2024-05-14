import { Heading, Text, Divider, Center } from '@chakra-ui/react';
import ArticleDisplay from './ArticleDisplay.js';
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
            <Divider color='gray.200' marginTop='20px' />
            <Heading pt='30px' pb='10px' size='md'>NY Times Archive for { props.formData.year } { monthDict[props.formData.month] }</Heading>
            <ArticleDisplay listdata={props.articleData}/>
            <br></br>
            <Center marginTop='10px'><Text className="copyright" fontSize='sm'>All articles are {props.copyright}</Text></Center>
        </div>
    );
};

export default SearchResults;
