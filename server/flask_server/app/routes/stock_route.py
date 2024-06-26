from flask import Blueprint, jsonify, request
from app.controller.stock_controller import fetch_stock_data, fetch_live_price, fetch_all_stock_data
from datetime import datetime, timedelta

stock_route = Blueprint('stock_route', __name__)


def calculate_start_date(range):
    end_date = datetime.now()
    if range == '1w':
        start_date = end_date - timedelta(weeks=1)
    elif range == '1m':
        start_date = end_date - timedelta(days=30)
    elif range == '3m':
        start_date = end_date - timedelta(days=91)
    elif range == '6m':
        start_date = end_date - timedelta(days=182)
    elif range == '1y':
        start_date = end_date - timedelta(days=365)
    elif range == '5y':
        start_date = end_date - timedelta(days=5*365)
    else:
        start_date = datetime(2000, 1, 1)
    return start_date.strftime('%Y-%m-%d')


@stock_route.route('/stock/<stockName>')
def get_stock_data(stockName):
    range = request.args.get('range', '1m')  # Default to 1 month
    start_date = calculate_start_date(range)
    data, long_name = fetch_stock_data(stockName, start_date)
    if data is not None:
        return jsonify({"data": data.to_json(), "longName": long_name})
    else:
        return jsonify({"error": "Failed to fetch data"}), 500


@stock_route.route('/stock/liveprice/<stockName>')
def get_live_price(stockName):
    current_price, open_price = fetch_live_price(stockName)
    if current_price is not None:
        return jsonify({"current_price": current_price, "open_price": open_price})
    else:
        return jsonify({"error": "Failed to fetch data"}), 500


@stock_route.route('/symbol')
def fetch_all_stock_data_route():
    data = fetch_all_stock_data()
    return jsonify(data.to_json())
