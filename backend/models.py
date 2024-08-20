from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    fullname = db.Column(db.String(150), nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    contact_number = db.Column(db.String(15), nullable=False)
    dob = db.Column(db.String(10), nullable=False)
    city = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(60), nullable=False)
    