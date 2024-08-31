from nltk.tokenize import sent_tokenize, word_tokenize
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer, WordNetLemmatizer
stop_words = set(stopwords.words('english'))
import sys

text = sys.argv[1]

def process (text):
        sentences = sent_tokenize(text)
        stemmer = PorterStemmer()
        lemmatizer = WordNetLemmatizer()
        for sentence in sentences:
            # Tokenize words in the sentence
            words = word_tokenize(sentence)
            # Filter out stopwords
            filtered_words = [word for word in words if word.lower() not in stop_words]
            #performing stemming
            # lemmatized_words = [lemmatizer.lemmatize(word) for word in filtered_words]
            stemmed_words = [stemmer.stem(word) for word in filtered_words]
            # Join the filtered words back into a sentence
            # processed_sentence = ' '.join(lemmatized_words)
            processed_sentence = ' '.join(stemmed_words)
            # Print the filtered sentence
            print (processed_sentence)

process(text)