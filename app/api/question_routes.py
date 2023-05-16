from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Question, User


question_routes = Blueprint('questions', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@question_routes.route('/all')
def all_questions():
    """
    GET all questions
    """
    questions = Question.query.all()
    return { 'questions': [question.to_dict() for question in questions] }
