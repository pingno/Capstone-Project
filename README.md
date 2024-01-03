# Dayze

Dayze is a social platform for people to share their journeys and passions in life with other like minded individuals.  Users can sign up and interact with other users to support each other's progress in whatever goals or hobbies they have.  


# Live Link
https://dayze.onrender.com

## Tech Stack 

### Frameworks and Libraries
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54) ![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)

 ### Database:
 ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
  
 ### Hosting:
 ![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)



Index
[Feature List][https://github.com/pingno/Capstone-Project/wiki/Features-List] | [Database Schema][https://github.com/pingno/Capstone-Project/wiki/Database-Schema] | [User Stories][https://github.com/pingno/Capstone-Project/wiki/User's-Stories] | [Wireframe][https://github.com/pingno/Capstone-Project/wiki/Wireframe] | [Future Implementation][https://github.com/pingno/Capstone-Project/wiki/Future-Implementations]


# Endpoints

## Auth
| Request                        | Purpose                | Return Value  |                  
| :----------------------------- | :--------------------: | :------------------------------ |

| GET /api/auth/        | This fetch is sent upon initial app load and on subsequent refreshes.<br>It returns an object representing the current user, if user is logged in.                                 | {<br>&nbsp;&nbsp;&nbsp;'id': INT,<br>&nbsp;&nbsp;&nbsp;'username': STRING,<br>&nbsp;&nbsp;&nbsp;'email': STRING,<br>}<br><br>Status: 200<br>|

| POST /api/auth/signup        | This fetch sends the form data signup from data to the backend to process the creation of a new user.<br>It returns an object representing the current user, after logging them in, if account creation succeeds.                                 | {<br>&nbsp;&nbsp;&nbsp;'id': INT,<br>&nbsp;&nbsp;&nbsp;'username': STRING,<br>&nbsp;&nbsp;&nbsp;'email': STRING,<br>}<br><br>Status: 200<br>|

| POST /api/auth/login | This fetch attempts to login a user with the provided credentials.<br>It returns an object representing the current user, if validation succeeds.                                 | {<br>&nbsp;&nbsp;&nbsp;'id': INT,<br>&nbsp;&nbsp;&nbsp;'username': STRING,<br>&nbsp;&nbsp;&nbsp;'email': STRING,<br>}<br><br>Status: 200<br>| 

| POST /api/auth/logout | This fetch will logout the current user.<br>It returns an object with the message 'User logged Out' if it succeeds.                                 | {<br>&nbsp;&nbsp;&nbsp;'message': STRING<br>}<br><br>Status: 200<br>|


## Auth
| Request                        | Purpose                | Return Value  |                  
| :----------------------------- | :--------------------: | :------------------------------ |

| GET /api/auth/        | This fetch is sent upon initial app load and on subsequent refreshes.<br>It returns an object representing the current user, if user is logged in.                                 | {<br>&nbsp;&nbsp;&nbsp;'id': INT,<br>&nbsp;&nbsp;&nbsp;'username': STRING,<br>&nbsp;&nbsp;&nbsp;'email': STRING,<br>}<br><br>Status: 200<br>|

| POST /api/auth/signup        | This fetch sends the form data signup from data to the backend to process the creation of a new user.<br>It returns an object representing the current user, after logging them in, if account creation succeeds.                                 | {<br>&nbsp;&nbsp;&nbsp;'id': INT,<br>&nbsp;&nbsp;&nbsp;'username': STRING,<br>&nbsp;&nbsp;&nbsp;'email': STRING,<br>}<br><br>Status: 200<br>|

| POST /api/auth/login | This fetch attempts to login a user with the provided credentials.<br>It returns an object representing the current user, if validation succeeds.                                 | {<br>&nbsp;&nbsp;&nbsp;'id': INT,<br>&nbsp;&nbsp;&nbsp;'username': STRING,<br>&nbsp;&nbsp;&nbsp;'email': STRING,<br>}<br><br>Status: 200<br>| 

| POST /api/auth/logout | This fetch will logout the current user.<br>It returns an object with the message 'User logged Out' if it succeeds.                                 | {<br>&nbsp;&nbsp;&nbsp;'message': STRING<br>}<br><br>Status: 200<br>|

## Albums

| Request                        | Purpose                | Return Value  |                  
| :----------------------------- | :--------------------: | :------------------------------ |

| GET /api/albums/int:album_id        | This fetch is sent to retrieve all album info for the album specified by the id. Upon success, we return that album in a dictionary                          | {<br>&nbsp;&nbsp;&nbsp;'id': INT,<br>&nbsp;&nbsp;&nbsp;'category': STRING,<br>&nbsp;&nbsp;&nbsp;'title': STRING, <br>&nbsp;&nbsp;&nbsp;'title': STRING, <br>&nbsp;&nbsp;&nbsp;'description': STRING, <br>&nbsp;&nbsp;&nbsp;'cover': IMAGE, <br>&nbsp;&nbsp;&nbsp;'date': STRING, <br>&nbsp;&nbsp;&nbsp;'user_id': INT <br>}<br><br>Status: 200<br>|

| POST /api/albums/create      | This fetch is sent to add a new album if the user is currently logged in.                                   | {<br>&nbsp;&nbsp;&nbsp;'id': INT,<br>&nbsp;&nbsp;&nbsp;'category': STRING,<br>&nbsp;&nbsp;&nbsp;'title': STRING, <br>&nbsp;&nbsp;&nbsp;'title': STRING, <br>&nbsp;&nbsp;&nbsp;'description': STRING, <br>&nbsp;&nbsp;&nbsp;'cover': IMAGE, <br>&nbsp;&nbsp;&nbsp;'date': STRING, <br>&nbsp;&nbsp;&nbsp;'user_id': INT <br>}<br><br>Status: 201<br>|

| PUT /api/albums/int:album_id/edit | This fetch is sent to update the album info specified by album id.  Upon success, we return a dictionary                              | {<br>&nbsp;&nbsp;&nbsp;'id': INT,<br>&nbsp;&nbsp;&nbsp;'username': STRING,<br>&nbsp;&nbsp;&nbsp;'email': STRING,<br>}<br><br>Status: 200<br>| 

| DELETE /api/albums/int:album_id/delete | Thsi fetch will delete the album from the user's albums as well as all albums.  Upon success, it will return a message saying Album successfully deleted                                | {<br>&nbsp;&nbsp;&nbsp;'message': STRING<br>}<br><br>Status: 200<br>|


## Posts

| Request                        | Purpose                | Return Value  |                  
| :----------------------------- | :--------------------: | :------------------------------ |

| GET /api/albums/int:album_id        | This fetch is sent to retrieve all album info for the album specified by the id. Upon success, we return that album in a dictionary                          | {<br>&nbsp;&nbsp;&nbsp;'id': INT,<br>&nbsp;&nbsp;&nbsp;'category': STRING,<br>&nbsp;&nbsp;&nbsp;'title': STRING, <br>&nbsp;&nbsp;&nbsp;'title': STRING, <br>&nbsp;&nbsp;&nbsp;'description': STRING, <br>&nbsp;&nbsp;&nbsp;'cover': IMAGE, <br>&nbsp;&nbsp;&nbsp;'date': STRING, <br>&nbsp;&nbsp;&nbsp;'user_id': INT <br>}<br><br>Status: 200<br>|

| POST /api/albums/create      | This fetch is sent to add a new album if the user is currently logged in.                                   | {<br>&nbsp;&nbsp;&nbsp;'id': INT,<br>&nbsp;&nbsp;&nbsp;'category': STRING,<br>&nbsp;&nbsp;&nbsp;'title': STRING, <br>&nbsp;&nbsp;&nbsp;'title': STRING, <br>&nbsp;&nbsp;&nbsp;'description': STRING, <br>&nbsp;&nbsp;&nbsp;'cover': IMAGE, <br>&nbsp;&nbsp;&nbsp;'date': STRING, <br>&nbsp;&nbsp;&nbsp;'user_id': INT <br>}<br><br>Status: 201<br>|

| PUT /api/albums/int:album_id/edit | This fetch is sent to update the album info specified by album id.  Upon success, we return a dictionary                              | {<br>&nbsp;&nbsp;&nbsp;'id': INT,<br>&nbsp;&nbsp;&nbsp;'username': STRING,<br>&nbsp;&nbsp;&nbsp;'email': STRING,<br>}<br><br>Status: 200<br>| 

| DELETE /api/albums/int:album_id/delete | Thsi fetch will delete the album from the user's albums as well as all albums.  Upon success, it will return a message saying Album successfully deleted                                | {<br>&nbsp;&nbsp;&nbsp;'message': STRING<br>}<br><br>Status: 200<br>|


## Comments

| Request                        | Purpose                | Return Value  |                  
| :----------------------------- | :--------------------: | :------------------------------ |

| GET /api/albums/int:album_id        | This fetch is sent to retrieve all album info for the album specified by the id. Upon success, we return that album in a dictionary                          | {<br>&nbsp;&nbsp;&nbsp;'id': INT,<br>&nbsp;&nbsp;&nbsp;'category': STRING,<br>&nbsp;&nbsp;&nbsp;'title': STRING, <br>&nbsp;&nbsp;&nbsp;'title': STRING, <br>&nbsp;&nbsp;&nbsp;'description': STRING, <br>&nbsp;&nbsp;&nbsp;'cover': IMAGE, <br>&nbsp;&nbsp;&nbsp;'date': STRING, <br>&nbsp;&nbsp;&nbsp;'user_id': INT <br>}<br><br>Status: 200<br>|

| POST /api/albums/create      | This fetch is sent to add a new album if the user is currently logged in.                                   | {<br>&nbsp;&nbsp;&nbsp;'id': INT,<br>&nbsp;&nbsp;&nbsp;'category': STRING,<br>&nbsp;&nbsp;&nbsp;'title': STRING, <br>&nbsp;&nbsp;&nbsp;'title': STRING, <br>&nbsp;&nbsp;&nbsp;'description': STRING, <br>&nbsp;&nbsp;&nbsp;'cover': IMAGE, <br>&nbsp;&nbsp;&nbsp;'date': STRING, <br>&nbsp;&nbsp;&nbsp;'user_id': INT <br>}<br><br>Status: 201<br>|

| PUT /api/albums/int:album_id/edit | This fetch is sent to update the album info specified by album id.  Upon success, we return a dictionary                              | {<br>&nbsp;&nbsp;&nbsp;'id': INT,<br>&nbsp;&nbsp;&nbsp;'username': STRING,<br>&nbsp;&nbsp;&nbsp;'email': STRING,<br>}<br><br>Status: 200<br>| 

| DELETE /api/albums/int:album_id/delete | Thsi fetch will delete the album from the user's albums as well as all albums.  Upon success, it will return a message saying Album successfully deleted                                | {<br>&nbsp;&nbsp;&nbsp;'message': STRING<br>}<br><br>Status: 200<br>|


## Likes
## Followers

Landing Page
User Page
Album List Page
Album Page
Post Page

Endpoints

Auth
Album
Post
Comment


Feature List
Future Implementation Goals

Connect
[Linkedin][https://www.linkedin.com/in/peang-ngo-840860112/]