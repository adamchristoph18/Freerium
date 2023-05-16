import json
from app.models import db, Space, environment, SCHEMA
from sqlalchemy.sql import text


def seed_spaces():

    # ADD THE FIELDS WE ADDED TO THE USER MODEL HERE!!!!!!!!!!!!!!!
    f = open('seed_data/spaces.json')
    spaces = json.load(f)

    for s in spaces:
        space = Space(
            name=s['name'],
            description=s['description']
        )
        db.session.add(space)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the spaces table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_spaces():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.spaces RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM spaces"))

    db.session.commit()
