#from model.model import predict
from os import name
from flask import Flask, render_template,request,redirect,url_for,Response
from datetime import date
from flask_mysqldb import MySQL
import yaml
from sentiment import prediction
import pandas as pd
import numpy as np
import pickle
from keras.preprocessing.sequence import pad_sequences
from keras.models import Sequential,load_model

with open('tokenizer.pickle', 'rb') as handle:
    tokenizer = pickle.load(handle)

def prediction(data):
    
    message = [data]
    seq = tokenizer.texts_to_sequences(message)
    padded = pad_sequences(seq, maxlen=500)
    
    class_names = ['joy', 'fear', 'anger', 'sadness', 'neutral']

    model = load_model(r'C:\Users\Ved Prakash Dubey\Documents\DB-setup\model\cnn_w2v.h5')

    pred = model.predict(padded)

    #print(class_names[np.argmax(pred)])

    return(class_names[np.argmax(pred)])

app = Flask(__name__)

db = yaml.safe_load(open('db.yaml'))
app.config['MYSQL_HOST'] = db['mysql_host']
app.config['MYSQL_USER'] = db['mysql_user']
app.config['MYSQL_PASSWORD'] = db['mysql_password']
app.config['MYSQL_DB'] = db['mysql_db']

mysql = MySQL(app)

@app.route('/',methods=['GET'])
def index():
    return render_template('index.html')

@app.route('/user',methods=['GET','POST'])
def index1():
    if request.method=='POST':
        userDetails = request.form
        name = userDetails['username']
        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO users(name) VALUES(%s)",(name,))
        mysql.connection.commit()
        cur.close()
    return render_template('name.html')

@app.route('/journal',methods=['GET','POST'])
def index2():
    if request.method=='POST':
        journalEntry = request.form
        entry = journalEntry['jentry']
        emo = prediction(entry)
        print(emo)
        cur = mysql.connection.cursor()
        cur.execute("UPDATE users SET sentiment = %s WHERE name = %s",(emo,name))
        mysql.connection.commit()
        cur.close()
    return render_template('journal.html')

if __name__ == '__main__':
    app.run(debug=True)