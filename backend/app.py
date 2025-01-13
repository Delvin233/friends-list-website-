from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import routes

app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///friends.db"
app.config["SQLALCHEMY_TRACK_NOTIFICATIONS"] = False
db = SQLAlchemy(app)


if __name__ == "__main__":
    app.run(debug=True)
