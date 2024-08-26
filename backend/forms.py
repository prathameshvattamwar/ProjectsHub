from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, TextAreaField, FileField
from wtforms.validators import DataRequired, Length, Email, EqualTo

class RegistrationForm(FlaskForm):
    fullname = StringField('Full Name', validators=[DataRequired(), Length(min=2, max=150)])
    email = StringField('Email', validators=[DataRequired(), Email()])
    contact_number = StringField('Contact Number', validators=[DataRequired(), Length(min=10, max=15)])
    dob = StringField('Date of Birth', validators=[DataRequired()])
    city = StringField('City', validators=[DataRequired(), Length(min=2, max=100)])
    password = PasswordField('Password', validators=[
        DataRequired(),
        Length(min=6, max=60),
        EqualTo('confirm_password', message='Passwords must match')
    ])
    confirm_password = PasswordField('Confirm Password', validators=[DataRequired()])
    submit = SubmitField('Sign Up')

class LoginForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired()])
    submit = SubmitField('Login')

class ProjectUploadForm(FlaskForm):
    title = StringField('Project Title', validators=[DataRequired(), Length(min=2, max=150)])
    description = TextAreaField('Project Description', validators=[DataRequired()])
    category = StringField('Category', validators=[DataRequired()])
    github_link = StringField('GitHub Link')
    project_file = FileField('Upload Project (ZIP file)')
    submit = SubmitField('Upload Project')
