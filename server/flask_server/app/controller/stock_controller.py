import yfinance as yf
import pandas as pd
import os
current_directory = os.getcwd()


def fetch_stock_data(stock_name, start_date):
    try:
        data = yf.download(stock_name, start=start_date, progress=False)
        ticker_info = yf.Ticker(stock_name)
        long_name = ticker_info.info['longName']
        return data, long_name
    except ValueError:
        return None, None
    
def fetch_live_price(stock_name):
    try:
        ticker_info = yf.Ticker(stock_name)
        current_price = ticker_info.info['currentPrice']
        open_price = ticker_info.info['open']
        return current_price, open_price
    except ValueError:
        return None

# def fetch_all_stock_data():
#     current_file_directory = os.path.dirname(os.path.realpath(__file__))
#     file = os.path.join(current_file_directory, '..', 'datasets', 'nse.csv')
#     nse = pd.read_csv(file)
#     nse['SYMBOL'] = nse['SYMBOL'].apply(lambda x: x + '.NS')
#     nse = nse[nse['CLOSE'] > 10]
#     nse = nse[nse['SYMBOL'].str.contains(r'^[A-Z]+')]
#     nse = nse.reset_index(drop=True)
#     nse = nse.sort_values('SYMBOL')
#     nse = nse['SYMBOL']
#     return nse

def fetch_all_stock_data():
    current_file_directory = os.path.dirname(os.path.realpath(__file__))
    file = os.path.join(current_file_directory, '..', 'datasets', 'nse_stocks.csv')
    nse = pd.read_csv(file)
    nse = nse[['Ticker', 'Name']]
    nse = nse.sort_values('Ticker')
    nse = nse.reset_index(drop=True)
    return nse