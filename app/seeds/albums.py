from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
from ..models.album import Album
from faker import Faker

fake = Faker()


def seed_albums():
    
    album1 = Album(
        user_id = 1,
        category = "Cooking",
        title = "Learning how to cook",
        cover = "https://community.thriveglobal.com/wp-content/uploads/2019/09/7-Reasons-Why-Cooking-Is-the-Ultimate-Stress-Reliever-thriveglobal.jpeg",
        description = "I've always been to lazy to cook or would always tend to spend money on eating out, but today I want to work on myself and develope my skills as a cook!  I hope you guys can appreciate this album of mine where I learn new recipes.",
        date = fake.date_between(start_date='-1y', end_date="today")
    )
    album2 = Album(
        user_id = 1,
        category = "Botany",
        title = "My plant family",
        cover = "https://www.saferbrand.com/media/Articles/Safer-Brand/26-best-indoor-plants.jpg",
        description = "Plants have always fascinated me.  I loved learning about new species of plants and trying to grow my own variety at home.  I started a small field in my backyard and bought some new seeds and pots for my living room space.  It's been very therapeutic to me.  Hopefully I can fill my whole house with green eventually",
        date = fake.date_between(start_date='-1y', end_date="today")
    )
    album3 = Album(
        user_id = 1,
        category = "Dancing",
        title = "Getting down on the dance floor",
        cover = "https://i0.wp.com/ononestudios.com/wp-content/uploads/2022/08/pretty-woman-practising-hip-hop-dance-scaled.jpg?fit=1024%2C683&ssl=1",
        description = "Growing up, I used to watch so many dance shows and always wanted to learn how to move like that!  So I've recently started taking some dance classes and boy do I get nervous.  I know this is just the start, but I'm starting to feel more comfortable with expressing myself this way",
        date = fake.date_between(start_date='-1y', end_date="today")
    )
    album4 = Album(
        user_id = 1,
        category = "Gaming",
        title = "I'm a gamer girl",
        cover = "https://cdna.artstation.com/p/assets/images/images/031/283/174/large/omorphia-visual-watermark.jpg?1603170796",
        description = "I love making a space that fits my aesthetic.  I'm always gaming with friends on my downtime and I've been mostly playing genshin impact, but I'm always down to try new games!  I might be a tad bit competitive, but I love the challenge",
        date = fake.date_between(start_date='-1y', end_date="today")
    )


    album5 = Album(
        user_id = 2,
        category = "Frog",
        title = "Frogs are life",
        cover = "https://stldenise3d.com/wp-content/uploads/2023/02/frog-house-2.jpg",
        description = "As you know, I love all things frogs.  I've been testing out my 3D printer and have been trying to build a house for my pet frogs.  They've been loving it and so have I.  I'll keep working on the design and upgrade their homes.  Hope you guys like it",
        date = fake.date_between(start_date='-1y', end_date="today")
    )
    album6 = Album(
        user_id = 2,
        category = "Cooking",
        title = "Call me chef MATT",
        cover = "https://www.mdanderson.org/images/publications/focused-on-health/2019/web_healthy_cooking_1376x774.png.resize.702.404.jpg",
        description = "I'll always love food and I love sharing new dishes that I've come up with or learned how to make",
        date = fake.date_between(start_date='-1y', end_date="today")
    )
    album7 = Album(
        user_id = 2,
        category = "Gaming",
        title = "Road to pro gamer",
        cover = "https://media.kasperskydaily.com/wp-content/uploads/sites/85/2022/11/02054538/true-cost-of-gaminf-featured.jpg",
        description = "If you guys didn't know.  I'm a diamond player in League of Legends and my team has been competing in Nationals as of lately.  I am a heimerdinger mid lane main.  I've been putting in the hours and work so that my team can rely on me",
        date = fake.date_between(start_date='-1y', end_date="today")
    )
    album8 = Album(
        user_id = 2,
        category = "Hiking",
        title = "Touching grass",
        cover = "https://www.eatthis.com/wp-content/uploads/sites/4/2022/02/My-project-2022-02-07T140119.817.jpg?quality=82&strip=1",
        description = "There's something about nature that helps me find balance and peace in life.  I love being outdoors and I'm putting myself to the test to see how far I can go",
        date = fake.date_between(start_date='-1y', end_date="today")
    )


    album9 = Album(
        user_id = 3,
        category = "Rock Climbing",
        title = "Climbing mountains",
        cover = "https://i.natgeofe.com/n/e5480624-48f3-44e7-8ff1-a8d8a7a08c49/h_20.93123346_4x3.JPG",
        description = "I love that I've been able to build my endurance and meet a community through rock climbing.  I've been testing myself to push past my limits and hopefully this inspires you to do so as well",
        date = fake.date_between(start_date='-1y', end_date="today")
    )
    album10 = Album(
        user_id = 3,
        category = "Surfing",
        title = "Taking in the waves",
        cover = "https://www.surfer.com/.image/t_share/MTk2Mjc2OTEyNTE4MTQ1MzI4/p066_photosashagolyanovashesurf_gestalten2020.jpg",
        description = "If you know me.  I'll always wake up early to catch the waves.  Something about the water helps me find peace.  I remember when I first started I barely knew how to swim, but I knew I had to face my fears so I could find love on the other side.",
        date = fake.date_between(start_date='-1y', end_date="today")
    )
    album11 = Album(
        user_id = 3,
        category = "Long Boarding",
        title = "Picked up long boarding",
        cover = "https://media.cntraveller.com/photos/611bedc0db797d0116fd4b7c/master/w_320%2Cc_limit/17longboard.jpg",
        description = "I recently picked up long boarding!  I was so excited to get my board and try it out, but I face planted and got a few scratches or bruises, but it's a learning process and it's a whole new way for me to feel free and enjoy the landscape.  Loving it so far!",
        date = fake.date_between(start_date='-1y', end_date="today")
    )
    album12 = Album(
        user_id = 3,
        category = "Photography",
        title = "Capturing the beauty in life",
        cover = "https://iso.500px.com/wp-content/uploads/2016/03/pedroquintela-1500x844.jpg",
        description = "I've always wanted to learn photography so I could capture the moments I share with friends and family.  So I've been taking a few classes and tutorials so hopefully you guys like my scenic pictures",
        date = fake.date_between(start_date='-1y', end_date="today")
    )


    album13 = Album(
        user_id = 3,
        category = "Baking",
        title = "I love desserts",
        cover = "https://www.eatthis.com/wp-content/uploads/sites/4/2022/08/baking-ingredients.jpg?quality=82&strip=all&w=640",
        description = "If you guys didn't know.  I have a big sweet tooth.  Recently I've picked up baking because I've spent too much money eating out so here I go trying to save and learn to make my own desserts",
        date = fake.date_between(start_date='-1y', end_date="today")
    )
    album14 = Album(
        user_id = 3,
        category = "Parkour",
        title = "Let's be ninjas",
        cover = "https://www.fotolog.com/wp-content/uploads/2020/11/parkours.jpg",
        description = "I used to jump around as a kid a lot and in these moments I felt free.  I've been learning some new tricks lately practicing at a gymnastics gym so hopefully I can try out new terrains and not injure myself",
        date = fake.date_between(start_date='-1y', end_date="today")
    )
    album15 = Album(
        user_id = 3,
        category = "Painting",
        title = "Picking up brushes",
        cover = "https://studio.pinotspalette.com/briercreek/images/bc-allaboutpaint.jpg",
        description = "I wasn't always good at drawing, but I've always wanted to learn.  So here I am trying something out of my comfort zone.  So far I've been really enjoying it",
        date = fake.date_between(start_date='-1y', end_date="today")
    )
    album16 = Album(
        user_id = 3,
        category = "Woodwork",
        title = "Carving the earth",
        cover = "https://grainger-prod.adobecqms.net/content/dam/grainger/gus/en/public/digital-tactics/know-how/hero/SS-KH_24MustHaveWoodworkingToolsForYourWorkshop_KH-HRO.jpg",
        description = "I love interior design and creating my own furniture and helping others with their dream design.  Let me know if you have any ideas on a DIY project!",
        date = fake.date_between(start_date='-1y', end_date="today")
    )





    all_albums = [album1, album2, album3, album4, album5, album6, album7, album8, album9, album10, album11, album12, album13, album14, album15, album16]
    add_albums = [db.session.add(album) for album in all_albums]
    db.session.commit()



def undo_albums():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM albums"))
        
    db.session.commit()