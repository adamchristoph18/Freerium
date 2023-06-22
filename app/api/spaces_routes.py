from flask import Blueprint
from flask_login import login_required
from app.models import User, Space, Question

spaces_routes = Blueprint('spaces', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@spaces_routes.route('/all')
def all_spaces():
    """
    GET all spaces
    """
    spaces = Space.query.all()
    return { 'spaces': [space.to_dict() for space in spaces] }

@spaces_routes.route('/<int:id>/questions')
def all_questions_for_individual_space(id):
    """
    Route to get all questions of a particular space
    """
    questions = Question.query.where(Question.space_id == id).all()
    return { 'questions': [question.to_dict() for question in questions] }
