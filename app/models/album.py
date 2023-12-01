from .db import db, environment, SCHEMA, add_prefix_for_prod


class Album(db.Model):
    __tablename__ = "albums"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String(255), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(500), nullable=False)

    cover = db.Column(db.String(255), nullable=False)
    date = db.Column(db.Date) #?
    
    
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    user = db.relationship("User", back_populates="albums")

    posts = db.relationship("Post", back_populates="album", cascade="all, delete") #?



    def to_dict(self):
        return {
            "id": self.id,
            "category": self.category,
            "title": self.title,
            "description": self.description,
            "cover_image": self.cover_image,
            "date": self.date,
            "user_id": self.user_id
        }
    

    def to_dict(self):
        return {
            "id": self.id,
            "category": self.category,
            "title": self.title,
            "description": self.description,
            "cover_image": self.cover_image,
            "date": self.date,
            "user_id": self.user_id,
            "posts": [post.to_dict() for post in self.posts]
        }