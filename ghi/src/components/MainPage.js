import React, {useState} from 'react';
import SearchResults from "./SearchResults";
import {
    Heading,
    Text,
    Stack,
    Input, InputGroup, InputLeftAddon,
    Button, Divider,
    Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import './MainPage.css';

function MainPage() {
    const [copyright, setCopyright] = useState('');
    const [resultsLoaded, setResultsLoaded] = useState(false);
    const [myArticle, setMyArticle] = useState({
        headline: {main: ''},
        snippet: '',
        byline: {original: ''},
    });
    const [archiveFormData, setArchiveFormData] = useState({
        month: 0,
        year: 0,
    });

    const API_KEY = process.env.REACT_APP_NYT_API_KEY;

    // Handle when the form changes
    const handleChange = (event) => {
        setArchiveFormData({
            ...archiveFormData,
            [event.target.name]: event.target.value
        });
    };

    // Handle the reset page button.
    const resetPage = async(event) => {
        event.preventDefault();
        setResultsLoaded(false);
    };

    // Handle the search button.
    const fetchArchive = async (event) => {
        const archiveURL = `https://corsproxy.io/?https://api.nytimes.com/svc/archive/v1/${archiveFormData.year}/${archiveFormData.month}.json?api-key=${API_KEY}`;
        event.preventDefault();

        const archiveResponse = await fetch(archiveURL);
        if (archiveResponse.ok) {
            const archiveData = await archiveResponse.json();
            // console.log(`***** Archive Data ==> ${JSON.stringify(archiveData)}`);

            setCopyright(archiveData.copyright);
            setResultsLoaded(true);
            setMyArticle(archiveData.response.docs[0]);
        } else {
            window.confirm("There was a problem fetching the NY Times archive.")
        }
        // console.log(`***** Copyright: ${copyright}`);
        // console.log(`***** Article Info: ${JSON.stringify(myArticle)}`);
        // console.log(`***** Component Status: ${resultsLoaded}`);
    };

    // Handle the search archive button.
    // const searchArchive = async (event) => {
    //     const searchURL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=${API_KEY}`;
    //     event.preventDefault();

    //     const archiveResponse = await fetch(searchURL);
    //     if (archiveResponse.ok) {
    //         const archiveData = await archiveResponse.json();
    //         console.log(`***** Search Archive Data ==> ${JSON.stringify(archiveData)}`);

    //     } else {
    //         window.confirm("There was a problem searching the NY Times archive.")
    //     }
    // };

    // Handle the Top Stories button.
    // const fetchTopStories = async (event) => {
    //     event.preventDefault();

    //     const archiveResponse = await fetch(topStoriesURL);
    //     if (archiveResponse.ok) {
    //         const archiveData = await archiveResponse.json();
    //         console.log(`***** Top Stories Data ==> ${JSON.stringify(archiveData)}`);

    //     } else {
    //         window.confirm("There was a problem fetching the NY Times Top Stories.")
    //     }
    // };

    const freshLanding = () => (
        <div className="initialdisplay">
            <h2>No results yet.</h2>
        </div>
    );

    return (
        <div className="content">
            <div className="searches">
                <Card className="search-card" width='400px' boxShadow='lg'>
                    <CardHeader>
                        <Heading size='md'>Search the NY Times Archive</Heading>
                        <Text as='i'>Retrieve all articles for a particular month.</Text>
                    </CardHeader>
                    <CardBody>
                        <form onSubmit={fetchArchive} id='archive-form'>
                            <Stack spacing={1}>
                                <InputGroup>
                                    <InputLeftAddon w='120px'>Year (YYYY)</InputLeftAddon>
                                    <Input onChange={handleChange} type="text" id="year" name="year" placeholder="2024" variant='outline' width='100px'/>
                                </InputGroup>
                                <InputGroup>
                                    <InputLeftAddon w='120px'>Month (M)</InputLeftAddon>
                                    <Input onChange={handleChange} type="text" id="month" name="month" placeholder="1" variant='outline' width='100px'/>
                                </InputGroup>
                            </Stack>
                        </form>
                    </CardBody>
                    <Divider color='gray.200' />
                    <CardFooter>
                        <Stack spacing={2} direction='row' align='center'>
                            <Button onClick={fetchArchive} className="button" size='sm'>Search</Button>
                            <Button onClick={resetPage} className="button" size='sm'>Reset Page</Button>
                        </Stack>
                    </CardFooter>
                </Card>
            </div>
            <div className="results">
                {resultsLoaded ? <SearchResults formData={archiveFormData} articleData={myArticle} copyright={copyright} /> : freshLanding()}
            </div>
        </div>

    );

};

export default MainPage;
