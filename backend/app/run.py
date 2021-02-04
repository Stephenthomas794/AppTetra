from flask import Blueprint, Flask, request, render_template, redirect, jsonify, json
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

from sqlalchemy import select, desc, text
import requests
from flask_cors import CORS
import boto3
import time
import os
import json
import paramiko

from .extensions import mongo
from .models import db

run = Blueprint('run', __name__)

from .models import users

ec2 = boto3.client('ec2')
ssm = boto3.client('ssm',region_name='us-east-1')

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
    key = amazonKeyStore()
    instance = launchInstance(key)
    arrInstance = storeInstance(instance)
    instanceList = convertSSMList(arrInstance[0]['InstanceId'])
    print(".....sleeping")
    time.sleep(800)
    ipAddress = getIPAddress(instanceList)
    sshEC2(ipAddress)
#    instanceCommands(instanceList)
    addEntry(request_data['email'], request_data['projectName'], request_data['git'], request_data['time'], request_data['entries'], arrInstance)
    return jsonify(message=True)

def addEntry(email, projectName, git, time, entries, arrInstance):
    users_collection = mongo.db.users
    users_collection.update_one(
        {"email": email}, {
            "$push": {
                "projectName": projectName,
                "git": git, 
                "time": time,
                "entries": entries,
                "instances": arrInstance
                }});
    print("Information: projectName, git, time, entries, instances has been added to MongoDB")

def storeInstance(instance):
    arr = []
    for i in instance['Instances']:
        arr.append(i)
    print("Turn instance information into array")
    return arr

def convertSSMList(instance):
    instanceStr = str(instance)
    instanceList = list()
    instanceList.append(instanceStr)
    print("Instance Name has been converted to List String")
    print(instanceList)
    return instanceList

def amazonKeyStore():
#    outputfile = open('ec2-keypair.pem', 'w')
#    key_pair = ec2.create_key_pair(KeyName='ec2-keypair101')
#    KeyPairOut = str(key_pair['KeyMaterial'])
#    print(KeyPairOut)
#    outputfile.write(KeyPairOut)
    KeyName='MainKeyPair'
    print("Key pair has been called")
    return KeyName

def amazonSecurityGroup():
    security = ec2.create_security_group(
        GroupName = 'Access',
        Description = '',
        VpcId = ''
    )
    print("Security group has been created")
    return security

def getIPAddress(instanceList):
    print('getIPAddress has started')
    stream = os.popen('aws ec2 describe-instances')
    output1 = stream.read()
    output = json.loads(output1)
    size = len(output['Reservations'][0])
    for i in range(0,size):
        instanceName = output['Reservations'][i]['Instances'][0]['InstanceId']
        print(instanceName)
        print(instanceList[0])
        if instanceName == instanceList[0]:
            ipAddress = output['Reservations'][i]['Instances'][0]['PublicIpAddress']
            print(ipAddress)
            return ipAddress

def sshEC2(ipAddress):
    key = paramiko.RSAKey.from_private_key_file('/Users/stephenthomas/desktop/Keypairs/MainKeyPair.pem')
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    try:
        client.connect(hostname=ipAddress, username="ec2-user", pkey=key)
        print("SSH into EC2")
        stdin, stdout, stderr = client.exec_command('sudo yum update')
        for line in stdout.read().splitlines():
            print(line)
        client.close()
    except Exception as  e:
        print (e)

def launchInstance(key):
    instance = ec2.run_instances(
        ImageId='ami-04d29b6f966df1537',
        MinCount=1,
        MaxCount=1,
        InstanceType='t2.micro',
        KeyName=key,
        TagSpecifications=[
            {
            'ResourceType' : 'instance',
                'Tags' : [
                    {'Key' : 'AppTetraKey',
                    'Value' : 'AppTetraKey'},
            ]}]
    )
    print("Instance has been launched")
    return instance

def instanceCommands(instanceId):
    commands = ['yum update', 'yum install git', 'yum install docker-compose']
    sendCommand = ssm.send_command(
        DocumentName="AWS-RunShellScript",
        Parameters={'commands': commands},
        InstanceIds=instanceId,
    )
    print("Commands to EC2 Have been sent")
    return sendCommand

@run.route('/api/Delete', methods=['GET', 'POST'])
def deleteInstance(instance):
    # Pass Name of Instances from react to delete
    ids = []
    ec2.instances.filter(InstanceIds=ids).terminate()

if __name__ == '__main__':
    run.run(debug=True)


































