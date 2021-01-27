from flask import Blueprint, Flask, request, render_template, redirect, jsonify, json
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

from sqlalchemy import select, desc, text
import requests
from flask_cors import CORS
import boto3

from .extensions import mongo
from .models import db

run = Blueprint('run', __name__)

from .models import users

ec2 = boto3.resource('ec2')

@run.route('/')
def hello():
    return 'Hello World'

@run.route('/api/create', methods=['GET','POST'])
def create():
    request_data = json.loads(request.data)
    status  = existingUser(request_data['email'])
    if status == False:
        newUser = users(emails = request_data['email'], names = request_data['name'], passwords = request_data['password'], accounts = request_data['account'])
        try:
            db.session.add(newUser)
            db.session.commit()
            AllUsers = users.query.all()
            print (AllUsers)
            mongoDBUser(request_data['email'])
            return jsonify(message="Success Posting to Database")
        except:
            return jsonify(message="Failed Posting to Database")
    else:
        return jsonify(message=True)

def existingUser(checkEmail):
    status = users.query.filter_by(emails=checkEmail).first()
    if status == None:
        return False #If the user does not exist
    else:
        return True  #If the user does exist

def mongoDBUser(email):
    users_collection = mongo.db.users
    users_collection.insert({'email' : email})
    return

@run.route('/api/signIn', methods=['GET','POST'])
def signIn():
    request_data = json.loads(request.data)
    print(request_data)
    # Query Database to see if email exists
    statusEmail = existingUser(request_data['email'])
    if statusEmail == True:
    # Query Database to see if password matches that email that was queried
        statusPassword = checkPassword(request_data['email'], request_data['password'])
        if statusPassword == True:
            return jsonify(message="you have an account and password match")
        else:
            return jsonify(message=False)
    else:
        return jsonify(message=True)
    return

def checkPassword(checkEmail,password):
    user  = users.query.filter_by(emails=checkEmail).first()
    userPassword = user.passwords
    if userPassword == password:
        return True
    else:
        return False
    return

def existingUser(checkEmail):
    status = users.query.filter_by(emails=checkEmail).first()
    if status == None:
        return False #If the user does not exist
    else:
        return True #If the user does exist
    return

@run.route('/api/SubmitProject', methods=['GET', 'POST'])
def SubmitProject():
    request_data = json.loads(request.data)
    addEntry(request_data['email'], request_data['projectName'], request_data['git'], request_data['time'], request_data['entries'])
    return jsonify(message=True)    

def addEntry(email, projectName, git, time, entries):
    users_collection = mongo.db.users
    users_collection.update_one(
        {"email": email}, {
            "$push": { 
                "projectName": projectName,
                "git": git, 
                "time": time,
                "entries": entries
                }});
def amazonKeyStore():
    pass
if __name__ == '__main__':
    run.run(debug=True)








