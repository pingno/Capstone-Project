from .db import db, environment, SCHEMA, add_prefix_for_prod
from .likes import likes


class Comment(db.Model):
    __tablename__ = "comments"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(500), nullable=False)
    date = db.Column(db.Date) #?

    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("posts.id")))
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))

    user = db.relationship("User", back_populates="comments")
    post = db.relationship("Post", back_populates="comments")


    def to_dict(self):
        return {
            "id": self.id,
            "content": self.content,
            "date": self.date,
            "post_id": self.post_id,
            "user_id": self.user_id,
        }
    
    def to_dict_descriptive(self):
        return {
            "id": self.id,
            "content": self.content,
            "date": self.date,
            "post_id": self.post_id,
            "user_id": self.user_id,

        }