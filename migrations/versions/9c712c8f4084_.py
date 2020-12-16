"""empty message

Revision ID: 9c712c8f4084
Revises: 71f77ac46013
Create Date: 2020-12-16 19:33:40.256739

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '9c712c8f4084'
down_revision = '71f77ac46013'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('cities', sa.Column('deleted_at', sa.DateTime(), nullable=True))
    op.add_column('cities', sa.Column('updated_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True))
    op.drop_column('cities', 'delete_at')
    op.drop_column('cities', 'update_at')
    op.add_column('comments', sa.Column('deleted_at', sa.DateTime(), nullable=True))
    op.add_column('comments', sa.Column('updated_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True))
    op.drop_column('comments', 'delete_at')
    op.drop_column('comments', 'update_at')
    op.add_column('likes', sa.Column('deleted_at', sa.DateTime(), nullable=True))
    op.add_column('likes', sa.Column('updated_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True))
    op.drop_column('likes', 'delete_at')
    op.drop_column('likes', 'update_at')
    op.add_column('posts', sa.Column('deleted_at', sa.DateTime(), nullable=True))
    op.add_column('posts', sa.Column('updated_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True))
    op.drop_column('posts', 'delete_at')
    op.drop_column('posts', 'update_at')
    op.add_column('users', sa.Column('deleted_at', sa.DateTime(), nullable=True))
    op.add_column('users', sa.Column('updated_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True))
    op.drop_column('users', 'delete_at')
    op.drop_column('users', 'update_at')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('update_at', mysql.DATETIME(), server_default=sa.text('CURRENT_TIMESTAMP'), nullable=True))
    op.add_column('users', sa.Column('delete_at', mysql.DATETIME(), nullable=True))
    op.drop_column('users', 'updated_at')
    op.drop_column('users', 'deleted_at')
    op.add_column('posts', sa.Column('update_at', mysql.DATETIME(), server_default=sa.text('CURRENT_TIMESTAMP'), nullable=True))
    op.add_column('posts', sa.Column('delete_at', mysql.DATETIME(), nullable=True))
    op.drop_column('posts', 'updated_at')
    op.drop_column('posts', 'deleted_at')
    op.add_column('likes', sa.Column('update_at', mysql.DATETIME(), server_default=sa.text('CURRENT_TIMESTAMP'), nullable=True))
    op.add_column('likes', sa.Column('delete_at', mysql.DATETIME(), nullable=True))
    op.drop_column('likes', 'updated_at')
    op.drop_column('likes', 'deleted_at')
    op.add_column('comments', sa.Column('update_at', mysql.DATETIME(), server_default=sa.text('CURRENT_TIMESTAMP'), nullable=True))
    op.add_column('comments', sa.Column('delete_at', mysql.DATETIME(), nullable=True))
    op.drop_column('comments', 'updated_at')
    op.drop_column('comments', 'deleted_at')
    op.add_column('cities', sa.Column('update_at', mysql.DATETIME(), server_default=sa.text('CURRENT_TIMESTAMP'), nullable=True))
    op.add_column('cities', sa.Column('delete_at', mysql.DATETIME(), nullable=True))
    op.drop_column('cities', 'updated_at')
    op.drop_column('cities', 'deleted_at')
    # ### end Alembic commands ###