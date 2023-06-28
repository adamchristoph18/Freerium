from datetime import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod


class Space(db.Model):
    __tablename__ = 'spaces'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    # Common Keys
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(2000), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    # Foreign keys
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("users.id")), nullable=False)

    # Relationships
    questions = db.relationship('Question', back_populates='space')

    def to_dict(self):
        return {
            'id': self.id,
            'user': self.user_id,
            'name': self.name,
            'description': self.description,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
