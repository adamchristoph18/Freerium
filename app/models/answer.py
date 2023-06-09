from datetime import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod


class Answer(db.Model):
    __tablename__ = 'answers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    # Common Keys
    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String(2000), nullable=False)
    upvotes = db.Column(db.Integer, nullable=False, default=0)
    downvotes = db.Column(db.Integer, nullable=False, default=0)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    # Foreign keys
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("users.id")), nullable=False)
    question_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("questions.id")), nullable=False)

    # Relationships
    question = db.relationship('Question', back_populates='answers')
    user = db.relationship('User', back_populates='answers')

    def upvoted(self):
        self.upvotes += 1
        return self.upvotes

    def downvoted(self):
        self.downvotes -= 1
        return self.upvotes

    def to_dict(self):
        return {
            'id': self.id,
            'body': self.body,
            'upvotes': self.upvotes,
            'downvotes': self.downvotes,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'user': self.user.to_dict(),
            'question': self.question.to_dict_no_user()
        }

    def to_dict_no_user(self):
        return {
            'id': self.id,
            'body': self.body,
            'upvotes': self.upvotes,
            'downvotes': self.downvotes,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
