from datetime import datetime
from app.database import db


class Member(db.Model):

    __tablename__ = 'members'

    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.String(8), nullable=False)
    discord_id = db.Column(db.String(255), nullable=False)
    enter_flg = db.Column(db.Boolean, nullable=False, default=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)
    updated_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.now, onupdate=datetime.now)

    def __repr__(self):
        return '<Member id={id} student_id={student_id} discord_id={discord_id}>'.format(
            id=self.id, student_id=self.student_id, discord_id=self.discord_id)
