from datetime import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(40), nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    profile_image_url = db.Column(db.String(500), default="https://freerium-image-uploads.s3.us-east-2.amazonaws.com/test-image.png")
    hashed_password = db.Column(db.String(255), nullable=False)

    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.now())

    # Relationships
    questions = db.relationship('Question', back_populates='user', cascade="all, delete-orphan")
    answers = db.relationship('Answer', back_populates='user', cascade="all, delete-orphan")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'username': self.username,
            'email': self.email,
            'profile_image_url': self.profile_image_url,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'questions': [question.to_dict_no_user() for question in self.questions],
            'answers': [answer.to_dict_no_user() for answer in self.answers]
        }
