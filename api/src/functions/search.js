const { app } = require('@azure/functions');
const { Client } = require('@elastic/elasticsearch');
const chalk = require('chalk');

const client = new Client({
    node: 'https://7441222d1c12456cae009f0c5f878e45.westus2.azure.elastic-cloud.com:443',
    auth: {
        apiKey: '' 
    }
});

const verifyClientConnection = async () => {
    try {
        const resp = await client.info();
        if (resp.name) {
            console.log(chalk.green('Connected to ElasticSearch'));
            return true;
        }
    } catch (error) {
        console.error(chalk.red('Failed to connect to ElasticSearch'), error);
    }
    return false;
};

app.http('search', {
    methods: ['POST'], // Typically, searches use POST
    authLevel: 'anonymous',
    handler: async (request, context) => {
        if (!(await verifyClientConnection())) {
            return {
                status: 500,
                body: 'Failed to connect to ElasticSearch'
            };
        }

        let reqBody;
        try {
            reqBody = await request.json(); // Properly parsing JSON request body
        } catch (error) {
            return {
                status: 400,
                body: 'Invalid JSON body'
            };
        }

        console.log('reqBody', reqBody);

        try {
            const result = await client.search({
                index: 'main',
                body: reqBody
                // Removed the headers parameter
            });
            console.log('Search result:', result);
            return {
                status: 200,
                body: result // Return the JSON body of the result
            };
        } catch (error) {
            console.error('Search error:', error);
            return {
                status: 500,
                body: 'Error executing search'
            };
        }
    }
});
