# from ..models import db, SCHEMA, environment
# from sqlalchemy.sql import text
# from random import choice, sample, randint


# def seed_likes(users, posts):

#     for user in users:
#         # For each user, let's make them like some posts
#         liked_posts = sample(posts, randint(1, len(posts)))
#         user.postsLiked.extend(liked_posts)

#     db.session.commit()




# def undo_likes():
#     if environment == "production":
#         db.session.execute(f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
#     else:
#         db.session.execute(text("DELETE FROM likes"))

#     db.session.commit()