from flask import Flask
from flask import request
from flask_cors import CORS
from pymongo import MongoClient
import json

app = Flask(__name__)
CORS(app)
client = MongoClient('localhost', 27017)
db = client['MyFormBuilderDB']


@app.route("/get_all_forms_details", methods=['GET'])
def get_form_details():
    form_details_collection = db['FormDetails']
    res = []
    for form_details in form_details_collection.find():
        json_data = {'formID': form_details['formID'], 'subCount': form_details['subCount'],
                     'formName': form_details['formName']}
        res.append(json_data)
    return json.dumps(res)


@app.route("/get_form_fields", methods=['GET'])
def get_form_fields():
    form_fields_collection = db['FormFields']
    form_field = form_fields_collection.find_one({'formID': request.args['formID']})
    res = {'formID': form_field['formID'], 'formFields': form_field['formFields']}
    return json.dumps(res)


@app.route("/get_form_submissions", methods=['GET'])
def get_form_submissions():
    return json.dumps(get_submissions_from_collection(request.args['formID']))


def get_submissions_from_collection(form_id):
    form_submissions_collection = db['FormSubmissions']
    form_submissions = form_submissions_collection.find_one({'formID': form_id})
    return {'formID': form_id, 'formSubmissions': form_submissions['userSubmissions']}


@app.route("/add_new_form", methods=['POST'])
def add_new_form_details():
    add_new_form_details()
    add_new_form_fields()
    add_new_form_submissions()
    return 'done'


def add_new_form_details():
    form_details_collection = db['FormDetails']
    form_details_collection.insert_one({'formID': request.json['formID'],
                                        'subCount': 0, 'formName': request.json['formName']})


def add_new_form_submissions():
    form_submissions_collection = db['FormSubmissions']
    form_submissions_collection.insert_one({'formID': request.json['formID'], 'userSubmissions': []})


def add_new_form_fields():
    form_fields_collection = db['FormFields']
    form_fields_collection.insert_one({'formID': request.json['formID'], 'formFields': request.json['formFields']})


@app.route("/add_submission", methods=['POST'])
def add_submission():
    inc_submission_counter()
    save_submission_details()
    return 'done'


def inc_submission_counter():
    form_details_collection = db['FormDetails']
    form_id = request.json['formID']
    form_details_collection.find_one_and_update({'formID': form_id}, {'$inc': {'subCount': 1}})


def save_submission_details():
    form_submissions_collection = db['FormSubmissions']
    form_id = request.json['formID']
    new_user_submissions = get_submissions_from_collection(form_id)['formSubmissions']
    new_user_submissions.append(request.json['refs'])
    form_submissions_collection.find_one_and_update(
        {'formID': form_id}, {'$set': {'userSubmissions': new_user_submissions}})


if __name__ == '__main__':
    app.run()
