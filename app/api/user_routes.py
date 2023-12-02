from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import db, User

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict_descriptive() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict_descriptive()



# FOLLOW
@user_routes.route('/<int:id>/follow', methods=["POST"])
@login_required
def follow_user(id):
    """
    Query for a user and follow user
    """

    me = User.query.get(current_user.id)
    user = User.query.get(id)

    if not user: 
        return {"message": "User not found"}, 404
    
    else:
        user.followers.append(me)
        db.session.commit()
        return user.to_dict_descriptive(), 200
    
    


# UNFOLLOW

@user_routes.route('/<int:id>/unfollow', methods=["DELETE"])
@login_required
def unfollow_user(id):
    """
    Query for a user and unfollow
    """

    me = User.query.get(current_user.id)
    user = User.query.get(id)

    if not user:
        return {"message": "User not found"}, 404
    
    else:
        user.followers.remove(me)
        db.session.commit()
        return user.to_dict_descriptive(), 200