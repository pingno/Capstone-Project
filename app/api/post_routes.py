from flask import Blueprint, request
from flask_login import login_required, current_user
from app.forms import PostForm, upload_file_to_s3, get_unique_filename, remove_file_from_s3, error_message, error_messages
from app.models import db, Post, Album
from datetime import datetime

post_routes = Blueprint("post", __name__)

# GET ALL POSTS
@post_routes.route('/')
def get_all_posts():
    """
    Query for all posts and reutrns them in a list of post dictionaries
    """

    posts = Post.query.all()
    return {"posts": [post.to_dict() for post in posts]}

# GET POST BY ID
@post_routes.route('/<int:id>')
def get_post(id):
    """
    Query for a post by id and returns that post in a dictionary
    """
    post = Post.query.get(id)
    return post.to_dict_descriptive()

#


# # EDIT A POST BY ID
# @post_routes.route('/<int:id>', methods=["PUT", "PATCH"])
# @login_required
# def edit_post(id):
#     """
#     Query for a post by id, edit, and return
#     """
#     post = Post.query.get(id)
#     if not post:
#         return {"message": "Post not found"}, 404
#     elif post.user_id != current_user.id:
#         return {"message": "Forbidden"}, 403
#     else:
#         form = PostForm()
#         form['csrf_token'].data = request.cookies['csrf_token']
#         if form.validate_on_submit():
#             data = form.data
#             post.



@post_routes.route("/create", methods=["POST"])
@login_required
def create_post():
    """
    Create a new post and returns the new post in a dictionary
    """

    form = PostForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    #image file

    if form.validate_on_submit():
        data = form.data

        newPost = Post(
            user_id = current_user.id,
            # album_id = data["album_id"]
            headline = data["headline"],
            content = data["content"],
            date = datetime.now()
        )