from modules.models import db


class Day(db.Model):
    __tablename__ = 'day'
    day_id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DATE)
    employee_id = db.Column(db.Integer, db.ForeignKey('employee.id'))
    hours = db.Column(db.Float)

    employee = db.relationship('Employee', backref=db.backref('posts', lazy='dynamic'))

    def __init__(self, employee, date, hours):
        self.employee = employee
        self.date = date
        self.hours = hours
