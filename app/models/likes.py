from .db import db, environment, SCHEMA, add_prefix_for_prod

likes = db.Table(
    "likes",
    db.Model.metadata,
    db.Column("user_id", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), primary_key=True),
    db.Column("post_id", db.Integer, db.ForeignKey(add_prefix_for_prod("posts.id")), primary_key=True)
)


if environment == "production":
        likes.schema = SCHEMA


# class Like(db.Model):
    # __tablename__ = "likes"

    # if environment == "production":
    #     __table_args__ = {'schema': SCHEMA}

    # user_id = db.Column(db.Integer, db.ForeignKey("users.id"), primary_key=True)
    # liked_id = db.Column(db.Integer, db.ForeignKey("posts.id"), primary_key=True)
    # # Add any other necessary fields...

    # user = db.relationship("User", back_populates="liked_posts")
    # post = db.relationship("Post", back_populates="likes")