import os
from dotenv import load_dotenv
from elasticsearch import Elasticsearch

load_dotenv()

from flask import (Flask, redirect, render_template, request,
                   send_from_directory, url_for)

from flask_cors import CORS


app = Flask(__name__)
CORS(app)


@app.route('/')
def index():
   print('Request for index page received')
   return render_template('index.html')

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')

@app.route('/hello', methods=['POST'])
def hello():
   name = request.form.get('name')

   if name:
       print('Request for hello page received with name=%s' % name)
       return render_template('hello.html', name = name)
   else:
       print('Request for hello page received with no name or blank name -- redirecting')
       return redirect(url_for('index'))

@app.route('/getstring', methods=['GET'])
def getstring():
       return "Here is the string you requested"

@app.route('/getjson', methods=['GET'])
def getjson():
       return {"key": "value"}

if __name__ == '__main__':
   app.run()
