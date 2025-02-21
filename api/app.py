import os
from dotenv import load_dotenv
from elasticsearch import Elasticsearch

load_dotenv()

client = Elasticsearch(
    hosts=[os.environ.get("ES_URL")],
    api_key=os.environ.get("ES_API_KEY")
)
from flask import (Flask, redirect, render_template, request,
                   send_from_directory, url_for)

from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
   print('Request for index page received')
   return "API is running"

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')


@app.route('/index/<index_name>')
def get_index(index_name):
    objectApiResponse = client.search(index=index_name)
    return objectApiResponse.get('hits').get('hits')

@app.route('/test1', methods=['GET'])
def test1():
    q = request.get_json().get('q')
    return q

@app.route('/index/<index_name>', methods=['POST'])
def get_filtered_index_documents(index_name):
    objectApiResponse = client.search(index=index_name, body=request.json)
    return objectApiResponse.get('hits').get('hits')

if __name__ == '__main__':
   app.run()
