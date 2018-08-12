from typing import Any

from app import app, mongo, auth
import os
from flask import Flask, flash, request, redirect, url_for, abort, jsonify, session
from werkzeug.utils import secure_filename
from pymongo import MongoClient
from bson import json_util, ObjectId, Binary
from datetime import datetime
import bcrypt
import numpy as np
import soundfile

client = MongoClient()
folderName = 'uploads'
UPLOAD_FOLDER = './' + folderName
ALLOWED_EXTENSIONS = set(['wav'])
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
db = client.speechDatabase
recordingsCollection = db.recordings
usersCollection = db.users

def allowed_file(filename):
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return 'You want path: %s' % path

# @app.before_request
# def before_request():
    # if 'email' in session or request.endpoint == 'login' or request.endpoint == 'register':
    #     admin = usersCollection.find_one({ 'email': 'admin' })
    #     if admin is None :
    #         usersCollection.insert_one(adminObj)
    # else:            
    #     return redirect('login', code=200)

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
            response = mongo.pushToDatabase(filename)
            return mongo.prepareResponse(response)
    return '''
    <!doctype html>
    <title>Upload new File</title>
    <h1>Upload new File</h1>
    <form method=post enctype=multipart/form-data>
      <input type=file name=file>
      <input type=submit value=upload>
    </form>
    '''

adminObj = {
    'firstname' : 'admin', 
    'lastname' : 'admin', 
    'email' : 'admin',
    'empid' : '0000',
    'password' : bcrypt.hashpw('password'.encode('utf-8'), bcrypt.gensalt()),
    'industry' : 'admin', 
    'serviceline' : 'admin', 
    'servicearea' : 'admin', 
    'designation' : 'admin', 
    'location' : 'admin', 
    'mobileno' : 'admin',
    'permission': 'administrator'
}

def getData(fileName):
    data, rate = soundfile.read(fileName)
    power = 20*np.log10(np.abs(np.fft.rfft(data[:1024, 1])))
    frequency = np.abs(np.linspace(0, rate/2.0, len(power)))
    xValues = frequency.tolist()
    yValues = power.tolist()

    coordinates = []
    for index in range(0, len(power.tolist())):
        coordinate = {'x': xValues[index], 'y': yValues[index]}
        coordinates.append(coordinate)

    print(coordinates)
    return coordinates

@app.route('/getFileData', methods=['GET', 'POST'])
def getFileData():
    data = []
    fileData1 = getData(request.form['fileName1'])
    fileData2 = getData(request.form['fileName2'])
    print(fileData1)
    print(fileData2)
    return json_util.dumps({'fileData1':fileData1, 'fileData2':fileData2})

