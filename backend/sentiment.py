import pandas as pd
import numpy as np

# text preprocessing
from nltk.tokenize import word_tokenize
import re

# plots and metrics
import matplotlib.pyplot as plt
from sklearn.metrics import accuracy_score, f1_score, confusion_matrix

# preparing input to our model
from keras.preprocessing.text import Tokenizer
from keras.preprocessing.sequence import pad_sequences
#from keras.utils import to_categorical

# keras layers
from keras.models import Sequential,load_model
from keras.layers import Embedding, Bidirectional, LSTM, GRU, Dense

# Number of labels: joy, anger, fear, sadness, neutral
num_classes = 5

# Number of dimensions for word embedding
embed_num_dims = 300

# Max input length (max number of words) 
max_seq_len = 500

class_names = ['joy', 'fear', 'anger', 'sadness', 'neutral']

data_train = pd.read_csv(r'C:\Users\Ved Prakash Dubey\Downloads\nlp-text-emotion-master\data\data_train.csv', encoding='utf-8')
data_test = pd.read_csv(r'C:\Users\Ved Prakash Dubey\Downloads\nlp-text-emotion-master\data\data_test.csv', encoding='utf-8')

X_train = data_train.Text
X_test = data_test.Text

y_train = data_train.Emotion
y_test = data_test.Emotion

data = data_train.append(data_test, ignore_index=True)

def clean_text(data):
    
    # remove hashtags and @usernames
    data = re.sub(r"(#[\d\w\.]+)", '', data)
    data = re.sub(r"(@[\d\w\.]+)", '', data)
    
    # tekenization using nltk
    data = word_tokenize(data)
    
    return data

texts = [' '.join(clean_text(text)) for text in data.Text]

texts_train = [' '.join(clean_text(text)) for text in X_train]
texts_test = [' '.join(clean_text(text)) for text in X_test]

tokenizer = Tokenizer()
tokenizer.fit_on_texts(texts)

sequence_train = tokenizer.texts_to_sequences(texts_train)
sequence_test = tokenizer.texts_to_sequences(texts_test)

index_of_words = tokenizer.word_index

# vacab size is number of unique words + reserved 0 index for padding
vocab_size = len(index_of_words) + 1

print('Number of unique words: {}'.format(len(index_of_words)))

#message = ['delivery was hour late and my pizza was cold!']
import pickle

# saving
with open('tokenizer.pickle', 'wb') as handle:
    pickle.dump(tokenizer, handle, protocol=pickle.HIGHEST_PROTOCOL)

def prediction(data):
    
    message = [data]
    seq = tokenizer.texts_to_sequences(message)
    padded = pad_sequences(seq, maxlen=500)

    class_names = ['joy', 'fear', 'anger', 'sadness', 'neutral']

    model = load_model(r'C:\Users\Ved Prakash Dubey\Documents\DB-setup\model\cnn_w2v.h5')

    pred = model.predict(padded)

    print(class_names[np.argmax(pred)])
    return(class_names[np.argmax(pred)])
    #print(np.argmax(pred))

prediction('delivery was hour late and my pizza was cold!')