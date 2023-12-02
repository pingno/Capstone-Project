from flask import Blueprint, request
from flask_login import login_required, current_user
from app.forms import PostForm, CommentForm
from app.models import db, Post, Comment, User
from datetime import datetime
from .AWS_helpers import get_unique_filename, upload_file_to_s3, remove_file_from_s3


post_routes = Blueprint("posts", __name__)

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



# UPDATE A POST BY ID
@post_routes.route('/<int:id>/edit', methods=["PATCH"])
@login_required
def edit_post(id):
    """
    Query for a post by id, edit, and return
    """
    post = Post.query.get(id)
    if not post:
        return {"message": "Post not found"}, 404
    
    elif post.user_id != current_user.id:
        return {"message": "Forbidden"}, 403
    
    else:
        form = PostForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():

            post.headline=form.data["headline"]
            post.content=form.data["content"]

            if form.image.data:
                image = form.image.data
                image.filename = get_unique_filename(image.filename)
                upload = upload_file_to_s3(image)
                
                if "url" not in upload:
                    return upload, 401
                
                remove_file_from_s3(post.image)
                post.image = upload["url"]
        
        db.session.commit()
        return post.to_dict_descriptive(), 201



# DELETE POST BY ID
@post_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_post(id):
    post = Post.query.get(id)
    if not post:
        return {"message": "Review not found"}, 404
    elif post.user_id != current_user.id:
        return {"message": "Forbidden"}, 403
    else:
        db.session.delete(post)
        db.session.commit()
        return {"message": "Success"}



# CREATE COMMENT FOR A POST
@post_routes.route('/<int:id>/comments/create', methods=["POST"])
@login_required
def create_comment(id):
    post = Post.query.get(id)

    if post.user_id != current_user.id:
        return {"message": "Forbidden"}, 403
    
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        comment = Comment (
            user_id = current_user.id,
            post_id = post.id,
            content = form.data["content"],
            date = datetime.now()
        )

        db.session.add(comment)
        db.session.commit()
        return comment.to_dict_descriptive() 
    


# #GET ALL LIKES FOR POST
# @post_routes.route('/<int:id/likes')
# @login_required
# def all_post_likes(id):
#     post = Post.query.get(id)

#     likes = post.userLikes
#     return len(likes)


# LIKE
@post_routes.route('/<int:id>/likes/add', methods=["POST"])
@login_required
def add_like(id):

    user = User.query.get(current_user.id)
    post = Post.query.get(id)

    if not post:
        return {"Message": "Post not found"}, 404
    else:
        post.userLikes.append(user)
        db.session.commit()
        return post.to_dict_descriptive(),201


# UNLIKE

@post_routes.route('/<int:id>/likes/remove', methods=["DELETE"])
@login_required
def remove_like(id):
    user = User.query.get(current_user.id)
    post = Post.query.get(id)
    if not post:
        return {"Message": "Post not found"}, 404
    else:
        post.userLikes.remove(user)
        db.session.commit()
        return post.to_dict_descriptive(),201