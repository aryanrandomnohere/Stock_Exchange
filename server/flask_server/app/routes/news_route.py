from flask import Blueprint, jsonify
from app.controller.news_controller import get_news, get_news_by_url

news_route = Blueprint('news_route', __name__)


@news_route.route('/news', methods=['GET'])
def get_news_route():
    news_titles, status_code = get_news()
    return jsonify(news_titles), status_code

@news_route.route('/news/<path:url>', methods=['GET'])
def get_news_by_url_route(url):
    news_article, status_code = get_news_by_url(url)
    return jsonify(news_article), status_code
