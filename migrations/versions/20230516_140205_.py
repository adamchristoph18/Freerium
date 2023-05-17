"""empty message

Revision ID: 35fe40c97997
Revises: 0356581bc0c8
Create Date: 2023-05-16 14:02:05.836317

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '35fe40c97997'
down_revision = '0356581bc0c8'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('answers', schema=None) as batch_op:
        batch_op.alter_column('upvotes',
               existing_type=sa.INTEGER(),
               nullable=False)
        batch_op.alter_column('downvotes',
               existing_type=sa.INTEGER(),
               nullable=False)

    with op.batch_alter_table('questions', schema=None) as batch_op:
        batch_op.alter_column('upvotes',
               existing_type=sa.INTEGER(),
               nullable=False)
        batch_op.alter_column('downvotes',
               existing_type=sa.INTEGER(),
               nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('questions', schema=None) as batch_op:
        batch_op.alter_column('downvotes',
               existing_type=sa.INTEGER(),
               nullable=True)
        batch_op.alter_column('upvotes',
               existing_type=sa.INTEGER(),
               nullable=True)

    with op.batch_alter_table('answers', schema=None) as batch_op:
        batch_op.alter_column('downvotes',
               existing_type=sa.INTEGER(),
               nullable=True)
        batch_op.alter_column('upvotes',
               existing_type=sa.INTEGER(),
               nullable=True)

    # ### end Alembic commands ###