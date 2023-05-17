from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Question, User
from ..forms import QuestionForm


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


@question_routes.route('/new', methods=['POST'])
@login_required
def add_question():
    """
    POST route to add a new question
    """
    form = QuestionForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if not form.validate_on_submit():
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401

    data = form.data

    new_question = Question(
        title=data['title'],
        context=data['context'],
        image_url=data['imageUrl'],
        upvotes=data['upvotes'],
        downvotes=data['downvotes'],
        user_id=data['userId'],
        space_id=data['spaceId']
    )

    db.session.add(new_question)
    db.session.commit()
