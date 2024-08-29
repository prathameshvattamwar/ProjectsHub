from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    fullname = db.Column(db.String(150), nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    contact_number = db.Column(db.String(15), nullable=False)
    dob = db.Column(db.String(10), nullable=False)
    city = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(150), nullable=False)

class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    description = db.Column(db.Text, nullable=False)
    category = db.Column(db.String(100), nullable=False)
    github_link = db.Column(db.String(250))
    file_path = db.Column(db.String(250))
    cover_image = db.Column(db.String(250))  # New field for cover image
    tags = db.Column(db.String(250))  # New field for tags
    visibility = db.Column(db.String(10), default='public')  # New field for visibility (public/private)
    like_count = db.Column(db.Integer, default=0)  # New field for like count
    favorite_count = db.Column(db.Integer, default=0)  # New field for favorite count
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())  # New field for date/time
    updated_at = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

    def __repr__(self):
        return f'<Project {self.title}>'
