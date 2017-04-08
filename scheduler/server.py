from flask import Flask, render_template, jsonify
from flask_sqlalchemy import SQLAlchemy
from creds import creds
from modules.models import db
from modules.models.employee import Employee
from modules.models.day import Day


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://{}:{}@localhost/scheduler'.format(creds['user'], creds['password'])
db.app = app
db.init_app(app)


@app.before_first_request
def init_db():
    db.create_all()


@app.route("/")
def hello():
    return render_template('index.html')


@app.route("/partials/<partial>")
def render_partial(partial):
    return render_template('partials/{}'.format(partial))


@app.route("/getEmployees")
def get_employees():
    employees = Employee.query.all()
    return_list = []
    for employee in employees:
        return_list.append(employee.get_first_name())

    return jsonify({'employees': return_list})


if __name__ == "__main__":
    app.run(debug=True)
