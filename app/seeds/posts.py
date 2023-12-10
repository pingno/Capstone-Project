from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
from ..models.post import Post
from datetime import datetime
from faker import Faker
from random import choices, randint

fake = Faker()


def seed_posts():
    
    post1 = Post(
        user_id = 1,
        album_id = 1,
        headline = "Day 1, Learning how to make fried rice",
        content = "I've always loved eating takeout from chinese restaurants, so I decided to stop by the grocery store and pick up some common Asian ingredients.  It turned out way better than I expected!  So worth the effort and I even added my own levels of flavoring to it as well.",
        image = "https://www.averiecooks.com/wp-content/uploads/2022/05/beeffriedrice-13-540x720.jpg",
        date = datetime.now()
    )

    post2 = Post(
        user_id = 1,
        album_id = 1,
        headline = "Day 2, Learning how to make congee",
        content = "My parents used to make congee for our family whenever it was cold season or if one of us got sick.  This recipe really hits home and made it felt heart warming.  The dish didn't turn out how I expected, but it's a learning process!  I'll be sure to make it a whole lot better next time!",
        image = "https://www.thespruceeats.com/thmb/5f1AUqYbY4CsjHSeqvDUau7OjaQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/basic-congee-recipes-4065244-hero-01-5cf81547c34d4520be10bb57c6cda902.jpg",
        date = datetime.now()
    )

    post3 = Post(
        user_id = 1,
        album_id = 2,
        headline = "Day 6 , Picking up a few plants!",
        content = "I started digging my backyard a few days ago and was able to pick up some seeds at my local farmers shop.  Now I'm learning how to grow my babies so they can blossom and be beautiful",
        image = "https://himama.s3.amazonaws.com/uploads/learning/learning_media_file/image/file/2873/medium_Plant%2BSeeds.jpg",
        date = datetime.now()
    )

    post4 = Post(
        user_id = 1,
        album_id = 2,
        headline = "Day 10 , Thank you mother nature!",
        content = "It started pouring the past few days, but it's been really nice that I've been able to save on my water utilities haha.  Hopefully my babies are getting enough water to grow bright and healthy!",
        image = "https://s3-us-west-1.amazonaws.com/contentlab.studiod/getty/785f07b5a4e44b3e8b8ebb953ef09dec.jpg",
        date = datetime.now()
    )

    post5 = Post(
        user_id = 1,
        album_id = 3,
        headline = "Day 1 , This class gave me the chills!",
        content = "I've never felt so nervous taking a dance class, but I know it's all about the process and the growth and I'm here for it!  The class has been really supportive and loving so I feel alot better about it.",
        image = "https://www.kennedy-center.org/globalassets/education/opportunities-for-artists/pre-professional-artist-training/contemporary-dance-class-series/contemporary-dance-class-series-169.jpg?width=1600&quality=70",
        date = datetime.now()
    )

    post6 = Post(
        user_id = 1,
        album_id = 3,
        headline = "Day 10 , Learning choreography",
        content = "I've been taking more classes recently and boy have I struggled, but I see myself improving day by day and I hope that I can show you all one day of the work I've put in!  It's been amazing meeting new people",
        image = "https://lavidastudio.com/wp-content/uploads/2018/09/hip-hop-dance-class.jpg",
        date = datetime.now()
    )

    post7 = Post(
        user_id = 1,
        album_id = 4,
        headline = "Day 3, I started playing horro games",
        content = "I wasn't too interested in these games at first, but seeing my friends have a blast screaming and running around really made it much more enjoyable",
        image = "https://i.kinja-img.com/image/upload/c_fill,h_675,pg_1,q_80,w_1200/dbaa7b773c3f5e94cd8051d8aa80c110.jpg",
        date = datetime.now()
    )

    post8 = Post(
        user_id = 1,
        album_id = 4,
        headline = "Day 10 , playing It Takes Two",
        content = "I've heard a lot of great reviews about this game, and I've always loved puzzles and challenges.  I've been loving this game so far 10/10 would recommend to anyone!",
        image = "https://deadline.com/wp-content/uploads/2021/12/HXDLVhmdqPzGJMtfysBjti-e1639089976373.png?w=681&h=383&crop=1",
        date = datetime.now()
    )






    post9 = Post(
        user_id = 2,
        album_id = 5,
        headline = "Day 1, First sample of a design I made for my frog",
        content = "Definitely a work in progress, but it's just the start!  Hopefully I can upgrade my boy to an even nicer home",
        image = "https://files.cults3d.com/uploaders/17082276/illustration-file/10244b6b-c343-4b88-a048-5735db8cd44c/Frog-house1.jpg",
        date = datetime.now()
    )

    post10 = Post(
        user_id = 2,
        album_id = 5,
        headline = "Day 6, I thought I would try a nice design for my frog",
        content = "He's been staying in this house more often than his last home so that's a good sign!",
        image = "https://i.pinimg.com/originals/94/00/1f/94001f4b627322cf060e2ac03bd1830b.jpg",
        date = datetime.now()
    )

    post11 = Post(
        user_id = 2,
        album_id = 6,
        headline = "Day 1 , Learning japanese foods",
        content = "Thought I'd start off simple with some Onigiri balls!  I always loved seeing people eat these in animes and thought I'd try to make some myself.  Wasn't too bad at all",
        image = "https://railrocker.com/playground/wp-content/uploads/2020/02/Onigiri-traditional-Japanese-Rice-Balls.jpg",
        date = datetime.now()
    )

    post12 = Post(
        user_id = 2,
        album_id = 6,
        headline = "Day 10 , Learned how to make omurice!",
        content = "This was always a comfort food I loved trying at restaurants and decided to maek one myself!  Looks delicious doesn't it?  Sure tasted delicious.",
        image = "https://gaijinpot.scdn3.secure.raxcdn.com/app/uploads/sites/6/2020/06/Japanese-food-omurice-1024x683.jpg",
        date = datetime.now()
    )

    post13 = Post(
        user_id = 2,
        album_id = 7,
        headline = "Day 1 , Just picked up Valorant!",
        content = "I never thought I would play a shooter, but to my surprise I was better than I thought!  I jumped straight to gold ranks and am watching other streamers and learning their tricks.",
        image = "https://miro.medium.com/v2/resize:fit:1358/1*AKYMVXOu95rqQH7IHwgeeg.png",
        date = datetime.now()
    )

    post14 = Post(
        user_id = 2,
        album_id = 7,
        headline = "Day 10 , WOOH just hit plat",
        content = "Valorant has been so fun lately.  I'm glad I got to meet people from this community who also play!",
        image = "https://cdn.arstechnica.net/wp-content/uploads/2020/04/FirstLook_Smoke_VALORANT.jpg",
        date = datetime.now()
    )

    post15 = Post(
        user_id = 2,
        album_id = 8,
        headline = "Day 1, Touching grass",
        content = "Today was a beautiful day so I thought I'd take my puppy shibo out for a nice hike.  Would definitely come back to this trail again",
        image = "https://images.seattletimes.com/wp-content/uploads/2022/06/06092022_1_123627.jpg?d=780x520",
        date = datetime.now()
    )

    post16 = Post(
        user_id = 2,
        album_id = 8,
        headline = "Day 13 , A new trail",
        content = "This trali was much more difficult than I anticipated.  Several times I felt like I was going to pass out, but I persevered and made it back safely.  I felt very accomplished and proud of myself once I reached the end!",
        image = "https://57hours.com/wp-content/uploads/2022/02/Copy-of-Hero-Header-Photo-Appala.jpg",
        date = datetime.now()
    )



    post17 = Post(
        user_id = 3,
        album_id = 9,
        headline = "Day 6, a new park to train",
        content = "A person on here suggested I come to this park to try this area to practice in.  Thanks for the recommendation!",
        image = "https://snowkingmountain.com/wp-content/uploads/2022/01/climbing-the-boulders-at-the-base-of-snow-king-1024x683-1.jpeg",
        date = datetime.now()
    )

    post18 = Post(
        user_id = 3,
        album_id = 10,
        headline = "Day 10 , It's always nice running with a pack",
        content = "These waves weren't meant for just one person, but to be enjoyed by many and all.",
        image = "https://d1l18ops95qbzp.cloudfront.net/wp-content/2015/12/Waimea-Bay-surfers2.jpg",
        date = datetime.now()
    )

    post19 = Post(
        user_id = 3,
        album_id = 11,
        headline = "Day 5, picked up a few of these cuties",
        content = "I'm starting to understand the difference between these boards and the feel you get from riding them.  I've always bought a few parts to make it a bit more personal to me.",
        image = "https://miro.medium.com/v2/resize:fit:800/0*Nwk97hH0YdtNfwNg.jpg",
        date = datetime.now()
    )

    post20 = Post(
        user_id = 3,
        album_id = 12,
        headline = "Day 13 , A new trail",
        content = "This trali was much more difficult than I anticipated.  Several times I felt like I was going to pass out, but I persevered and made it back safely.  I felt very accomplished and proud of myself once I reached the end!",
        image = "https://57hours.com/wp-content/uploads/2022/02/Copy-of-Hero-Header-Photo-Appala.jpg",
        date = datetime.now()
    )

    post21 = Post(
        user_id = 4,
        album_id = 13,
        headline = "Day 1, Making some chocolate chip cookies",
        content = "Honestly, came out way better than I expected.  So glad I took a step towards making these decliouos batch of cookies!",
        image = "https://www.thedailymeal.com/img/gallery/baking-tips-every-home-cook-should-know/l-intro-1687884444.jpg",
        date = datetime.now()
    )

    post22 = Post(
        user_id = 4,
        album_id = 14,
        headline = "Day 2 , Found a group to train with",
        content = "I was able to meet a few people in my area through this app.  I'm so grateful to learn from these guys as they were in my exact shoes in the past.  Can't wait to learn more and continue to grow!",
        image = "https://i.imgur.com/r7Njp8h.jpg",
        date = datetime.now()
    )

    post23 = Post(
        user_id = 4,
        album_id = 15,
        headline = "Day 2, Reminder of freedom",
        content = "Started off with something simple.  Thought I'd draw a piece that reminded me at my most recent vacation.  I've been trying out a few water colors, but will definitely try out more in the future.",
        image = "https://www.thesocialeaselonlinepaintstudio.com/wp-content/uploads/2020/06/Painting-with-Kids-Sunset-The-Social-Easel-Online-Paint-Studio-3.jpg",
        date = datetime.now()
    )

    post24 = Post(
        user_id = 4,
        album_id = 16,
        headline = "Day 1, Learning the process",
        content = "This photo was an inspiration of mine because I thought the craftmanship of woodwork was so beautiful.  I'll be sure to update you guys on my next sample work.",
        image = "https://www.kcpinternational.com/wp-content/uploads/2021/10/Kumiko-woodwork-1024x1024.jpg",
        date = datetime.now()
    )

    post25 = Post(
        user_id = 5,
        album_id = 17,
        headline = "Day 1, Learning unreal engine",
        content = "I've been hearing alot of developers using unreal engine so thought I would give it a try.  It's sure gonna take me some time to get used to though.",
        image = "https://cdn.wccftech.com/wp-content/uploads/2023/02/WCCFunrealengine59.jpg",
        date = datetime.now()
    )

    post26 = Post(
        user_id = 5,
        album_id = 18,
        headline = "Day 6 , Stopped by the carmeet",
        content = "Got my baby a car wash and new set of shoes.  It's been looking pretty nice if you ask me.",
        image = "https://img.benlevy.com/auto/meet/northsuburbscarscoffee20211017/img_2370.jpg",
        date = datetime.now()
    )

    post27 = Post(
        user_id = 5,
        album_id = 19,
        headline = "Day 2, Just some lofi",
        content = "Published a few tracks on my soundcloud.  Always loved listening to the lofi genre.  If you didn't know Nujabes was considered the founder of lofi.",
        image = "https://thumbs.dreamstime.com/b/lofi-roof-sunset-llustration-269569654.jpg",
        date = datetime.now()
    )

    post28 = Post(
        user_id = 5,
        album_id = 20,
        headline = "Day 3, A few lotus flowers",
        content = "Saw a youtube tutorial over these and thought these would be cool to make",
        image = "https://epjg58k4arp.exactdn.com/wp-content/uploads/2021/06/origami-lotus-main.jpg",
        date = datetime.now()
    )





    users = User.query.all()

    all_posts = [post1, post2, post3, post4, post5, post6, post7, post8, post9, post10, post11, post12, post13, post14, post15, post16, post17, post18, post19, post20, post21, post22, post23, post24, post25, post26, post27, post28]
    
    for post in all_posts:
        usersToAdd = list(set(choices(users, k=randint(1,5))))
        for user in usersToAdd:
            post.userLikes.append(user)


    add_posts = [db.session.add(post) for post in all_posts]
    
    db.session.commit()



def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))
        
    db.session.commit()