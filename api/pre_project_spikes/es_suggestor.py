"""
This script runs the Elasticsearch Completion Suggestor and prints the results to the 
console.
"""

import os

from dotenv import load_dotenv

from elastic import SearchPlayground

load_dotenv()


es = SearchPlayground(
    url=os.environ.get("ES_URL"),
    username=os.environ.get("ES_USERNAME"),
    password=os.environ.get("ES_PASSWORD"),
)

prefix = "s"
suggestions = es.completion_suggestor("long_documents", prefix)
options = suggestions["suggest"]["autocomplete-suggest"][0]["options"]
print("Autocomplete for", prefix)
for option in options:
    print(option["text"])
