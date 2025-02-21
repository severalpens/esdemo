import requests
from bs4 import BeautifulSoup
import json
from pprint import pprint
from datetime import date

class FaqSchema:
    def __init__(self, url, question, answer):
        self.title = question
        self.summary = ""
        self.result_type = "FAQ"
        self.channel = "Website"
        self.answer = answer
        self.url = url
        self.created_date = date.today().isoformat()  # Convert date to string
        self.suggest = question

class Scraper:
    def __init__(self):
            pass
    
    def scrape_faqs(self):
        url = "https://www.suncorpbank.com.au/help-support/faqs/using-our-services.html"
        response = requests.get(url)
        soup = BeautifulSoup(response.content, 'html.parser')
        links = soup.find_all('a', href=True)
        help_support_links = [link['href'] for  link in links if link['href'].startswith('/help-support/faqs')]
        help_support_links = ['https://www.suncorpbank.com.au' + link for link in help_support_links]
        help_support_links = list(set(help_support_links))  

        print(f"Found {len(help_support_links)} help and support links")
        faqs = []

        for link in help_support_links:
            response = requests.get(link)
            soup = BeautifulSoup(response.content, 'html.parser')
            faq_sections = soup.find_all('div', class_='sg-Accordion')

            for section in faq_sections:
                question_element = section.find('button', class_='sg-Accordion-label')
                answer_element = section.find('div', class_='rte')
                
                if question_element and answer_element:
                    question = question_element.get_text(strip=True)
                    answer = answer_element.get_text(strip=True)
                    faq = FaqSchema(link, question, answer)
                    faqs.append({
                        "title": faq.title,
                        "summary": faq.summary,
                        "result_type": faq.result_type,
                        "channel": faq.channel,
                        "answer": faq.answer,
                        "url": faq.url,
                        "created_date": faq.created_date,
                        "suggest": faq.suggest
                    })


        json_output = json.dumps(faqs, indent=4)
        output_path = "./source_data/general_faqs.json"

        with open(output_path, "w", encoding="utf-8") as json_file:
            json_file.write(json_output)

        print(f"FAQs have been scraped and saved to {output_path}")
