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
