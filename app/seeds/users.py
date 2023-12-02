from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    # demo = User(
    #     username='Demo', email='demo@aa.io', password='password')
    user1 = User(
        username='spiderwoman', 
        email='sophia@aa.io', 
        password='password', 
        profile_image="https://www.superherohype.com/wp-content/uploads/sites/4/2023/06/spider-woman-header.png?w=1024",
        bio="Hi, Welcome to my page.  I've always loved creating and trying new things.  Hopefully you can appreciate my struggle, but I want to be able to inspire others through the process!  Grateful to have a community like this where people can support each other.")
    user2 = User(
        username='mattdaddykim', 
        email='matt@aa.io', 
        password='password', 
        profile_image="https://us.123rf.com/450wm/kyyybic/kyyybic2205/kyyybic220500011/185424748-an-urban-guy-isolated-vector-illustration-calm-anthropomorphic-frog-wearing-a-street-style-outfit.jpg",
        bio="What's up my people.  I'm Matt and I love all things frogs.  I'm glad I'm able to share my interests in new things that I've been doing or trying to do.  Love the community we have here!")
    user3 = User(
        username='sophyanggang', 
        email='siphie@aa.io', 
        password='password', 
        profile_image="https://us.123rf.com/450wm/kyyybic/kyyybic2205/kyyybic220500011/185424748-an-urban-guy-isolated-vector-illustration-calm-anthropomorphic-frog-wearing-a-street-style-outfit.jpg",
        bio="Hi! My page is about encouraging others to try new things and sharing my experiences with the world so that I could help others through the process.  I hope you enjoy my feed :)")
    user4 = User(
        username='meterpeter', 
        email='peter@aa.io', 
        password='password', 
        profile_image="https://c8.alamy.com/comp/RGW68W/professional-boy-gamer-holding-gaming-keyboard-over-colorful-pink-and-blue-neon-lit-wall-gaming-gamers-concept-RGW68W.jpg",
        bio="What's up gang, my name is Peter and I love gaming.  I also enjoy being outdoors and experiencing new things in life.  I play a ton of games, but I don't mind being out and learning new things.  Watch me grow and be the best version of myself!"
    )

    user1.followers.append(user2)
    user1.followers.append(user3)
    user1.followers.append(user4)
    user2.followers.append(user3)
    user2.followers.append(user1)
    user2.followers.append(user4)
    user3.followers.append(user1)
    user3.followers.append(user2)
    user4.followers.append(user1)
    user4.followers.append(user3)




    all_users = [user1, user2, user3, user4]
    add_users = [db.session.add(user) for user in all_users]


    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()