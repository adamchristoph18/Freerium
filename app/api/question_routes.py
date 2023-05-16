from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Message, User


question_routes = Blueprint('questions', __name__)
