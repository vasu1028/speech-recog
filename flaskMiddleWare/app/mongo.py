from app import app, routes, transcribe
import os
from flask import Flask, flash, request, redirect, url_for, abort, jsonify
from werkzeug.utils import secure_filename
from pymongo import MongoClient
from bson import json_util, ObjectId, Binary
from datetime import datetime

# ********************************************
# Mongo DB connection functions
# ********************************************

def prepareResponse(data):
    res = { 'result': data }
    return json_util.dumps(res)

@app.route('/retrieve', methods=['GET', 'POST'])
def retrieve():
    data = routes.collection.find()
    if routes.collection.count() == 0:
        data = "no data"
    return prepareResponse(data)
    

@app.route('/insert', methods=['POST'])
def insert():
   newCollectionId = routes.collection.insert_one(request.json)
   newData = routes.collection.find_one({'_id': newCollectionId.inserted_id})
   return prepareResponse(newData)

def pushToDatabase(fileName):
    absolutePath = os.path.abspath(os.path.join(app.config['UPLOAD_FOLDER'], fileName))
    text = transcribe.transcribe_file(absolutePath)
    obj = {
        'fileName': fileName,
        'absolutePath': absolutePath,
        'timeStamp': datetime.now().strftime("%Y%m%d-%H%M%S"),
        'type': 'audio/wav',
        'text': text
    }
    newCollectionId = routes.collection.insert_one(obj)
    newData = routes.collection.find_one({'_id': newCollectionId.inserted_id})
    return prepareResponse(newData)

def existInDatabase(fileName):
    data = routes.collection.find({'fileName': fileName})
    return data and data.count() > 0
