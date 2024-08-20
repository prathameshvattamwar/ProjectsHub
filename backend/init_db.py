from app import app, db
import os

# Ensure the instance folder exists
if not os.path.exists(app.instance_path):
    os.makedirs(app.instance_path)

# Initialize the database
with app.app_context():
    db.create_all()
print("Database has been initialized.")
