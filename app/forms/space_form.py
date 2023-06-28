from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError, Length



class SpaceForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), Length(1, 40)])
    description = StringField('description', validators=[DataRequired(), Length(1, 200)])
    userId = IntegerField('userId')
