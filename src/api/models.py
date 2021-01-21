from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import func

db = SQLAlchemy()


######### TABLA USERS

class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime,server_default=func.now(),onupdate=func.now())
    deleted_at = db.Column(db.DateTime)
    user_name = db.Column(db.String(20),nullable=False) 
    first_name = db.Column(db.String(60), nullable=False)
    last_name = db.Column(db.String(90))
    email = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    country = db.Column(db.String(40), nullable=False)
    languages = db.Column(db.String(50), nullable=False)


    posts = db.relationship("Posts")  
    likes = db.relationship("Likes")  
    comments = db.relationship("Comments")  

    # avatar = db.Column(db.String(50), nullable=True)
    # active = db.Column(db.Boolean(), nullable=False)

    def __str__(self):
        return f"{self.user_name}"

    def serialize(self):
        return {
            'id': self.id,
            'user_name': self.user_name,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
            'country': self.country,
            'languages': self.languages
        }
    
    def serialize_required(self):
        return{
            'user_name': str,
            'first_name': str,
            'email': str,
            'country': str,
            'languages': str
        }

    def serialize_all_types(self):
        return{
            'user_name': str,
            'first_name': str,
            'last_name': str,
            'email': str,
            'country': str,
            'languages': str,
            'password': str,
        }
            
        



######### TABLA CITIES

class Cities(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime,server_default=func.now(),onupdate=func.now())
    deleted_at = db.Column(db.DateTime)
    city_name = db.Column(db.String(50), nullable=False)
    image = db.Column(db.String(500), nullable=False)
    population = db.Column(db.String(150), nullable=False)
    cost_of_living = db.Column(db.String(150), nullable=False)
    average_highest_temp = db.Column(db.String(150), nullable=False)
    average_lowest_temp = db.Column(db.String(150), nullable=False)
    population_density = db.Column(db.String(150), nullable=False)

    likes = db.relationship("Likes")  
    posts = db.relationship("Posts")  

    def __str__(self):
        return f"<Cities {self.city_name}>"

    def serialize(self):
        return {
            'id': self.id,
            'city_name': self.city_name,
            'image': self.image,
            'population': self.population,
            'cost_of_living': self.cost_of_living,
            'average_highest_temp': self.average_highest_temp,
            'average_lowest_temp': self.average_lowest_temp,
            'population_density': self.population_density
        }

    def serialize_required(self):
        return{
            'city_name': str,
            'image': str,
            'population': str,
            'cost_of_living': str,
            'average_highest_temp': str,
            'average_lowest_temp': str,
            'population_density': str
        }

    def serialize_all_types(self):
        return {
            'city_name': str,
            'image': str,
            'population': str,
            'cost_of_living': str,
            'average_highest_temp': str,
            'average_lowest_temp': str,
            'population_density': str
        }


######### TABLA POSTS

class Posts(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime,server_default=func.now(),onupdate=func.now())
    deleted_at = db.Column(db.DateTime)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    city_id = db.Column(db.Integer, db.ForeignKey('cities.id'), nullable=False)
    text = db.Column(db.String(150), nullable=False)

    user = db.relationship("Users")
    city = db.relationship("Cities")
    comments = db.relationship("Comments")


    def __str__(self):
        return f"<{self.user.user_name} posted: {self.text}>"

    def serialize(self):
        comments = []
        for comment in self.comments:
            comments.append(comment.serialize())

        return {
            'id': self.id,
            'user_name': self.user.user_name, 
            'city_id': self.city_id, 
            'city': self.city.city_name,
            'created_at': self.created_at,
            'text': self.text,
            'comments': comments
        }

    def serialize_required(self):
        return{
            'city_id': self.city_id,
            'user_id': self.user_id,
            'text': self.text,
        }

######### TABLA LIKES

class Likes(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime,server_default=func.now(),onupdate=func.now())
    deleted_at = db.Column(db.DateTime)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    city_id = db.Column(db.Integer, db.ForeignKey('cities.id'), nullable=False)

    user = db.relationship("Users")
    city = db.relationship("Cities")

    def __str__(self):
        return f"< {self.user} likes>"

    def serialize(self):
        return {
            'id': self.id,
            'user': self.user_id,
            'users': self.user.user_name,
            'city_id': self.city_id,
            'text': self.text       
        }

    def serialize_required(self):
        return{
            'city_id': self.city_id,
            'user_id': self.user_id,
        }        

######### TABLA COMMENTS

class Comments(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime,server_default=func.now(),onupdate=func.now())
    deleted_at = db.Column(db.DateTime)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)
    text = db.Column(db.String(150), nullable=False)

    user = db.relationship("Users")
    post = db.relationship("Posts")

    def __str__(self):
        return f"<comments from {self.user}>"

    def serialize(self):
        return {
            'id': self.id,
            'users': self.user.user_name,
            'created_at': self.created_at,
            'text': self.text       
        }

    def serialize_required(self):
        return{
            'post_id': self.post_id,
            'user_id': self.user_id,
            'text': self.text
        } 

####preguntar como proceder con estas, tengo dudas con el serialize_required y serialize_all_types 
