"""Add group-student-trainer relation

Revision ID: ece97bde74a1
Revises: 0440de1187b8
Create Date: 2024-02-13 19:23:16.126915

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'ece97bde74a1'
down_revision: Union[str, None] = '0440de1187b8'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('StudentGroups',
    sa.Column('student_id', sa.Integer(), nullable=False),
    sa.Column('group_id', sa.Integer(), nullable=False),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('DateAdd', sa.DateTime(), nullable=False),
    sa.Column('DateUpdate', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['group_id'], ['Groups.id'], ),
    sa.ForeignKeyConstraint(['student_id'], ['Users.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('student_id')
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('StudentGroups')
    # ### end Alembic commands ###
