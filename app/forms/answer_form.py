from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError, Length



class AnswerForm(FlaskForm):
    body = StringField('body', validators=[DataRequired(), Length(1, 2000)])
    upvotes = IntegerField('upvotes')
    downvotes = IntegerField('downvotes')
    userId = IntegerField('userId')
    questionId = IntegerField('spotId')
