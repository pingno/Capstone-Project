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
| Request                       | Purpose                                              | Return Value              |
| :---------------------------- | :--------------------------------------------------- | :------------------------ |
| GET /api/auth/                | Fetch upon initial app load and refresh. Returns current user object if logged in. | `{ 'id': INT, 'username': STRING, 'email': STRING }`<br>Status: 200 |

| POST /api/auth/signup         | Sends form data for signup. Returns current user object after successful signup. | `{ 'id': INT, 'username': STRING, 'email': STRING }`<br>Status: 200 |

| POST /api/auth/login          | Attempts to log in a user with provided credentials. Returns current user object if validation succeeds. | `{ 'id': INT, 'username': STRING, 'email': STRING }`<br>Status: 200 |

| POST /api/auth/logout         | Logs out the current user. Returns `{ 'message': STRING }` upon success. | `{ 'message': STRING }`<br>Status: 200 |

## Albums
| Request                       | Purpose                                              | Return Value              |
| :---------------------------- | :--------------------------------------------------- | :------------------------ |
| GET /api/albums               | Retrieves all album info for all albums. Returns a list of dictionaries. | `[ { 'id': INT, 'category': STRING, 'title': STRING, 'description': STRING, 'cover': IMAGE, 'date': STRING, 'user_id': INT } ]`<br>Status: 200 |

| GET /api/albums/int:album_id  | Retrieves album info for the specified album ID. Returns a dictionary. | `{ 'id': INT, 'category': STRING, 'title': STRING, 'description': STRING, 'cover': IMAGE, 'date': STRING, 'user_id': INT, 'posts': ARRAY }`<br>Status: 200 |

| POST /api/albums/create       | Adds a new album if the user is logged in. Returns the created album. | `{ 'id': INT, 'category': STRING, 'title': STRING, 'description': STRING, 'cover': IMAGE, 'date': DATE, 'user_id': INT }`<br>Status: 201 |

| PUT /api/albums/int:album_id/edit | Updates the album info specified by album ID. Returns the updated album. | `{ 'id': INT, 'category': STRING, 'title': STRING, 'description': STRING, 'cover': IMAGE, 'date': DATE, 'user_id': INT }`<br>Status: 200 |

| DELETE /api/albums/int:album_id/delete | Deletes the specified album. Returns `{ 'message': STRING }` upon success. | `{ 'message': STRING }`<br>Status: 200 |

## Posts
| Request                       | Purpose                                              | Return Value              |
| :---------------------------- | :--------------------------------------------------- | :------------------------ |
| GET /api/posts                | Retrieves all posts. Returns a list of dictionaries. | `[ { 'id': INT, 'headline': STRING, 'content': STRING, 'image': STRING, 'date': DATE, 'album_id': INT, 'user_id': INT } ]`<br>Status: 200 |

| GET /api/posts/int:post_id    | Retrieves a single post. Returns a dictionary. | `{ 'id': INT, 'headline': STRING, 'content': STRING, 'image': STRING, 'date': DATE, 'album_id': INT, 'user_id': INT, 'comments': ARRAY, 'likes': INT, 'num_comments': INT }`<br>Status: 200 |

| POST /api/albums/int:album_id/posts/create | Adds a new post under the specified album ID. Returns the created post. | `{ 'id': INT, 'album_id': INT, 'user_id': INT, 'headline': STRING, 'content': STRING, 'date': DATE }`<br>Status: 201 |

| PUT /api/posts/int:post_id/edit | Updates the post info specified by post ID. Returns the updated post. | `{ 'id': INT, 'headline': STRING, 'content': STRING, 'image': STRING, 'date': DATE, 'album_id': INT, 'user_id': INT, 'comments': ARRAY, 'likes': INT, 'num_comments': INT }`<br>Status: 200 |

| DELETE /api/posts/int:post_id/delete | Deletes the specified post. Returns `{ 'message': STRING }` upon success. | `{ 'message': STRING }`<br>Status: 200 |

## Comments
| Request                       | Purpose                                              | Return Value              |
| :---------------------------- | :--------------------------------------------------- | :------------------------ |
| GET /api/comments/int:comment_id | Retrieves comment info. Returns a dictionary. | `{ 'id': INT, 'comment': STRING }`<br>Status: 200 |

| POST /api/posts/int:post_id/comments/create | Adds a new comment under the specified post ID. Returns the created comment. | `{ 'id': INT, 'comment': STRING }`<br>Status: 201 |

| PUT /api/comments/int:comment_id/edit | Updates the comment info specified by comment ID. Returns the updated comment. | `{ 'id': INT, 'comment': STRING }`<br>Status: 200 |

| DELETE /api/comments/int:comment_id/delete | Deletes the specified comment from the user's post. Returns `{ 'id': INT, 'comment': STRING }` upon success. | `{ 'id': INT, 'comment': STRING }`<br>Status: 200 |

## Likes
| Request                       | Purpose                                              | Return Value              |
| :---------------------------- | :--------------------------------------------------- | :------------------------ |
| GET /api/posts/int:post_id/likes/add | Adds a like under the specified post ID. Returns the updated post. | `{ 'id': INT, 'comment': STRING }`<br>Status: 201 |

| DELETE /api/posts/int:post_id/likes/remove | Removes a like under the specified post ID. Returns the updated post. | `{ 'id': INT, 'comment': STRING }`<br>Status: 201 |

## Followers
| Request                       | Purpose                                              | Return Value              |
| :---------------------------- | :--------------------------------------------------- | :------------------------ |
| GET /api/users/int:user_id/follow | Adds a follow under the specified user ID. Returns a list of the user's followers. | `{ 'id': INT, 'headline': STRING, 'content': STRING, 'image': STRING, 'date': DATE, 'album_id': INT, 'user_id': INT, 'comments': ARRAY, 'likes': INT, 'num_comments': INT }`<br>Status: 200 |

| DELETE /api/users/int:user_id/unfollow | Removes a follow under the specified user ID. Returns a list of the user's followers. | `{ 'id': INT, 'headline': STRING, 'content': STRING, 'image': STRING, 'date': DATE, 'album_id': INT, 'user_id': INT, 'comments': ARRAY, 'likes': INT, 'num_comments': INT }`<br>Status: 201 |


## Auth
| Request                        | Purpose                | Return Value  |                  
| :----------------------------- | :--------------------: | :------------------------------ |
| GET /api/auth/        | This fetch is sent upon initial app load and on subsequent refreshes.<br>It returns an object representing the current user, if user is logged in.                                 | {<br>&nbsp;&nbsp;&nbsp;'id': INT,<br>&nbsp;&nbsp;&nbsp;'username': STRING,<br>&nbsp;&nbsp;&nbsp;'email': STRING,<br>}<br><br>Status: 200<br>|
| POST /api/auth/unauthorized      | This endpoint will be routed to in the case that a protected route does not pass validations for the current user.<br>It returns an object with an errors property, which is an array with the value 'Unauthorized'          | {<br>&nbsp;&nbsp;&nbsp;'errors': ARRAY[STRINGS]<br>}<br><br>Status: 401<br>|
| POST /api/auth/signup        | This fetch sends the form data signup from data to the backend to process the creation of a new user.<br>It returns an object representing the current user, after logging them in, if account creation succeeds.                                 | {<br>&nbsp;&nbsp;&nbsp;'id': INT,<br>&nbsp;&nbsp;&nbsp;'username': STRING,<br>&nbsp;&nbsp;&nbsp;'email': STRING,<br>}<br><br>Status: 200<br>|
| POST /api/auth/login | This fetch attempts to login a user with the provided credentials.<br>It returns an object representing the current user, if validation succeeds.                                 | {<br>&nbsp;&nbsp;&nbsp;'id': INT,<br>&nbsp;&nbsp;&nbsp;'username': STRING,<br>&nbsp;&nbsp;&nbsp;'email': STRING,<br>}<br><br>Status: 200<br>|                                                                        
| POST /api/auth/logout | This fetch will logout the current user.<br>It returns an object with the message 'User logged Out' if it succeeds.                                 | {<br>&nbsp;&nbsp;&nbsp;'message': STRING<br>}<br><br>Status: 200<br>|



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