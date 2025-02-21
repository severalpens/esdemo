"""
This module created a wrapper class for Elasticsearch.
"""

import json
from pprint import pprint

from elasticsearch import Elasticsearch


class SearchPlayground:
    def __init__(self, url, username, password):
        """Connect to Elasticsearch instance.

        Args:
            url (str): Elasticsearch API URL.
            username (str): Elasticsearch username.
            password (str): Elasticsearch password.
        """

        self.es = Elasticsearch(
            url, basic_auth=(username, password), verify_certs=False
        )

        client_info = self.es.info()
        print("Connected to Elasticsearch!")
        pprint(client_info.body)

    def create_index(self, index_name):
        """Create index in Elasticsearch.

        This method will overwrite existing indexes with the same name. It will also
        map the `autocomplete` field in the documents to type `completion`.

        Args:
            index_name (str): Name of index to be created.
        """

        self.es.indices.delete(index=index_name, ignore_unavailable=True)
        self.es.indices.create(
            index=index_name,
            mappings={"properties": {"autocomplete": {"type": "completion"}}},
        )

    def insert_documents(self, documents, index_name):
        """Insert multiple documents to an index.

        Args:
            documents (list[object]): List of documents in JSON format.
            index_name (str): Name of index to insert documents in to.
        """

        operations = []
        for document in documents:
            operations.append({"index": {"_index": index_name}})
            operations.append({**document})
        return self.es.bulk(operations=operations)

    def reindex(self, data_path, index_name):
        """Recreate index and upload documents to that index.

        Args:
            data_path (str): Path to JSON data to load into index.
            index_name (str): Name of index.
        """

        self.create_index(index_name)
        with open(data_path, "rt") as f:
            documents = json.loads(f.read())
        return self.insert_documents(documents, index_name)

    def completion_suggestor(self, index_name, prefix, size=5, skip_duplicates=False):
        """Run the completion suggestor (autocomplete).

        Args:
            index_name (str): Name of index to search.
            prefix (str): String to autocomplete.
            size (int, optional): Number of results to return. Defaults to 5.
            skip_duplicates (bool, optional): If True, duplicate results will not be returned. Defaults to False.
        """

        return self.es.search(
            index=index_name,
            body={
                "suggest": {
                    "autocomplete-suggest": {
                        "prefix": prefix,
                        "completion": {
                            "field": "autocomplete",
                            "size": size,
                            "skip_duplicates": skip_duplicates,
                        },
                    }
                }
            },
        ).body
