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
import random 
import zipfile
import subprocess
import shutil
import base64

from .extensions import mongo
from .models import db

import stripe
# This is your real test secret API key.
stripe.api_key = "sk_test_51IILoMEapMBXivyEFUo3RGf0gAnpzctdT5ZupkD0p748SGlD8HRuRXS51LSWYJgqKYsQwXSYQy3Zfd4jsPYVom3X00tCbg9Vm2"

run = Blueprint('run', __name__)

from .models import users

ec2 = boto3.client('ec2')
ssm = boto3.client('ssm',region_name='us-east-1')
lamb = boto3.client('lambda')
s3 = boto3.client('s3')
session = boto3.session.Session()

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
    users_collection.insert({'email' : email, 'purchases': [], 'time':[], 'entries': [], 'projectName':[], 'git': [], 'inUse': [], 'projectID': [], 'projectType': []})
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
    projectID = generateProjectID()
    addEntry(request_data['email'], request_data['projectName'], request_data['git'], request_data['time'], request_data['entries'], projectID, request_data['projectType'])
    return jsonify(message=True)

def generateProjectID():
    val = random.randint(0, 100000000000000)
    return val

def addEntry(email, projectName, git, time, entries, projectID, projectType):
    users_collection = mongo.db.users
    users_collection.update_one(
        {"email": email}, {
            "$push": {
                "projectName": projectName,
                "git": git, 
                "time": time,
                "entries": entries,
                "projectID": projectID,
                "projectType": projectType
                }});
    print("Information: projectName, git, time, entries, projectID, and projectType have been Added to MongoDB")

@run.route('/api/Delete', methods=['GET', 'POST'])
def deleteInstance(instance):
    # Pass Name of Instances from react to delete
    ids = []
    ec2.instances.filter(InstanceIds=ids).terminate()

@run.route('/api/Projects', methods=['GET', 'POST'])
def sendProjects():
    gitArr = list()
    projectNameArr = list()
    entriesArr = list()
    timeArr = list()
    purchasesArr = list()
    inUseArr = list()
    request_data = json.loads(request.data)
    users_collection = mongo.db.users
    check = users_collection.find_one({"email": request_data['email']})
    val = len(check)
    print(val)
    if val > 2:
        result = users_collection.find({"email": request_data['email']})
        for r in result:
            gitArr.append(r['git'])
            projectNameArr.append(r['projectName'])
            entriesArr.append(r['entries'])
            timeArr.append(r['time'])
            purchasesArr.append(r['purchases'])
            inUseArr.append(r['inUse'])
        return jsonify(projectName=projectNameArr, git=gitArr, time=timeArr, entries=entriesArr, purchases=purchasesArr, inUse=inUseArr)
    else:
        return jsonify(message=False)

@run.route('/api/SearchProjects', methods=['GET', 'POST'])
def searchProjects():
    request_data = json.loads(request.data)
    users_collection = mongo.db.users
    check = users_collection.find({"projectName": request_data['searchValue']})
    resultArr = list()
    IDArr = list()
    count = 0
    for item in check:
        count = 0 
        for i in item['projectName']:
            if i == request_data['searchValue']:
                resultArr.append(i)
                IDArr.append(item['projectID'][count])
            count = count + 1
    return jsonify(message=resultArr, projectID=IDArr)

@run.route('/api/GetProjectInfo', methods=['GET', 'POST'])
def getProjectID():
    request_data = json.loads(request.data)
    users_collection = mongo.db.users
    check = users_collection.find({"projectID": request_data['projectID']})
    arr = list( users_collection.find())
    for item in arr:
        count = 0
        for i in item["projectID"]:
            print(type(i))
            print(request_data['projectID'])
            if str(i) == request_data['projectID']:               
                return jsonify(projectName=item['projectName'][count])
                print("matched")
            count = count + 1
    return jsonify(message=False)

@run.route('/create-payment-intent', methods=['POST'])
def create_payment():
    try:
        data = json.loads(request.data)
        intent = stripe.PaymentIntent.create(
            amount=calculate_order_amount(data['items']),
            currency='usd'
        )
        return jsonify({
          'clientSecret': intent['client_secret']
        })
    except Exception as e:
        return jsonify(error=str(e)), 403

def calculate_order_amount(items):
    # Replace this constant with a calculation of the order's amount
    # Calculate the order total on the server to prevent
    # people from directly manipulating the amount on the client
    return 1400

@run.route('/api/AddPurchase', methods=['GET', 'POST'])
def addPurchase():
    request_data = json.loads(request.data)
    print(request_data['projectID'])
    users_collection = mongo.db.users
    users_collection.update_one(
        { "email": request_data['email']},
        { "$push":
            {
                "purchases": request_data['projectID']
            }
        }
    ) 
    return jsonify(message=True)

@run.route('/api/RunProgram', methods=['GET', 'POST'])
def runProgram():
    request_data = json.loads(request.data)
    information = findProgramInfo(request_data['projectID']) 
    projectType = getProjectType(request_data['projectID'])
    key = amazonKeyStore()
    print(projectType)
    if projectType[0] == 'Server':
        instance = launchInstance(key, information[0])
        arrInstance = storeInstance(instance)
        addInstanceMongo(request_data['email'], arrInstance)
        addInUse(request_data['email'], request_data['projectID'])
    elif projectType[0] == 'Function':
        print("Function")
        repoName = getZipFile(information[0])
        storeInS3(repoName, key)
        launchFunction(repoName)
    else:
        print("Not a Server or Function")
    return jsonify(message=True)

def getProjectType(projectID):
    users_collection = mongo.db.users
    check = users_collection.find({}, {"projectID": 1})
    for item in check:
        count = 0
        for i in item['projectID']:
            if str(i) == str(projectID):
                cursor = users_collection.find({'_id': item['_id']})
                for doc in cursor:
                    return [doc['projectType'][count]]
            count = count + 1
    return print("Failed getting projectType")

def addInstanceMongo(email, instanceInfo):
    #Add arrInstance (instance info) to user's document
    users_collection = mongo.db.users
    users_collection.update_one(
        { "email": email},
        { "$push":
            {   
                "instances": instanceInfo
            }   
        }   
    )   
    return

def addInUse(email, projectID):
    users_collection = mongo.db.users
    users_collection.update_one(
        { "email": email},
        { "$push":
            {   
                "inUse": projectID
            }   
        }   
    )   
    return

def findProgramInfo(projectID):
    print("Find Software Information to Run, returned as [git, time, [entries]]")
    users_collection = mongo.db.users
    check = users_collection.find({}, {"projectID": 1})
    for item in check:
        count = 0
        for i in item['projectID']:
            if str(i) == str(projectID):
                cursor = users_collection.find({'_id': item['_id']})
                for doc in cursor:
                    return [doc['git'][count], doc['time'][count], doc['entries'][count]]
            count = count + 1
    return print("Failed getting Software Information") 
    #Get Gitlink using projectID

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
    KeyName='MainKeyPair'
    print("Key pair has been called")
    return KeyName

def launchInstance(key, repoLink):
    git = repoLink[20:]
    countSlash = 0
    repoName = ''

    for char in git:
        if char == '.':
            break
        if countSlash == 1:
            repoName = repoName + char
        if char == '/':
            countSlash = countSlash + 1

    user_data = '''#!/bin/bash
    sudo yum update -y
    sudo yum install git -y
    sudo yum install docker -y
    cd /home/ec2-user
    git clone {}
    cd {}
    sudo curl -L "https://github.com/docker/compose/releases/download/1.28.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    sudo service docker start
    sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
    sudo docker-compose up
    '''.format(repoLink, repoName)

    instance = ec2.run_instances(
        ImageId='ami-0be2609ba883822ec',
        MinCount=1,
        MaxCount=1,
        InstanceType='t2.micro',
        KeyName=key,
        UserData=user_data,
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

def getZipFile(repoLink):
    git = repoLink[20:]
    countSlash = 0 
    repoName = ''
    for char in git:
        if char == '.':
            break
        if countSlash == 1:
            repoName = repoName + char
        if char == '/':
            countSlash = countSlash + 1 
    command = 'git clone {} /Users/stephenthomas/desktop/Apptetra/backend/{}'.format(repoLink, repoName)
    os.system(command)
    print("Added git files to folder")
    print(repoName)
#    shutil.make_archive('temp', 'zip', '/Users/stephenthomas/desktop/Apptetra/backend/app/{}'.format(repoName))
#    archive = zipfile.ZipFile('function.zip', 'w')
#    archive.write('function.py', '/Users/stephenthomas/desktop/Apptetra/backend/app/{}/function.py'.format(repoName))
#    fileName = '/Users/stephenthomas/desktop/Apptetra/backend/app/{}'.format(repoName)
#    current_region = session.region_name
#    s3.create_bucket(Bucket= repoName,
#        CreateBucketConfiguration={'LocationConstraint':'us-east-2'})
#    s3.put_object(Body=archive, Bucket=repoName, Key='function.zip')  
    return repoName

def storeInS3(repoName, key):
    fileName = '/Users/stephenthomas/desktop/Apptetra/backend/app/{}'.format(repoName)
#    archive = shutil.make_archive('temp', 'zip', '/Users/stephenthomas/desktop/Apptetra/backend/app/{}'.format(repoName))  
    archive = zipfile.ZipFile('function.zip', 'w')
    archive.write('function.py', '/Users/stephenthomas/desktop/Apptetra/backend/app/{}/function.py'.format(repoName))
    current_region = session.region_name
    s3.create_bucket(Bucket= repoName.lower(),
        CreateBucketConfiguration={'LocationConstraint':'us-east-2'})
    s3.put_object(Body=archive, Bucket=repoName.lower(), Key='temp.zip')
#    uploadFileNames = []
#    for root, dirs, files in os.walk(fileName, topdown=False):
#       for name in files:
#          fname=os.path.join(root, name)
#          print (fname)
#          uploadFileNames.append(fname)
#    print ('uploadFileNames = {}'.format(uploadFileNames))    
#    for filename in uploadFileNames:
#       # with open(fileName, 'rb') as data:
#        s3.upload_file(Filename=filename, Bucket=repoName, Key=filename)
    return print("New bucket Created and Data Uploaded")

def clearTempFolder(repoName):
    pass

def file_get_contents(filename):
    with open(filename) as f:
        return f.read()

def launchFunction(repoName):
    create_lambda_function = lamb.create_function(
        FunctionName=repoName,
        Runtime='python3.7',
        Role='arn:aws:iam::090093254535:role/AppTetraAdmin',
        Handler='{}.lambda_handler'.format('lambda_build'),
        Description='Run Function',
        Code={'S3Bucket':'{}'.format(repoName.lower()), 'S3Key':'function.zip',}
    )  

@run.route('/api/StopProgram', methods=['GET', 'POST'])
def stopProgram():
    request_data = json.loads(request.data)
    terminateInstance(request_data['email'], request_data['inUse'])
    #terminate ec2 instance 
    return jsonify(message=True)

def terminateInstance(email, inUse):
    users_collection = mongo.db.users
    check = users_collection.find({'email': email})
    for item in check:
        count = 0
        for i in item['inUse']:
            if str(i) == str(inUse):
                print(count)
                instanceID = list()
                instanceID.append(str(item['instances'][count][0]['InstanceId']))
                users_collection.update({'email': email},
                    {'$pull': {'instances': item['instances'][count]} })
                users_collection.update({'email': email},
                    {'$pull': {'inUse': inUse } })
                ec2.terminate_instances(InstanceIds=instanceID)
                return print("Terminated Instance")
    return print("Instance Termination Failed")
if __name__ == '__main__':
    run.run(debug=True)

#KEYSTORE
#    outputfile = open('ec2-keypair.pem', 'w')                                                                                                          
#    key_pair = ec2.create_key_pair(KeyName='ec2-keypair101')
#    KeyPairOut = str(key_pair['KeyMaterial'])
#    print(KeyPairOut)
#    outputfile.write(KeyPairOut)


#    instanceList = convertSSMList(arrInstance[0]['InstanceId'])
#    ipAddress = getIPAddress(instanceList)
#    sshEC2(ipAddress)
#    instanceCommands(instanceList)


#def instanceCommands(instanceId):
#    commands = ['yum update', 'yum install git', 'yum install docker-compose']
#    sendCommand = ssm.send_command(
#        DocumentName="AWS-RunShellScript",
#        Parameters={'commands': commands},
#        InstanceIds=instanceId,
#    )                                                                                                                                                  
#    print("Commands to EC2 Have been sent")
#    return sendCommand


#def amazonSecurityGroup():
#    security = ec2.create_security_group(
#        GroupName = 'Access',
#        Description = '',
#        VpcId = ''
#    )
#    print("Security group has been created")
#    return security

#def getIPAddress(instanceList):
#    print('getIPAddress has started')
#    stream = os.popen('aws ec2 describe-instances')
#    output1 = stream.read()
#    output = json.loads(output1)
#    size = len(output['Reservations'][0])
#    for i in range(0,size):
#        instanceName = output['Reservations'][i]['Instances'][0]['InstanceId']
#        print(instanceName)
#        print(instanceList[0])
#        
#        if instanceName == instanceList[0]:
#            ipAddress = output['Reservations'][i]['Instances'][0]['PublicIpAddress']
#            print(ipAddress)
#            return ipAddress

#def sshEC2(ipAddress):
#    key = paramiko.RSAKey.from_private_key_file('/Users/stephenthomas/desktop/Keypairs/MainKeyPair.pem')
#    client = paramiko.SSHClient()
#    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
#    try:
#        client.connect(hostname=ipAddress, username="ec2-user", pkey=key)
#        print("SSH into EC2")
#        stdin, stdout, stderr = client.exec_command('sudo yum update')
#        for line in stdout.read().splitlines():
#            print(line)
#        client.close()
#    except Exception as  e:
#        print (e)




##################################################
##################################################








