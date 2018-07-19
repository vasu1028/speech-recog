from app import app, mongo
import os
from flask import Flask, flash, request, redirect, url_for, abort, jsonify
from werkzeug.utils import secure_filename
from pymongo import MongoClient
from bson import json_util, ObjectId, Binary
from datetime import datetime

client = MongoClient()
folderName = 'uploads'
UPLOAD_FOLDER = './' + folderName
ALLOWED_EXTENSIONS = set(['wav'])
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
db = client.speechDatabase
collection = db.recordings

def allowed_file(filename):
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def index():
    return 'app initiating...'

@app.route('/test', methods=['GET', 'POST'])
def test():
    return __name__

@app.route('/upload', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            flash('No file part')
            return redirect(request.url)
        file = request.files['file']
        # if user does not select file, browser also
        # submit an empty part without filename
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        if file and allowed_file(file.filename) and not mongo.existInDatabase(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            mongo.pushToDatabase(filename)
            return redirect(url_for('upload_file', filename=filename))
    return '''
    <!doctype html>
    <title>Upload new File</title>
    <h1>Upload new File</h1>
    <form method=post enctype=multipart/form-data>
      <input type=file name=file>
      <input type=submit value=upload>
    </form>
    '''