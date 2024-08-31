import requests
from bs4 import BeautifulSoup

# Function to crawl a single page
def crawl_page(url):
    # Fetch the web page
    response = requests.get(url)
    if response.status_code == 200:
        # Parse the HTML content
        soup = BeautifulSoup(response.text, 'html.parser')
        # Extract all content within the body tag
        body_content = soup.body

        # Print the body content
        print(body_content.prettify())
    else:
        print("Failed to fetch the page:", url)

# Example usage
crawl_page("https://adebisi26.netlify.app")
