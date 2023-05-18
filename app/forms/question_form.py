from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError, Length

# spaces = ['Technology', 'Exercise', 'Personal Health', 'Financial Well-Being', 'Travel', 'Career Goals', 'Miscellaneous']

class QuestionForm(FlaskForm):
    # space = IntegerField('space', validators=[DataRequired()])
    title = StringField('title', validators=[DataRequired(), Length(1, 255)])
    context = StringField('context', validators=[DataRequired(), Length(1, 2000)])
    imageUrl = StringField('imageUrl') # Not required, going to update later with AWS anyway
    upvotes = IntegerField('upvotes')
    downvotes = IntegerField('downvotes')
    userId = IntegerField('userId')
    spaceId = IntegerField('spotId')
