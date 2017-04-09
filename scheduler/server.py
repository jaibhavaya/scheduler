from flask import Flask, render_template, jsonify, request
from creds import creds
from modules.models import db
from modules.models.employee import Employee
from modules.models.day import Day
from sqlalchemy import exc


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


@app.route("/createEmployee", methods=['POST'])
def create_employee():
    json = request.get_json()
    first_name = json['firstName']
    last_name = json['lastName']
    middle_name = json['middleName']
    user_name = json['userName']
    employee = Employee(first_name, last_name, middle_name, user_name)
    db.session.add(employee)
    try:
        db.session.commit()
    except exc.IntegrityError:
        db.session.rollback()
        return '', 403

    return jsonify({'id': employee.id})


@app.route("/getEmployees")
def get_employees():
    employees = Employee.query.all()
    return_list = []
    for employee in employees:
        return_list.append({
            'id': employee.id,
            'firstName': employee.first_name,
            'lastName': employee.last_name,
            'middleName': employee.middle_name,
            'userName': employee.user_name
        })

    return jsonify({'employees': return_list})


if __name__ == "__main__":
    app.run(debug=True)
