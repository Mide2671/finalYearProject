import requests
from stem import Signal
from stem.control import Controller
from bs4 import BeautifulSoup

# Function to make requests through Tor
def make_tor_request(url):
    with Controller.from_port(port=9050) as controller:
        controller.signal(Signal.NEWNYM)
    proxies = {'http': 'socks5h://127.0.0.1:9050', 'https': 'socks5h://127.0.0.1:9050'}
    try:
        response = requests.get(url, proxies=proxies)
        return response.content
    except Exception as e:
        print(f"Error making request to {url} via Tor: {e}")
        return None

# Function to crawl a dark web page
def crawl_dark_web(url, depth=0, max_depth=3):
    if depth >= max_depth:
        return

    html_content = make_tor_request(url)
    if html_content:
        soup = BeautifulSoup(html_content, 'html.parser')
        # Process and analyze content here
        for link in soup.find_all('a'):
            href = link.get('href')
            if href and href.endswith('.onion'):
                print(f"Crawling: {href}")
                crawl_dark_web(href, depth + 1, max_depth)

# Main function
def main():
    # Start crawling from a known dark web directory
    starting_url = "http://adebisi26.netlify.app"
    crawl_dark_web(starting_url)

if __name__ == "__main__":
    main()