
import re
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import sent_tokenize
from nltk.stem import WordNetLemmatizer
text = "\n\n\n\n\tProducts\n\tRegistration\n\tLogin\n\n\n\n\n\nDCdutchconnectionUK - Shipping from United KingdomDCdutchconnectionUK is BACK after a long hiatus. Lots has changed since we have been gone but our strong stance on providing honest quality products with out adulterants supported by lab results and superb customer feedback has not.\n \n \nWe have seen our fair share of success and have an abundance of experience.  \n \n Therefore we can assure you that your order will be shipped same day when placed before 3.00pm, ready for next day delivery Mon-Fri.  \n \n Saturday delivery before 10am (not guaranteed).\n \n DCdutchConnectionUK only sells the best there is. Be do NOT sell low purity, cut or low grade products! \n  \n Any off our long term customers will know this, We want to let you know that when ordering with DCUK you are getting the very best.  \n Sometimes this means that this is reflected in the price. We are not the cheapest but we like to think we have the BEST price to quality ratio. \n FREE shipping for all orders 150 GBP+.\n\n \n \n\n \n \n \n\n\nProductPriceQuantity\n\n\n\n\nFISHSCALE COCAINE 1.5g80 GBP = 0.00158 ฿\n\n\n\n X \n\n\nFISHSCALE COCAINE 5g230 GBP = 0.00454 ฿\n\n\n\n X \n\n\nFISHSCALE COCAINE 10g400 GBP = 0.00790 ฿\n\n\n\n X \n\n\nPURE PLATINUM MDMA 92% 15g80 GBP = 0.00158 ฿\n\n\n\n X \n\n\nPURE PLATINUM MDMA 92% 30g150 GBP = 0.00296 ฿\n\n\n\n X \n\n\nPURE PLATINUM MDMA 92% 50g200 GBP = 0.00395 ฿\n\n\n\n X \n\n\nAMNESIA HAZE - THC 21% - NEW BEST BATCH! 15g110 GBP = 0.00217 ฿\n\n\n\n X \n\n\nAMNESIA HAZE - THC 21% - NEW BEST BATCH! 30g190 GBP = 0.00375 ฿\n\n\n\n X \n\n\nAMNESIA HAZE - THC 21% - NEW BEST BATCH! 55g310 GBP = 0.00612 ฿\n\n\n\n X \n\n\nROCK ISOMER S+ KETAMINE EC 99% 7g100 GBP = 0.00198 ฿\n\n\n\n X \n\n\nROCK ISOMER S+ KETAMINE EC 99% 15g200 GBP = 0.00395 ฿\n\n\n\n X \n\n\nROCK ISOMER S+ KETAMINE EC 99% 30g320 GBP = 0.00632 ฿\n\n\n\n X \n\n\nLSD BLOTTERS REAL 220ug PSYCHEDELIC FLOWERS 15x75 GBP = 0.00148 ฿\n\n\n\n X \n\n\nLSD BLOTTERS REAL 220ug PSYCHEDELIC FLOWERS x50190 GBP = 0.00375 ฿\n\n\n\n X \n\n\nLSD BLOTTERS REAL 220ug PSYCHEDELIC FLOWERS 100x310 GBP = 0.00612 ฿\n\n\n\n X \n\n\nROLEX'S 150MG+ MDMA ECSTACY PILLS 100x95 GBP = 0.00188 ฿\n\n\n\n X \n\n\nROLEX'S 150MG+ MDMA ECSTACY PILLS x200180 GBP = 0.00356 ฿\n\n\n\n X \n\n\nROLEX'S 150MG+ MDMA ECSTACY PILLS 500x350 GBP = 0.00691 ฿\n\n\n\n X \n\n\n\n\n\n\n\n\n\n\n\n"

def preprocess_text(text):
    # Remove newline characters
    text = text.replace('\n', ' ')
    
    text = re.sub(r'\b[xX]\b', '', text)
    # Tokenize text into sentences
    sentences = sent_tokenize(text)
    # Initialize an empty list to store preprocessed sentences
    preprocessed_sentences = []
    # Preprocess each sentence
    for sentence in sentences:
        # Tokenize sentence into words
        words = nltk.word_tokenize(sentence)
        # Remove stopwords
        stop_words = set(stopwords.words('english'))
        words = [word for word in words if word.lower() not in stop_words]
        # Remove non-alphanumeric characters and lowercase all words
        words = [re.sub(r'[^a-zA-Z]', '', word.lower()) for word in words]
        # Join the preprocessed words back into a single string (sentence)
        preprocessed_sentence = ' '.join(words) + '.'
        # Add preprocessed sentence to the list
        preprocessed_sentences.append(preprocessed_sentence)
    # Join the preprocessed sentences back into a single string
    processed_text = ' '.join(preprocessed_sentences)
    with open('p.txt', 'w') as f:
         f.write(processed_text)
    return processed_text
preprocess_text(text)