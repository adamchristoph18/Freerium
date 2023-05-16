from datetime import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod


class Question(db.Model):
    __tablename__ = 'questions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    # Common Keys
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    context = db.Column(db.String(2000), nullable=False)
    image_url = db.Column(db.String(500))
    upvotes = db.Column(db.Integer, nullable=False, default=0)
    downvotes = db.Column(db.Integer, nullable=False, default=0)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    # Foreign keys
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("users.id")), nullable=False)
    space_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("spaces.id")), nullable=False)

    # Relationships
    user = db.relationship('User', back_populates='questions')
    answers = db.relationship('Answer', back_populates='question')
    space = db.relationship('Space', back_populates='questions')

    def upvoted(self):
        self.upvotes += 1
        return self.upvotes

    def downvoted(self):
        self.downvotes -= 1
        return self.upvotes

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'context': self.context,
            'image_url': self.image_url,
            'upvotes': self.upvotes,
            'downvotes': self.downvotes,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
