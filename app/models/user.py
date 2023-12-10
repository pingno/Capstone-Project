from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .follows import follows
from .likes import likes

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=False)
    email = db.Column(db.String(255), nullable=False, unique=False)
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_image = db.Column(db.String(255), nullable=True)
    bio = db.Column(db.String(500), nullable=True)

    albums = db.relationship("Album",  back_populates="user", cascade="all, delete-orphan") #? secondary?
    posts = db.relationship("Post", back_populates="user", cascade="all, delete-orphan")
    comments = db.relationship("Comment", back_populates="user", cascade="all, delete-orphan")

    # likes = db.relationship("Like", back_populates="user") #
    postsLiked = db.relationship(
        "Post",
        secondary=likes,
        back_populates="userLikes"
    )


    followers = db.relationship(
        "User", 
        secondary=follows,
        primaryjoin=(follows.c.follower_id == id),
        secondaryjoin=(follows.c.followed_id == id),
        backref=db.backref("following", lazy="dynamic"),
        lazy="dynamic"
    )

 

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)
    


    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            "profile_image": self.profile_image,
            "bio": self.bio
        }


    def to_dict_descriptive(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            "profile_image": self.profile_image,
            "bio": self.bio,
            "postsLiked": [post.id for post in self.postsLiked],

            "albums":[album.to_dict() for album in self.albums],
            "posts": [post.to_dict() for post in self.posts],
            "comments": [comment.to_dict() for comment in self.comments],
            "followers": [user.just_followers() for user in self.followers],
            
            # "num_followers": len(self.followers),
            # "num_albums": len(self.albums),
            # "num_posts": len(self.posts)

        }


    def just_followers(self):
        return {
            "id": self.id,
            "username": self.username
        }