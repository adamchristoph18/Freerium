from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Question, Answer, User
from ..forms import AnswerForm
from datetime import datetime

answer_routes = Blueprint('answers', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@answer_routes.route('/all')
def all_answers():
    """
    GET all answers
    """
    answers = Answer.query.all()
    return { 'answers': [answer.to_dict() for answer in answers] }

@answer_routes.route('/new', methods=['POST'])
@login_required
def add_answer():
    """
    POST route to add a new answer
    """
    form = AnswerForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if not form.validate_on_submit():
            return {'errors': validation_errors_to_error_messages(form.errors)}, 401

    data = form.data

    new_answer = Answer(
        body=data['body'],
        upvotes=data['upvotes'],
        downvotes=data['downvotes'],
        user_id=data['userId'],
        question_id=data['questionId'],
        created_at=datetime.now()
    )

    db.session.add(new_answer)
    db.session.commit()

    return {"answer": new_answer.to_dict()}

@answer_routes.route('<int:id>/update', methods=['PUT'])
@login_required
def update_answer(id):
    """
    Route to update a single answer by id
    """
    form = AnswerForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']

    if not form.validate_on_submit():
        return {"errors": validation_errors_to_error_messages(form.errors)}, 401

    p = request.json
    answer = Answer.query.get(id)

    answer.body = p['body']
    answer.updated_at=datetime.now()

    db.session.commit()
    return {"answer": answer.to_dict()}

@answer_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_answer(id):
    """
    Route to delete an answer
    """
    answer = Answer.query.get(id)

    if not answer:
        return {'error': 'answer not found'}

    db.session.delete(answer)
    db.session.commit()

    return {'answer': 'answer successfully deleted.'}
