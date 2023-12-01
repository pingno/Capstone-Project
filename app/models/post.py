from .db import db, environment, SCHEMA, add_prefix_for_prod
from .likes import likes

class Post(db.Model):
    __tablename__ = "posts"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    headline = db.Column(db.String(255), nullable=False)
    content = db.Column(db.String(500), nullable=False)
    image = db.Column(db.String(255), nullable=False)
    date = db.Column(db.Date)

    album_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("albums.id")))
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))

    comments = db.relationship("Comment", back_populates="post", cascade="all, delete")
    user = db.relationship("User", back_populates="posts")
    album = db.relationship("Album", back_populates="posts")
    
    userLikes = db.relationship(
        "User",
        secondary=likes,
        back_populates="postsLiked"
    )

    

    def to_dict(self):
        return{
            "id": self.id,
            "headline": self.headline,
            "content": self.content,
            "image" : self.image,
            "date": self.date,

            "album_id": self.album_id,
            "user_id": self.user_id,

            "comments": [comment.to_dict_descriptive() for comment in self.comments],
            "likes": len(self.userLikes)
        }