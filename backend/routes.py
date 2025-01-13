from app import app, db
from flask import request, jsonify
from models import friend


# get all friends
@app.route("/api/friends", methods=["GET"])
def get_friends():
    friends = friend.query.all()
    result = [friend.to_json() for frined in friends]
    return jsonify(result), 200
