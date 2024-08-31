import sys

data = sys.argv[1]


from joblib import load
import pickle
from sklearn.feature_extraction.text import TfidfVectorizer
from nltk.tokenize import sent_tokenize
from pathlib import Path

tx =  data
sent= sent_tokenize(tx)
response =  ''
arr = []
# current = Path.cwd()
path1 = "C:/Users/Adebisi/Desktop/FinalYearProjectCode/backend/controllers/vtmodel.joblib"
path2 = 'C:/Users/Adebisi/Desktop/FinalYearProjectCode/backend/controllers/ntfidf_vectorizer.pkl'
for sentence in sent:
    model = load(path1)
    with open(path2, 'rb') as f:
        tfidf_vectorizer = pickle.load(f)
    tokens = sentence.split()
    X_input = tfidf_vectorizer.transform([' '.join(tokens)])
    predictions = model.predict(X_input.toarray())
    arr.append(''.join(predictions))
 
for attack in arr:
    if attack == 'Cyber Attack' or attack == 'Cyber Attack ' or attack == 'Counterfeit Money' or attack == 'Terrorism' or attack == 'Human Trafficking' or attack == 'Weapon Trading' or attack == 'Drug Trafficking':
        response = 'red'
        response = response +' , '+ attack;
        break
    else:
        response = 'green'
        response = response +' , Normal';
print(response)