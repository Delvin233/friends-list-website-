from app import app, db
from flask import request, jsonify, abort
from models import Friend


# get all friends
@app.route("/api/friends", methods=["GET"])
def get_friends():
    friends = (
        Friend.query.all()
    )  # this is the advantage cors gives us. we did not need SELECT * FROM *
    result = [friend.to_json() for friend in friends]
    return jsonify(result), 200


# get a specific friend
@app.get("/api/friends/<int:identification>")
def get_specific_friend(identification):
    specific_friend = Friend.query.get(identification)
    if specific_friend is None:
        abort(404, jsonify({"error": "No friend of such identification"}))

    return jsonify(specific_friend.to_json()), 200


# create a friend
@app.post("/api/friends")
def create_friend():
    try:
        friend_data = request.json

        # required fields for the user to input
        required_fields = ["name", "gender"]
        for required in required_fields:
            if required not in friend_data or not friend_data.get(
                required
            ):  # throw an error if the required fields arent filled or if the fields are all empty

                return jsonify({"error": f"{required} required."})
        # we pass data data requested into the respective module
        name = friend_data.get("name")
        role = friend_data.get("role")
        description = friend_data.get("description")
        gender = friend_data.get("gender")

        # for the img_url
        # we fetch an avatar for a specific gender with a third party API
        if gender == "male":
            img_url = f" https://avatar.iran.liara.run/public/boy?username={name}"
        elif gender == "female":
            img_url = f" https://avatar.iran.liara.run/public/girl?username={name}"
        else:
            img_url = None
        new_friend = Friend(
            name=name,
            role=role,
            description=description,
            gender=gender,
            img_url=img_url,
        )
        # this part is like git add and git push
        db.session.add(new_friend)
        db.session.commit()

        return jsonify(new_friend.to_json()), 201
    except Exception as e:
        db.session.rollback()
        abort(500, jsonify({"error": {e}}))


# Delete a friend
@app.delete("/api/friends/<int:identification>")
def delete_friend(identification):
    try:
        friend = Friend.query.get(identification)
        # exception for the case where that friend isn't in our list
        if friend is None:
            return jsonify({"error": "No friend as such."}), 404

        db.session.delete(friend)
        db.session.commit()
        return jsonify({"message": "Friend removed successfully"}), 200

    except Exception as e:
        db.session.rollback()
        abort(500, jsonify({"error": {e}}))


# Update a friend
# we can use patch or put, the difference is that put is to update the whole resource
# whiles patch is to update a specific field of the resource
@app.patch("/api/friends/<int:identification>")
def update_friend(identification):
    try:
        friend = Friend.query.get(identification)
        friend_data = request.json
        # if the identification of friend does not exist
        if friend is None:
            abort(404, jsonify({"error": "No friend of such identification"}))

        friend.name = friend_data.get("name", friend.name)
        friend.role = friend_data.get("role", friend.role)
        friend.description = friend_data.get("description", friend.description)
        friend.gender = friend_data.get("gender", friend.gender)

        # we comnmit right away since the the parameters to add have been added above directly
        db.session.commit()
        return jsonify(friend.to_json()), 200

    except Exception as e:
        db.session.rollback()
        abort(500, jsonify({"error": {e}}))
