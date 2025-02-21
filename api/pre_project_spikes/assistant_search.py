"""
This script sends a message to watsonx Assistant. It is expected that the message will 
trigger the Elasticsearch action. The Elasticsearch results are then printed to the 
console.
"""

import json
import os

from dotenv import load_dotenv
from ibm_watson import AssistantV2
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator

load_dotenv()

ASSISTANT_URL = os.environ.get("ASSISTANT_URL")
ASSISTANT_API_KEY = os.environ.get("ASSISTANT_API_KEY")
ASSISTANT_VERSION = "2024-08-25"

authenticator = IAMAuthenticator(ASSISTANT_API_KEY)
assistant = AssistantV2(version=ASSISTANT_VERSION, authenticator=authenticator)

assistant.set_service_url(ASSISTANT_URL)

response = assistant.message_stateless(
    assistant_id="b775eb33-1938-431f-8631-19e1a3aaf7d1",
    environment_id="b775eb33-1938-431f-8631-19e1a3aaf7d1",
    # input={"message_type": "text", "text": "axolotl"},
    # input={"message_type": "text", "text": "giraffe"},
    # input={"message_type": "text", "text": "fossa"},
    input={"message_type": "text", "text": "animal"},
    # input={"message_type": "text", "text": "example query"},
)
result = response.get_result()
print("Full result object:")
print(json.dumps(result, indent=2))

hits = result["context"]["skills"]["actions skill"]["skill_variables"]["search_result"][
    "hits"
]["hits"]
for hit in hits:
    print()
    print("Title:", hit["_source"]["title"])
    print("Score:", hit["_score"])
    print("Url:", hit["_source"]["url"])
    print("Doc keys:", hit["_source"].keys())

# QUERY BODY (format as JSON)
"""
query_body = {
    "query": {
        "multi_match": {
            "query": $input_text,
            "fields": ["text", "title", "url", "categories"]
        }
    },
    "_source": ["title", "text", "url", "word_count"],
    "size": 2
}
"""
