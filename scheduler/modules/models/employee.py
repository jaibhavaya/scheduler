from modules.models import db


class Employee(db.Model):
    __tablename__ = 'employee'
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(80))
    last_name = db.Column(db.String(80))
    middle_name = db.Column(db.String(80))
    user_name = db.Column(db.String(80), unique=True)

    def __init__(self, first_name, last_name, middle_name, user_name):
        self.first_name = first_name
        self.last_name = last_name
        self.middle_name = middle_name
        self.user_name = user_name
