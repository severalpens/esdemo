"""
This script runs creates an Elasticsearch index for the provided JSON document.
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
es.reindex(data_path="long_documents.json", index_name="long_documents")
