from typing import Any

from app import app, mongo, auth, retrieveData, exceptionHandler
import os
from flask import Flask, flash, request, redirect, url_for, abort, jsonify, session, g
from werkzeug.utils import secure_filename
from pymongo import MongoClient
from bson import json_util, ObjectId, Binary
from datetime import datetime, timedelta
import bcrypt
import numpy as np
import soundfile
from flask_cors import CORS, cross_origin
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

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
@cross_origin()
def catch_all(path):
    return 'You want path: %s' % path

@app.before_request
def before_request():
    if request.method != 'OPTIONS':
        if request.endpoint == 'login' or request.endpoint == 'register':
            admin = usersCollection.find_one({ 'email': 'admin' })
            if admin is None :
                usersCollection.insert_one(adminObj)
        elif 'Authorization' not in request.headers:
            raise exceptionHandler.InvalidUsage('Un Authorized User', status_code=420)
        if 'Authorization' in request.headers and auth.isUserLoggedIn(request.headers['Authorization']) is None:
            raise exceptionHandler.InvalidUsage('Session Timed Out', status_code=420)
    else:
        return ''

@app.route('/upload', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        #  file = request.files['file']
        #     if file and allowed_file(file.filename):
        #         filename = secure_filename(file.filename)
        #         file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

        #         ## snippet to read code below
        #         file.stream.seek(0) # seek to the beginning of file
        #         myfile = file.file # will point to tempfile itself
        #         dataframe = pd.read_csv(myfile)
        #         ## end snippet
        user = auth.getLoggedInUser(request.headers['Authorization'])
        # check if the post request has the file part
        file = request.files['file']
        # if user does not select file, browser also
        # submit an empty part without filename
        if file.filename == '':
            flash('No file part')
            return exceptionHandler.InvalidUsage('Invalid Recording', status_code=420)
        if file and allowed_file(file.filename) and not mongo.existInDatabase(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            response = mongo.pushToDatabase(filename, user['email'], user['permission'])
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
    'firstName' : 'admin', 
    'lastNname' : 'admin', 
    'email' : 'admin',
    'empId' : '0000',
    'password' : bcrypt.hashpw('password'.encode('utf-8'), bcrypt.gensalt()),
    'industry' : 'admin', 
    'serviceLine' : 'admin', 
    'serviceArea' : 'admin', 
    'designation' : 'admin', 
    'location' : 'admin', 
    'mobileNo' : 'admin',
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
    fileData1 = getData(request.json['fileName1'])
    fileData2 = getData(request.json['fileName2'])
    return json_util.dumps({'fileData1':fileData1, 'fileData2':fileData2})

@app.route('/getUserAudioFiles', methods=['GET', 'POST'])
def getUserAudioFiles():
    user = auth.getLoggedInUser(request.headers['Authorization'])
    print(user['email'])
    return mongo.retrieve(user['email'])

@app.route('/getDemoUserAudioFiles', methods=['GET', 'POST'])
def getDemoUserAudioFiles():
    return retrieveData.retrieveDemoRecordings()

@app.route('/getMyUserAudioFiles', methods=['GET', 'POST'])
def getMyUserAudioFiles():
    user = auth.getLoggedInUser(request.headers['Authorization'])
    return retrieveData.retrieveMyRecordings(user['email'])

