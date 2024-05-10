import React, {useState} from 'react';

function MainPage() {
    const API_KEY = process.env.NYT_API_KEY;
    const [copyright, setCopyright] = useState('');
    const [articleLoaded, setArticleLoaded] = useState(false);
    const [myArticle, setMyArticle] = useState({
        headline: '',
        snippet: '',
        byline: {},
    });

    const fetchArchive = async(event) => {
        event.preventDefault();

        // Fetch the archive
        const archiveURL = `https://api.nytimes.com/svc/archive/v1/2024/2.json?api-key=${API_KEY}`;
        console.log(`***** NYT API KEY: ${API_KEY}`);
        const archiveResponse = await fetch(archiveURL);

        if (archiveResponse.ok) {
            const archiveData = await archiveResponse.json();

            setCopyright(archiveData.copyright);
            setMyArticle(archiveData.docs[0]);
            setArticleLoaded(true);
        } else {
            window.confirm("There was a problem fetching the NY Times archive.")
        }

    };

    const freshLanding = () => (
        <>
            <h1>Headline Editor Main Page</h1>
            <button onClick={fetchArchive}>Load Archive</button>
        </>
    );

    const archiveLoaded = () => (
        <>
            <h1>NY Times Archive for 2024 February</h1>
            <h2>{copyright}</h2>
            <h2>{myArticle.headline}</h2>
            <p>{myArticle.snippet}</p>
            <p>by {myArticle.byline.original}</p>
        </>
    )

    return (
        <div className="content">
            {articleLoaded ? archiveLoaded() : freshLanding()}
        </div>

    );

};

export default MainPage;
