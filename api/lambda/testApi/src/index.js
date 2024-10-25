const https = require("https");

exports.handler = async (event) => {
    // Check HTTP method
    if (event.httpMethod !== 'GET') {
        return {
            statusCode: 405,
            headers: { 'Content-Type': 'text/plain' },
            body: 'Method Not Allowed'
        };
    }

    const apiUrl = "https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";

    // Fetch data from Deck of Cards API
    return new Promise((resolve, reject) => {
        https.get(apiUrl, (apiResponse) => {
            let data = '';

            // Gather the data chunks as they arrive
            apiResponse.on('data', (chunk) => {
                data += chunk;
            });

            // Once the response is complete, resolve with API Gateway response format
            apiResponse.on('end', () => {
                resolve({
                    statusCode: 200,
                    headers: { 'Content-Type': 'application/json' },
                    body: data
                });
            });

        }).on("error", (error) => {
            // Handle any errors that occur during the API request
            resolve({
                statusCode: 500,
                headers: { 'Content-Type': 'text/plain' },
                body: "Error fetching data from API: " + error.message
            });
        });
    });
};