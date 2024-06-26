import requests
from bs4 import BeautifulSoup

def get_news(max_pages=1):
    all_news_items = []

    for page_number in range(1, max_pages + 1):
        url = f'https://www.moneycontrol.com/news/business/markets/page-{page_number}'
        response = requests.get(url)
        
        if response.status_code != 200:
            print(f"Failed to retrieve data from page {page_number}")
            continue

        soup = BeautifulSoup(response.content, 'html.parser')

        news_list = soup.find_all('li', class_='clearfix')

        for news in news_list:
            try:
                title_tag = news.find('a', title=True)
                title = title_tag.get('title') if title_tag else 'No title'
                date_time = news.find('span').text.strip() if news.find('span') else 'No date'
                description = news.find('p').text.strip() if news.find('p') else 'No description'
                link_tag = news.find('a', href=True)
                link = link_tag.get('href') if link_tag else 'No link'
                img_tag = news.find('img', {'data-src': True}) or news.find('img', src=True)
                img_link = img_tag.get('data-src') if img_tag and img_tag.has_attr('data-src') else (img_tag.get('src') if img_tag else 'No image')

                if img_link.startswith('//'):
                    img_link = 'https:' + img_link

                news_item = {
                    'title': title,
                    'description': description,
                    'date': date_time,
                    'source': "MoneyControl",
                    'url': link,
                    'image': img_link
                }

                all_news_items.append(news_item)
            except Exception as e:
                print(f"Error parsing news item: {e}")

    return all_news_items, 200




def get_news_by_url(url):
    response = requests.get(url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Safely find title
        title_tag = soup.find('h1', class_='article_title artTitle')
        title = title_tag.get_text(strip=True) if title_tag else None

        # Safely find author
        author_tag = soup.find('div', class_='article_author')
        author = author_tag.a.get_text(strip=True) if author_tag and author_tag.a else None

        # Safely find date
        date_tag = soup.find('div', class_='article_schedule')
        date = date_tag.span.get_text(strip=True) if date_tag and date_tag.span else None

        # Safely find description
        description_tag = soup.find('h2', class_='article_desc')
        description = description_tag.get_text(strip=True) if description_tag else None

        # Safely find full description
        content_div = soup.find('div', class_='content_wrapper arti-flow')
        if content_div:
            paragraphs = content_div.find_all('p')
            full_description = ' '.join(paragraph.get_text(strip=True) for paragraph in paragraphs)
        else:
            full_description = None

        # Safely find image link
        img_tag = soup.find('img', {'data-src': True}) or soup.find('img', src=True)
        img_link = img_tag.get('data-src') if img_tag and img_tag.has_attr('data-src') else (img_tag.get('src') if img_tag else None)
        if img_link and img_link.startswith('//'):
            img_link = 'https:' + img_link

        news_article = {
            "title": title,
            "author": author,
            "date": date,
            "description": description,
            "full_description": full_description,
            "image_url": img_link
        }
        
        return news_article, 200
    else:
        return {"error": "Failed to retrieve the article"}, response.status_code