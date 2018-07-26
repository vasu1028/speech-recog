from flask import Flask, session, request, redirect, url_for
from app import app, mongo, routes, exceptionHandler
from pymongo import MongoClient

import bcrypt

# ********************************************
# User Authentication Protocols
# ********************************************

client = MongoClient()
db = client.speechDatabase
usersCollection = db.users

@app.route('/login', methods=['POST'])
def login():
    login_user = usersCollection.find_one({'email' : request.form['email']})
    if login_user:
        if bcrypt.hashpw(request.form['password'].encode('utf-8'), login_user['password']) == login_user['password']:
            session['email'] = request.form['email']
            return redirect('/voiceAnalyzer', code=200)
    
    raise exceptionHandler.InvalidUsage('Invalid email/password combination', status_code=410)

@app.route('/register', methods=['POST', 'GET'])
def register():
    if request.method == 'POST':
        existing_user = usersCollection.find_one({'email' : request.form['email']})
        if existing_user is None:
            hashpass = bcrypt.hashpw(request.form['password'].encode('utf-8'), bcrypt.gensalt())
            usersCollection.insert({
                'firstname' : request.form['firstname'], 
                'lastname' : request.form['lastname'], 
                'email' : request.form['email'], 
                'empid' : request.form['empid'], 
                'password' : hashpass,
                'industry' : request.form['industry'], 
                'serviceline' : request.form['serviceline'], 
                'servicearea' : request.form['servicearea'], 
                'designation' : request.form['designation'], 
                'location' : request.form['location'], 
                'mobileno' : request.form['mobileno'],
                'permission': 'guest'
                })
            session['email'] = request.form['email']      
            return redirect('/login', code=200)
        else:
            raise exceptionHandler.InvalidUsage('User already exists', status_code=410)

if __name__ == 'app.auth':
    app.secret_key = 'speechSecret'
    app.run(debug=True)