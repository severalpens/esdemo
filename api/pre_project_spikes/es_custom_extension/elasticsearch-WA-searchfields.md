# Watsonx Assistant ICD Elasticsearch Integration - Accessing Additional Search Fields

## Overview

Retrieve additional fields from ICD Elasticsearch index.

## Key Features

- Uses Watsonx Assistant's Custom Extension feature to query ICD Elasticsearch
- Retrieves additional example fields (e.g., `word_count`, `categories`) along with standard fields (`title`, `body_text`, `url`)
- Controls exactly which fields are returned using `_source` filtering
- Controls number of results returned by query

## Implementation Steps

### 1. Create OpenAPI definition

Create an OpenAPI definition by saving the code below as a JSON file:

<details>
<summary>Expand...</summary>

```json
{
  "openapi": "3.0.1",
  "info": {
    "title": "Custom Search Elastic",
    "description": "Custom extension for searching ICD Elasticsearch with additional fields",
    "version": "1.0"
  },
  "servers": [
    {
      "url": "https://{elastic_url}",
      "description": "The Elasticsearch URL as specified in the Overview page within Endpoints -> HTTPS tab on your IBM Cloud Database ICD Elastic Instance",
      "variables": {
        "elastic_url": {
          "default": "5d766a7b-a079-4cae-a9a1-00e9151b0878.4b2136ddd30a46e9b7bdb2b2db7f8cd0.databases.appdomain.cloud:31362",
          "description": "The portions of the Elasticsearch URL that follow https://"
        }
      }
    }
  ],
  "paths": {
    "/{index_name}/_search": {
      "post": {
        "parameters": [
          {
            "name": "index_name",
            "in": "path",
            "description": "Name of the index",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "security": [
          {
            "basicAuth": []
          }
        ],
        "description": "Search request to Elasticsearch",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": ["query"],
                "properties": {
                  "query": {
                    "type": "object"
                  },
                  "_source": {
                    "type": "array",
                    "items": {
                      "type": "string"
                    }
                  },
                  "size": {
                    "type": "integer"
                  }
                }
              },
              "example": {
                "query": {
                  "match": {
                    "body_text": "${input_text}"
                  }
                },
                "_source": ["title", "text", "url", "word_count", "categories"],
                "size": 3
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Search results returned by Elastic",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "took": {
                      "type": "integer"
                    },
                    "timed_out": {
                      "type": "boolean"
                    },
                    "_shards": {
                      "type": "object",
                      "properties": {
                        "total": {
                          "type": "integer"
                        },
                        "successful": {
                          "type": "integer"
                        },
                        "skipped": {
                          "type": "integer"
                        },
                        "failed": {
                          "type": "integer"
                        }
                      }
                    },
                    "hits": {
                      "type": "object",
                      "properties": {
                        "max_score": {
                          "type": "number"
                        },
                        "hits": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {
                              "_id": {
                                "type": "string"
                              },
                              "_score": {
                                "type": "number"
                              },
                              "_index": {
                                "type": "string"
                              },
                              "_source": {
                                "type": "object",
                                "properties": {
                                  "title": {
                                    "type": "string"
                                  },
                                  "text": {
                                    "type": "string"
                                  },
                                  "url": {
                                    "type": "string"
                                  },
                                  "word_count": {
                                    "type": "integer"
                                  },
                                  "categories": {
                                    "type": "array",
                                    "items": {
                                      "type": "string"
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  "components": {
    "securitySchemes": {
      "basicAuth": {
        "type": "http",
        "scheme": "basic"
      }
    }
  }
}
```

</details>

### 2. Create and configure extension in watsonx Assistant UI

1. Log in to watsonx Assistant and go to **Integrations** > **Extensions**.
2. Click "Build custom extension".
3. Click "Next".
4. Enter an extension name and description.
5. Upload the JSON file you saved earlier and click "Next".
6. Review extension, ensuring all fields loaded correctly and click "Finish".
7. Once returned to the **Extensions** page, click "Add" on your newly created extension, click "Add" again then "Next".
8. Configure your ICD Elasticsearch authentication:

   - Authentication type: `Basic auth`
   - Username: Elasticsearch username
   - Password: Elasticsearch password
   - Servers: `https://{elastic_url}`
   - elastic_url: The portions of the Elasticsearch URL that follow https://

9. Click "Next", then "Finish".Test the connection using the "Test" feature in the extension UI

### 3. Create a test search action & steps to use the extension

1. Log in to watsonx Assistant and go to **Actions**.
2. Click "New action", then "Start from scratch".
3. Enter an example search query and click "Save".
4. The action automatically creates the first conversation step. Leave the trigger for this step as **Is taken** = `without conditions`. This step will be used to send the user input to Elasticsearch and get search results.
5. Click "Set variable values", then "Set new value", then "New session variable".
6. Enter the **name** as `input_text` and **type** as `Free text` then click "Apply". Set **To** to "`Expression`" and enter `input.text`.
7. Enter **Assistant says** with the text you want your assistant to say, for example:

```
input_text = $input_text
Here's what I found:
```

8. In the **And then** section, click "Use and extension".
9. Configure the values below:
   - Extension: Your custom extension name
   - Operation: `Search request to Elasticsearch`
   - Parameters: Complete the required and optional parameters with the required details for your search query. An example is below of how to configure this to use the `input_text` variable.

| Parameter name | Description                                                                                                                                                                       | Type       | Value                                                                                                                               |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `index_name`   | Comma-separated list of data streams, indices, and aliases to search. Supports wildcards (`*`). To search all data streams and indices, omit this parameter or use `*` or `_all`. | Text       | `my_documents`                                                                                                                      |
| `query`        | Defines the search definition using the Query DSL.                                                                                                                                | Expression | `{       "multi_match": {           "query": ${input_text},           "fields": ["text", "title", "url", "categories"]       }   }` |
| `_source`      | Indicates which source fields are returned for matching documents. Defaults to all fields.                                                                                        | Expression | `["title", "text", "url", "word_count"]`                                                                                            |
| `size`         | Defines the number of hits to return. Defaults to 10.                                                                                                                             | Number     | `2`                                                                                                                                 |

10. Click "Apply".
11. Note the step number of this conversation step, you can find it at the end of the browser URL, e.g., `step_179`.
12. Click "New step". Leave the trigger for this step as **Is taken** = `without conditions`. This step will be used to save the Elasticsearch output in a session variable so that it can be accessed from the watsonx Assistant API.
13. Click "Set variable values", then "Set new value", then "New session variable".
14. Enter the **name** as `search_result` and **type** as `Any` then click "Apply". Set **To** to "`Expression`" and using the step number you noted earlier enter `${step_179_result_1.body}`. Make sure to copy-paste the text into the box or it won't work.
15. Leave **Assistant says** as blank.
16. In the **And then** section, click "End the action".
17. Click the **save** icon.

## Expected Response Format

The `search_result` variable can be accessed in the result of a watsonx Assistant message API call at the following location:

```python
response = assistant.message_stateless(...)
result = response.get_result()
search_result=result["context"]["skills"]["actions skill"]["skill_variables"]["search_result"]
```

The search result has the following expected format:

```json
{
  "took": 5,
  "timed_out": false,
  "_shards": {
    "total": 1,
    "successful": 1,
    "skipped": 0,
    "failed": 0
  },
  "hits": {
    "hits": [
      {
        "_index": "my_documents",
        "_id": "abc",
        "_score": 1.234,
        "_ignored": ["def"],
        "_source": {
          "title": "Risk Management in Banking",
          "text": "This document outlines key risk management strategies...",
          "url": "https://example.com/risk-management",
          "word_count": 50,
          "categories": ["finance", "risk", "banking"]
        }
      }
    ]
  }
}
```

If there is an error, the search result has the following expected format:

```json
{
  "error": {
    "root_cause": [
      {
        "type": "index_not_found_exception",
        "reason": "no such index [asdfghjkl]",
        "resource.type": "index_or_alias",
        "resource.id": "asdfghjkl",
        "index_uuid": "_na_",
        "index": "asdfghjkl"
      }
    ],
    "type": "index_not_found_exception",
    "reason": "no such index [asdfghjkl]",
    "resource.type": "index_or_alias",
    "resource.id": "asdfghjkl",
    "index_uuid": "_na_",
    "index": "asdfghjkl"
  },
  "status": 404
}
```

## Important Notes

- Ensure all fields in your `_source` list exist in your index mapping
- The `_source` field in both the extension definition and action is crucial:
  - It lets you specify exactly which fields you want Elasticsearch to return
  - Without it, Elasticsearch would return ALL fields for matching documents (if the custom extention is used, rather than the OOTB connecter).
  - For example, if your documents have additional fields like `date_created` or `last_modified`, using `_source` ensures you only get back the fields you've listed.
- If you make updates to the OpenAPI spec to enable more features, you must reupload it to your custom extension and reauthenticate the extension.

```

```
