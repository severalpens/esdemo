#!/bin/bash

# Test the /index/<index_name> API endpoint
# curl -X POST http://localhost:5000/index/main \
# -H "Content-Type: application/json" \
# -d '{"query": {"match": {"content": "payment"}}}'

# Test the /test1 API endpoint
curl -X GET http://localhost:5000/test1 \
-H "Content-Type: application/json" \
-d '{"q": "payment"}'

