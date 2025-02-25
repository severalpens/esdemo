const { app } = require('@azure/functions');
const { Client } = require('@elastic/elasticsearch');
const client = new Client({
    node: 'https://7441222d1c12456cae009f0c5f878e45.westus2.azure.elastic-cloud.com:443',
    auth: {
        apiKey: 'MmZjQ3pwUUJqN0preUNtclQ0TUc6WHhnVjZHRE1UZEtlTzhhdlNJYlpIdw=='
    }
});

app.http('search', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        const body = request.body;
        const bodyReader = body.getReader();
        const { value, done } = await bodyReader.read();
        const query = new TextDecoder().decode(value);
        console.log('Query:', query);
        const { body: response } = await client.search({
            index: 'main',
            body: {
                query: {
                    match: {
                        name: query
                    }
                }
            }
        });
        return response;
    }
});
