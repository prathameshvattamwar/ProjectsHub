import os
from app import app, db

# Ensure the instance folder exists
if not os.path.exists('C:/Users/ADMIN/Documents/Prathamesh/Python/ProjectsHub/backend/instance/'):
    os.makedirs('C:/Users/ADMIN/Documents/Prathamesh/Python/ProjectsHub/backend/instance/')

# Initialize the database
with app.app_context():
    db.create_all()
print("Database has been initialized.")
