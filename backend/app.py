import os
from flask import Flask, render_template, request, redirect, url_for, session, jsonify, flash, send_from_directory
from models import db, User, Project
import bcrypt
from flask import send_from_directory

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(os.path.abspath(os.path.dirname(__file__)), 'instance', 'users.db')
app.config['UPLOAD_FOLDER'] = os.path.join(app.root_path, 'uploads')

# Initialize SQLAlchemy with the app
db.init_app(app)

# Ensure the uploads folder exists
if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])

# Home route
@app.route('/')
def home():
    username = session.get('username')
    return render_template('index.html', username=username)

# Public dashboard route
@app.route('/dashboard')
def dashboard():
    projects = Project.query.all()
    username = session.get('username')
    return render_template('dashboard.html', projects=projects, username=username)

# Personal dashboard route
@app.route('/my_dashboard')
def my_dashboard():
    if 'user_id' not in session:
        return redirect(url_for('home'))
    
    user_id = session['user_id']
    user_projects = Project.query.filter_by(user_id=user_id).all()
    username = session.get('username')
    return render_template('dashboard.html', projects=user_projects, username=username)

# Logout route
@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('home'))

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
            session['user_id'] = new_user.id
            session['username'] = new_user.fullname
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
        session['user_id'] = user.id
        session['username'] = user.fullname
        return jsonify({"success": True})
    else:
        return jsonify({"success": False})

# Route to handle project uploads
@app.route('/upload_project', methods=['POST'])
def upload_project():
    if 'user_id' not in session:
        return redirect(url_for('home'))

    data = request.form
    user_id = session['user_id']

    # Handle file upload
    project_file = request.files.get('project_file')
    cover_image = request.files.get('cover_image')
    github_link = data.get('github_link')
    visibility = data.get('visibility', 'public')
    tags = data.get('tags', '')
    project_file_path = None
    cover_image_path = None

    # Ensure the directory exists before saving files
    if not os.path.exists(app.config['UPLOAD_FOLDER']):
        os.makedirs(app.config['UPLOAD_FOLDER'])

    if project_file:
        file_name = f"{user_id}_{project_file.filename}"
        project_file_path = os.path.join(app.config['UPLOAD_FOLDER'], file_name)
        project_file.save(project_file_path)

    if cover_image:
        cover_image_name = f"{user_id}_{cover_image.filename}"
        cover_image_path = os.path.join(app.config['UPLOAD_FOLDER'], cover_image_name)
        cover_image.save(cover_image_path)
        cover_image_db_path = cover_image_name  # Only store the filename in the database

    new_project = Project(
        title=data['title'],
        description=data['description'],
        category=data['category'],
        github_link=github_link if github_link else None,
        file_path=project_file_path if project_file_path else None,
        cover_image=cover_image_db_path if cover_image_db_path else None,
        tags=tags,
        visibility=visibility,
        user_id=user_id
    )
    try:
        db.session.add(new_project)
        db.session.commit()
        return redirect(url_for('my_dashboard'))
    except Exception as e:
        db.session.rollback()
        print(f"Error during project upload: {str(e)}")
        return jsonify({"success": False, "message": "There was an error uploading the project."})
    
@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

# Route to download project files
@app.route('/download_project/<int:project_id>')
def download_project(project_id):
    project = Project.query.get_or_404(project_id)
    if project.file_path:
        return send_from_directory(directory=app.config['UPLOAD_FOLDER'], path=os.path.basename(project.file_path), as_attachment=True)
    else:
        flash("No file associated with this project.", "warning")
        return redirect(url_for('my_dashboard'))

# Initialize the database and add a test user
if __name__ == "__main__":
    with app.app_context():
        db.create_all()
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
