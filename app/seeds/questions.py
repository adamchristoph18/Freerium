import json
from app.models import db, Question, environment, SCHEMA
from sqlalchemy.sql import text


def seed_questions():

    # ADD THE FIELDS WE ADDED TO THE USER MODEL HERE!!!!!!!!!!!!!!!
    f = open('seed_data/questions.json')
    questions = json.load(f)

    for q in questions:
        question = Question(
            user_id=q['user_id'],
            space_id=q['space_id'],
            title=q['title'],
            context=q['context'],
            image_url=q['image_url'],
            upvotes=q['upvotes'],
            downvotes=q['downvotes']
        )
        db.session.add(question)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the questions table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_questions():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.questions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM questions"))

    db.session.commit()
