import os
from flask import Flask, render_template, request, redirect, url_for, flash, session, jsonify
from models import db, User  # Import the db and User from models
import bcrypt

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///C:/Users/ADMIN/Documents/Prathamesh/Python/ProjectsHub/backend/instance/users.db'

# Print the database URI to confirm it's correctly set
print("Database URI:", app.config['SQLALCHEMY_DATABASE_URI'])

# Initialize SQLAlchemy with the app
db.init_app(app)  # Correctly register the Flask app with SQLAlchemy

# Home route
@app.route('/')
def home():
    return render_template('index.html')

# Registration route
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    existing_user = User.query.filter_by(email=data['email']).first()
    if existing_user is None:
        hashed_password = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())
        new_user = User(
            fullname=data['fullname'],
            email=data['email'],
            contact_number=data['contact_number'],
            dob=data['dob'],
            city=data['city'],
            password=hashed_password.decode('utf-8')
        )
        try:
            db.session.add(new_user)
            db.session.commit()
            return jsonify({"success": True})
        except Exception as e:
            db.session.rollback()
            print(f"Error during registration: {str(e)}")
            return jsonify({"success": False})
    else:
        return jsonify({"success": False})

# Login route
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(email=data['email']).first()

    if user and bcrypt.checkpw(data['password'].encode('utf-8'), user.password.encode('utf-8')):
        session['user_id'] = user.id  # Add user to session
        return jsonify({"success": True})
    else:
        return jsonify({"success": False})

# Dashboard route
@app.route('/dashboard')
def dashboard():
    if 'user_id' not in session:
        return redirect(url_for('home'))
    return render_template('dashboard.html')

# Initialize the database and add a test user
if __name__ == "__main__":
    with app.app_context():
        db.create_all()
        # Add a test user to the database
        if not User.query.filter_by(email="testuser@example.com").first():
            hashed_password = bcrypt.hashpw("password".encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
            new_user = User(
                fullname="Test User",
                email="testuser@example.com",
                contact_number="1234567890",
                dob="01-01-1990",
                city="Test City",
                password=hashed_password
            )
            db.session.add(new_user)
            db.session.commit()
            print("Test user added.")
        else:
            print("Test user already exists.")

    app.run(debug=True)
