from flask_wtf import FlaskForm
from wtforms import StringField, SelectField
from wtforms.validators import DataRequired, ValidationError, Length

spaces = ['Technology', 'Exercise', 'Personal Health', 'Financial Well-Being', 'Travel', 'Career Goals', 'Miscellaneous']

class QuestionForm(FlaskForm):
    space = SelectField('space', choices=spaces, validators=[DataRequired()])
    title = StringField('title', validators=[DataRequired()])
    context = StringField('context', validators=[DataRequired()])
    image_url = StringField('Image') # Not required, going to update later with AWS anyway
