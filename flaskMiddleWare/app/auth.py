from flask import Flask, session, request, redirect
from app import app, mongo, routes
from pymongo import MongoClient

import bcrypt

# ********************************************
# User Authentication Protocols
# ********************************************

app = Flask(__name__)

client = MongoClient()
db = client.speechDatabase
collection = db.users

@app.route('/login', methods=['POST'])
def login():
    users = collection.users
    login_user = users.find_one({'name' : request.form['username']})

    if login_user:
        if bcrypt.hashpw(request.form['pass'].encode('utf-8'), login_user['password'].encode('utf-8')) == login_user['password'].encode('utf-8'):
            session['username'] = request.form['username']
            return redirect(request.url)

    return 'Invalid username/password combination'

@app.route('/register', methods=['POST', 'GET'])
def register():
    if request.method == 'POST':
        users = collection.users
        existing_user = users.find_one({'name' : request.form['username']})

        if existing_user is None:
            hashpass = bcrypt.hashpw(request.form['pass'].encode('utf-8'), bcrypt.gensalt())
            users.insert({
                'name' : request.form['username'], 
                'designation' : request.form['designation'], 
                'serviceLine' : request.form['serviceLine'], 
                'company' : request.form['company'], 
                'office' : request.form['office'], 
                'email' : request.form['email'], 
                'phone' : request.form['phone'], 
                'region' : request.form['region'], 
                'password' : hashpass
                })
            session['username'] = request.form['username']
            return redirect(request.url)
        
        return 'Username already exist!'

    return ''

if __name__ == '__main__':
    app.secret_key = 'speechSecret'
    app.run(debug=True)