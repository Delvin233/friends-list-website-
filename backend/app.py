# DONT FROTGET TO UPDATE THE FILE FOR DEPLOYMENT

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(
    app
)  # this enables the client to send data from a different port to the server without errors

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///friends.db"
app.config["SQLALCHEMY_TRACK_NOTIFICATIONS"] = False
db = SQLAlchemy(app)

import routes  # though routes isnt called in this file, we import it so that we can use the routes created when we run the app.py file

# the import is placed here to prevent a cycle error when importing, since it is partially initualized( since we didnt use it :))

# we then create a contect in the backgrougn and all the tables we would use in a db
with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True)
