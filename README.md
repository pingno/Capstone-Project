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
| GET /api/auth/        | This fetch is sent upon initial app load and on subsequent refreshes.<br>It returns an object representing the current user if the user is logged in.                                 | {<br>&nbsp;&nbsp;&nbsp;'id': INT,<br>&nbsp;&nbsp;&nbsp;'username': STRING,<br>&nbsp;&nbsp;&nbsp;'email': STRING,<br>}<br><br>Status: 200<br>|
| POST /api/auth/signup        | This fetch sends the form data signup to the backend to process the creation of a new user.<br>It returns an object representing the current user after logging them in if account creation succeeds.                                 | {<br>&nbsp;&nbsp;&nbsp;'id': INT,<br>&nbsp;&nbsp;&nbsp;'username': STRING,<br>&nbsp;&nbsp;&nbsp;'email': STRING,<br>}<br><br>Status: 200<br>|
| POST /api/auth/login | This fetch attempts to log in a user with the provided credentials.<br>It returns an object representing the current user if validation succeeds.                                 | {<br>&nbsp;&nbsp;&nbsp;'id': INT,<br>&nbsp;&nbsp;&nbsp;'username': STRING,<br>&nbsp;&nbsp;&nbsp;'email': STRING,<br>}<br><br>Status: 200<br>| 
| POST /api/auth/logout | This fetch will log out the current user.<br>It returns an object with the message 'User logged Out' if it succeeds.                                 | {<br>&nbsp;&nbsp;&nbsp;'message': STRING<br>}<br><br>Status: 200<br>|
| POST /api/auth/unauthorized      | This endpoint will be routed to in the case that a protected route does not pass validations for the current user.<br>It returns an object with an errors property, which is an array with the value 'Unauthorized'          | {<br>&nbsp;&nbsp;&nbsp;'errors': ARRAY[STRINGS]<br>}<br><br>Status: 401<br>|


## Albums
| Request                        | Purpose                | Return Value  |                  
| :----------------------------- | :--------------------: | :------------------------------ |
| GET /api/albums        | This fetch is sent to retrieve all album info for all albums.<br>Upon success, the data will return as a value for Albums as a list of dictionaries                          | [ARRAY: {<br>&nbsp;&nbsp;&nbsp;'id': INT,<br>&nbsp;&nbsp;&nbsp;'category': STRING,<br>&nbsp;&nbsp;&nbsp;'title': STRING, <br>&nbsp;&nbsp;&nbsp;'description': STRING, <br>&nbsp;&nbsp;&nbsp;'cover': IMAGE, <br>&nbsp;&nbsp;&nbsp;'date': STRING, <br>&nbsp;&nbsp;&nbsp;'user_id': INT <br>}]<br><br>Status: 200<br>|
| GET /api/albums/int:album_id        | This fetch is sent to retrieve all album info for the album specified by the id.<br>Upon success, we return that album in a dictionary                          | {<br>&nbsp;&nbsp;&nbsp;'id': INT,<br>&nbsp;&nbsp;&nbsp;'category': STRING,<br>&nbsp;&nbsp;&nbsp;'title': STRING, <br>&nbsp;&nbsp;&nbsp;'description': STRING, <br>&nbsp;&nbsp;&nbsp;'cover': IMAGE, <br>&nbsp;&nbsp;&nbsp;'date': STRING, <br>&nbsp;&nbsp;&nbsp;'user_id': INT, <br>&nbsp;&nbsp;&nbsp;'posts': ARRAY <br>}<br><br>Status: 200<br>|
| POST /api/albums/create      | This fetch is sent to add a new album if the user is currently logged in.                                   | {<br>&nbsp;&nbsp;&nbsp;'id': INT,<br>&nbsp;&nbsp;&nbsp;'category': STRING,<br>&nbsp;&nbsp;&nbsp;'title': STRING, <br>&nbsp;&nbsp;&nbsp;'description': STRING, <br>&nbsp;&nbsp;&nbsp;'cover': IMAGE, <br>&nbsp;&nbsp;&nbsp;'date': DATE, <br>&nbsp;&nbsp;&nbsp;'user_id': INT <br>}<br><br>Status: 201<br>|
| PUT /api/albums/int:album_id/edit | This fetch is sent to update the album info specified by album id.<br>Upon success, we return a dictionary                              | {<br>&nbsp;&nbsp;&nbsp;'id': INT,<br>&nbsp;&nbsp;&nbsp;'category': STRING,<br>&nbsp;&nbsp;&nbsp;'title': STRING, <br>&nbsp;&nbsp;&nbsp;'description': STRING, <br>&nbsp;&nbsp;&nbsp;'cover': IMAGE, <br>&nbsp;&nbsp;&nbsp;'date': DATE, <br>&nbsp;&nbsp;&nbsp;'user_id': INT <br>}<br><br>Status: 200<br>| 
| DELETE /api/albums/int:album_id/delete | This fetch will delete the album from the user's albums as well as all albums.<br>Upon success, it will return a message saying Album successfully deleted                                | {<br>&nbsp;&nbsp;&nbsp;'message': STRING<br>}<br><br>Status: 200<br>|


## Posts
| Request                        | Purpose                | Return Value  |                  
| :----------------------------- | :--------------------: | :------------------------------ |
| GET /api/posts        | This fetch is sent to retrieve all posts.<br>Upon success, we return a list of dictionaries                  | ARRAY[{<br>&nbsp;&nbsp;&nbsp;'id': INT,<br>&nbsp;&nbsp;&nbsp;'headline': STRING, <br>&nbsp;&nbsp;&nbsp;'content': STRING, <br>&nbsp;&nbsp;&nbsp;'image': STRING, <br>&nbsp;&nbsp;&nbsp;'date': DATE, <br>&nbsp;&nbsp;&nbsp;'album_id': INT, <br>&nbsp;&nbsp;&nbsp;'user_id': INT <br>}]<br><br>Status: 200<br>|
| GET /api/posts/int:post_id        | This fetch is sent to retrieve a single post.<br>Upon success, we return a dictionary representing that post                        | {<br>&nbsp;&nbsp;&nbsp;'id': INT, <br>&nbsp;&nbsp;&nbsp;'headline': STRING, <br>&nbsp;&nbsp;&nbsp;'content': STRING, <br>&nbsp;&nbsp;&nbsp;'image': STRING, <br>&nbsp;&nbsp;&nbsp;'date': DATE, <br>&nbsp;&nbsp;&nbsp;'album_id': INT, <br>&nbsp;&nbsp;&nbsp;'user_id': INT,<br>&nbsp;&nbsp;&nbsp;'comments': ARRAY, ,<br>&nbsp;&nbsp;&nbsp;'likes': INT,<br>&nbsp;&nbsp;&nbsp;'num_comments': INT <br>}<br><br>Status: 200<br>|
| POST /api/albums/int:album_id/posts/create      | This fetch is sent to add a new album if the user is currently logged in.<br>Upon success, we return a dictionary of that post                  | {<br>&nbsp;&nbsp;&nbsp;'id': INT,<br>&nbsp;&nbsp;&nbsp;'album_id': INT,<br>&nbsp;&nbsp;&nbsp;'user_id': INT, <br>&nbsp;&nbsp;&nbsp;'headline': STRING, <br>&nbsp;&nbsp;&nbsp;'content': STRING, <br>&nbsp;&nbsp;&nbsp;'date': DATE <br>}<br><br>Status: 201<br>|
| PUT /api/posts/int:post_id/edit | This fetch is sent to update the post info specified by the post id that's been created by the user.<br>Upon success, we return a dictionary of the updated post.                             | {<br>&nbsp;&nbsp;&nbsp;'id': INT, <br>&nbsp;&nbsp;&nbsp;'headline': STRING, <br>&nbsp;&nbsp;&nbsp;'content': STRING, <br>&nbsp;&nbsp;&nbsp;'image': STRING, <br>&nbsp;&nbsp;&nbsp;'date': DATE, <br>&nbsp;&nbsp;&nbsp;'album_id': INT, <br>&nbsp;&nbsp;&nbsp;'user_id': INT,<br>&nbsp;&nbsp;&nbsp;'comments': ARRAY, ,<br>&nbsp;&nbsp;&nbsp;'likes': INT,<br>&nbsp;&nbsp;&nbsp;'num_comments': INT <br>}<br><br>Status: 200<br>| 
| DELETE /api/posts/int:post_id/delete | This fetch sends the post id in the body of the request.<br>Upon successful deletion, we return a message "Post successfully deleted".                                | {<br>&nbsp;&nbsp;&nbsp;'message': STRING<br>}<br><br>Status: 200<br>|


## Comments
| Request                        | Purpose                | Return Value  |                  
| :----------------------------- | :--------------------: | :------------------------------ |
| GET /api/comments/int:comment_id        | This fetch is sent to retrieve the comment info.<br>Upon success, we return the info in the form of a dictionary                          | {<br>&nbsp;&nbsp;&nbsp;'id': INT,<br>&nbsp;&nbsp;&nbsp;'comment': STRING}<br><br>Status: 200<br>|
| POST /api/posts/int:post_id/comments/create      | This fetch is sent to add a new comment under the given post_id.<br>Upon success, we return the comment in the form of a dictionary                                | {<br>&nbsp;&nbsp;&nbsp;'id': INT,<br>&nbsp;&nbsp;&nbsp;'comment': STRING}<br><br>Status: 201<br>|
| PUT /api/comments/int:comment_id/edit | This fetch is sent to update the comment info specified by the comments id.<br>Upon success, we return the comment in the form of a dictionary                    | {<br>&nbsp;&nbsp;&nbsp;'id': INT,<br>&nbsp;&nbsp;&nbsp;'comment': STRING}<br><br>Status: 200<br>|
| DELETE /api/albums/int:album_id/delete | This fetch will delete the comment from the user's post.<br>Upon success, it will return a message saying Comment successfully deleted                                | {<br>&nbsp;&nbsp;&nbsp;'id': INT,<br>&nbsp;&nbsp;&nbsp;'comment': STRING}<br><br>Status: 200<br>|


## Likes
| Request                        | Purpose                | Return Value  |                  
| :----------------------------- | :--------------------: | :------------------------------ |
| GET /api/posts/int:post_id/likes/add       | This fetch is sent to add a like under the post given the post id.<br>Upon success, we return the updated post in the form of a dictionary.                        | {<br>&nbsp;&nbsp;&nbsp;'id': INT,<br>&nbsp;&nbsp;&nbsp;'comment': STRING}<br><br>Status: 201<br>|
| DELETE /api/posts/int:post_id/likes/remove | This fetch is sent to remove a like under the post given the post id.<br>Upon success, we return the updated post in the form of a dictionary.                               | {<br>&nbsp;&nbsp;&nbsp;'id': INT,<br>&nbsp;&nbsp;&nbsp;'comment': STRING}<br><br>Status: 201<br>|


## Followers
| Request                        | Purpose                | Return Value  |                  
| :----------------------------- | :--------------------: | :------------------------------ |
| GET /api/users/int:user_id/follow     | This fetch is sent to add a follow under the user given the user id.<br>Upon success, it returns a list of the user's followers                        | {<br>&nbsp;&nbsp;&nbsp;'id': INT, <br>&nbsp;&nbsp;&nbsp;'headline': STRING, <br>&nbsp;&nbsp;&nbsp;'content': STRING, <br>&nbsp;&nbsp;&nbsp;'image': STRING, <br>&nbsp;&nbsp;&nbsp;'date': DATE, <br>&nbsp;&nbsp;&nbsp;'album_id': INT, <br>&nbsp;&nbsp;&nbsp;'user_id': INT,<br>&nbsp;&nbsp;&nbsp;'comments': ARRAY, ,<br>&nbsp;&nbsp;&nbsp;'likes': INT,<br>&nbsp;&nbsp;&nbsp;'num_comments': INT <br>} <br><br>Status: 200<br>|
| DELETE /api/users/int:user_id/unfollow| This fetch is sent to remove a follow under the user given the user id.<br>Upon success, it returns a list of the user's followers                              | {<br>&nbsp;&nbsp;&nbsp;'id': INT, <br>&nbsp;&nbsp;&nbsp;'headline': STRING, <br>&nbsp;&nbsp;&nbsp;'content': STRING, <br>&nbsp;&nbsp;&nbsp;'image': STRING, <br>&nbsp;&nbsp;&nbsp;'date': DATE, <br>&nbsp;&nbsp;&nbsp;'album_id': INT, <br>&nbsp;&nbsp;&nbsp;'user_id': INT,<br>&nbsp;&nbsp;&nbsp;'comments': ARRAY, ,<br>&nbsp;&nbsp;&nbsp;'likes': INT,<br>&nbsp;&nbsp;&nbsp;'num_comments': INT <br>}<br><br>Status: 201<br>|              




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
- Websocket.io
- Theme changer

Connect
[Linkedin][https://www.linkedin.com/in/peang-ngo-840860112/]