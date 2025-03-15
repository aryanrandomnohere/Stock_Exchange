from flask import Flask
import logging
from flask_cors import CORS
from app.routes.stock_route import stock_route
from app.routes.news_route import news_route
from app.middleware import handle_error

log = logging.getLogger('werkzeug')
log.setLevel(logging.WARNING)

app = Flask(__name__)
CORS(app)

app.register_blueprint(stock_route)
app.register_blueprint(news_route)

app.register_error_handler(Exception, handle_error)

if __name__ == "__main__":
    app.run(debug=True, port)