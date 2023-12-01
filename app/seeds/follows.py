from ..models import db, SCHEMA, environment
from sqlalchemy.sql import text
from random import choice, sample, randint



def seed_follows(users):
    for user in users:
        following = sample(users, randint(1, len(users) - 1))
        user.following.extend(following)

    db.session.commit()


def undo_follows():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.wishlists RESTART IDENTITY CASCADE;") #wishlist / wishlists???
    else:
        db.session.execute(text("DELETE FROM follows"))

    db.session.commit()
