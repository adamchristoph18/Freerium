from flask import Blueprint
from flask_login import login_required
from app.models import User, Space

spaces_routes = Blueprint('spaces', __name__)
