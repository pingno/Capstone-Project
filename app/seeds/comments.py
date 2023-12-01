from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text

from ..models.comment import Comment
from datetime import datetime

# Adds a demo user, you can add other users here if you want
def seed_comments():

    comment1 = Comment(
        post_id = 9,
        user_id = 1,
        content = "Love seeing the process of your growth.  It's inspired me to do just the same.  Keep up the good work!",
        date = datetime.now()
    )

    comment2 = Comment(
        post_id = 10,
        user_id = 1,
        content = "You definitely have to teach me!",
        date = datetime.now()
    )

    comment3 = Comment(
        post_id = 11,
        user_id = 1,
        content = "Wow someday I might want to learn doing this as well!",
        date = datetime.now()
    )

    comment4 = Comment(
        post_id = 12,
        user_id = 1,
        content = "I love this so much!",
        date = datetime.now()
    )

    comment5 = Comment(
        post_id = 1,
        user_id = 2,
        content = "Wow these look so good!  Keep it up!",
        date = datetime.now()
    )

    comment6 = Comment(
        post_id = 2,
        user_id = 2,
        content = "Wow I hope these turn out great!",
        date = datetime.now()
    )

    comment7 = Comment(
        post_id = 3,
        user_id = 2,
        content = "It's okay, you got this.  I believe in you and know you will be great at it!",
        date = datetime.now()
    )

    comment8 = Comment(
        post_id = 4,
        user_id = 2,
        content = "Yooooo, let's play sometime!",
        date = datetime.now()
    )

    comment9 = Comment(
        post_id = 5,
        user_id = 3,
        content = "Let's goooooooo!",
        date = datetime.now()
    )

    comment10 = Comment(
        post_id = 6,
        user_id = 3,
        content = "Can't wait to see what your journey is like",
        date = datetime.now()
    )

    comment11 = Comment(
        post_id = 7,
        user_id = 3,
        content = "You inspire me so much",
        date = datetime.now()
    )

    comment12 = Comment(
        post_id = 8,
        user_id = 3,
        content = "I'm so proud of you!",
        date = datetime.now()
    )


    comment13 = Comment(
        post_id = 13,
        user_id = 4,
        content = "Keep up the good work!  You're killing it!",
        date = datetime.now()
    )

    
    comment14 = Comment(
        post_id = 14,
        user_id = 4,
        content = "Sending you love",
        date = datetime.now()
    )

    comment15 = Comment(
        post_id = 15,
        user_id = 4,
        content = "LET'S GOOOOOOO",
        date = datetime.now()
    )

    comment16 = Comment(
        post_id = 16,
        user_id = 4,
        content = "Thanks for being you",
        date = datetime.now()
    )

    

    all_comments = [comment1, comment2, comment3, comment4, comment5, comment6, comment7, comment8, comment9, comment10, comment11, comment12, comment13, comment14, comment15, comment16]
    add_comments = [db.session.add(comment) for comment in all_comments]
    db.session.commit()



def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))
        
    db.session.commit()