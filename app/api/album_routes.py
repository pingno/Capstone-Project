from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Album, Post
from app.forms import AlbumForm, PostForm
from .AWS_helpers import upload_file_to_s3, get_unique_filename, remove_file_from_s3
from datetime import datetime


album_routes = Blueprint("albums", __name__)

# GET ALL ALBUMS
@album_routes.route('/')
def get_all_albums():
    """
    Query for all albums and reutrns them ina  list of album dictionaries
    """
    albums = Album.query.all()
    return {"albums": [album.to_dict_descriptive() for album in albums]}

# GET ALBUM BY ID
@album_routes.route('/<int:id>')
def get_album(id):
    """
    Query for a album by id and returns that album in a dictionary
    """
    album = Album.query.get(id)
    return album.to_dict_descriptive()

# CREATE ALBUM
@album_routes.route('/create', methods=["POST"])
@login_required
def create_album():
    """
    Create a new album and returns the new album in a dictionary
    """

    form = AlbumForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        new_album = {
            "user_id": current_user.id,
            "category": form.category.data,
            "title": form.title.data,
            "description": form.description.data,
            "date": datetime.now()
        }

        if form.cover.data:
            image = form.cover.data
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)

            if "url" not in upload:
                return upload, 401
            
            new_album["cover"] = upload["url"]

        album = Album(**new_album)
        db.session.add(album)
        db.session.commit()
        return album.to_dict_descriptive(), 201
    elif form.errors:
        return {"errors": form.errors}, 401
    else:
        return {"unknown", "An unknown Error has occured"}, 500
    



# UPDATE ALBUM
@album_routes.route("/<int:id>/edit", methods=["PUT"])
@login_required
def update_album(id):

    album = Album.query.get(id)

    if album is None:
        return {'message': "Album doesn't exist"}, 404
    if current_user.id != album.user_id:
        return {'message': "You do not have permission to update this product"}, 403
    
    form = AlbumForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        # if form.category.data:
        album.category = form.category.data
        # if form.title.data:
        album.title = form.title.data
        # if form.description.data:
        album.description = form.description.data

        if form.cover.data:
            cover = form.cover.data
            if cover:
                cover.filename = get_unique_filename(cover.filename)
                if album.cover:
                    remove_file_from_s3(album.cover)
                    uploadCover = upload_file_to_s3(cover)

                if "url" not in uploadCover:
                    print(uploadCover)
                    return uploadCover
                else:
                    album.cover = uploadCover["url"]

        db.session.commit()

        return album.to_dict_descriptive(), 201
    else:
        return {"errors": form.errors}, 400
    

# # UPDATE ALBUM IMAGE
# @album_routes.route("/<int:id>", methods=["PUT", "PATCH"])
# @login_required
# def update_album_image(id):

#     album = Album.query.get(id)

#     if album.user_id != current_user.id:
#         return {"message": "Forbidden"}, 403
    
#     form = AlbumForm()
#     form['csrf_token'].data = request.cookies['csrf_token']

#     if form.validate_on_submit():
#         cover = form.data["cover"]
#         if cover:
#             cover.filename = get_unique_filename(cover.filename)
#             if album.cover:
#                 remove_file_from_s3(album.cover)
#             uploadCover = upload_file_to_s3(cover)

#             if "url" not in uploadCover:
#                 print(uploadCover)
#                 return uploadCover
#             else:
#                 album.cover = uploadCover["url"]

#         db.session.commit()

#         return {"album": album.to_dict_descriptive()}
#     else:
#         return {"errors", form.errors}, 400



# DELETE ALBUM
@album_routes.route('/<int:id>/delete', methods=["DELETE"])
@login_required
def delete_album(id):
    """
    Deletes an album and returns a message if successfully deleted
    """

    album = Album.query.get(id)

    if album.user_id != current_user.id:
        return {"errors", "Authorization Error"}, 403
    
    if album.cover is not None:
        file_to_delete = remove_file_from_s3(album.cover)

        if file_to_delete is True:
            db.session.delete(album)
            db.session.commit()
            return {"message": "Album successfully deleted"}
        else:
            return {"errors", "File deletion error"}, 401
        
    else:
        db.sesssion.delete(album)
        db.session.commit()
        return {"message": "Album successfully deleted"}
    



# CREATE POST FOR ALBUM
# goes to album
@album_routes.route('/<int:id>/posts/create', methods=['POST'])
@login_required
def add_album_post(id):
    
    album = Album.query.get(id)

    if album.user_id != current_user.id:
        return {"message": "Forbidden"}, 403
    
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        data = form.data
        newPost = Post (
            album_id = id,
            user_id = current_user.id,
            headline = data["headline"],
            content = data["content"],
            date = datetime.now()
        )

        if data["image"]:
            image = data["image"]
            image.filename = get_unique_filename(image.filename)
            uploadPostImage = upload_file_to_s3(image)

            if "url" not in uploadPostImage:
                print(uploadPostImage)
                return uploadPostImage
            else:
                newPost.image = uploadPostImage["url"]


        db.session.add(newPost)
        db.session.commit()
        return newPost.to_dict(), 201
    return {"errors": form.errors}, 400



