from flask import Blueprint, Flask, request, render_template, redirect, jsonify, json
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import select, desc, text
import requests
from flask_cors import CORS
from .extensions import mongo
from .models import db

run = Blueprint('run', __name__)

from .models import users

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

if __name__ == '__main__':
    run.run(debug=True)
