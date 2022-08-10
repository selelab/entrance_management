from flask import Flask
from app.database import init_db, db
from app.models import Member


def create_app():
    app = Flask(__name__)
    app.config.from_object('app.config.Config')

    init_db(app)

    @app.route('/')
    def index():
        return 'プログラムです'

    @app.route('/add')
    def add_user():
        member = Member(student_id="A2078192", discord_id="kotaro#6765")
        db.session.add(member)
        db.session.commit()
        return 'ユーザを増やしました'
    return app


app = create_app()
