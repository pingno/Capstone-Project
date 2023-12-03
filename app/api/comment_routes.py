from flask import Blueprint, request
from flask_login import login_required, current_user
from app.forms import CommentForm
from app.models import db, Post, Comment
from datetime import datetime



comment_routes = Blueprint("comments", __name__)

# GET ALL COMMENTS
@comment_routes.route('/')
def get_all_pcomment():
    """
    Query for all comments and reutrns them in a list of post dictionaries
    """

    comments = Comment.query.all()
    return [comment.to_dict_descriptive() for comment in comments]


# GET COMMENT BY ID
@comment_routes.route('/<int:id>')
def get_comment(id):
    """
    Query for a comment by id and returns that post in a dictionary
    """
    comment = Comment.query.get(id)
    return comment.to_dict_descriptive()



# GET ALL USERS COMMENTS
@comment_routes.route('/current')
@login_required
def get_user_comments():
    
    return [comment.to_dict_descriptive() for comment in current_user.comments]




# UPDATE A COMMENT BY ID
@comment_routes.route('/<int:id>/edit', methods=["PUT"])
@login_required
def edit_comment(id):
    """
    Query for a post by id, edit, and return
    """
    comment = Comment.query.get(id)
    if not comment:
        return {"message": "Comment not found"}, 404
    
    elif comment.user_id != current_user.id:
        return {"message": "Forbidden"}, 403
    
    else:
        form = CommentForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():

            comment.content=form.data["content"]

        db.session.commit()
        return comment.to_dict_descriptive(), 201



# DELETE COMMENT BY ID
@comment_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_comment(id):
    comment = Comment.query.get(id)
    if not comment:
        return {"message": "Review not found"}, 404
    elif comment.user_id != current_user.id:
        return {"message": "Forbidden"}, 403
    else:
        db.session.delete(comment)
        db.session.commit()
        return {"message": "Success"}


