import json
from app.models import db, Answer, environment, SCHEMA
from sqlalchemy.sql import text


def seed_answers():

    # ADD THE FIELDS WE ADDED TO THE USER MODEL HERE!!!!!!!!!!!!!!!
    f = open('seed_data/answers.json')
    answers = json.load(f)

    for a in answers:
        answer = Answer(
            user_id=a['user_id'],
            question_id=a['question_id'],
            body=a['body'],
            upvotes=a['upvotes'],
            downvotes=a['downvotes']
        )
        db.session.add(answer)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the answers table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_answers():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.answers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM answers"))

    db.session.commit()
