from app import app, mysql
from flask import jsonify

@app.route('/api/employees', methods=['GET'])
def get_employees():
    # Connect to the database
    cursor = mysql.get_db().cursor()
    # Execute SQL query to select all records from the employees table
    cursor.execute('SELECT * FROM employees')
    # Fetch all records
    employees = cursor.fetchall()
    # Convert records to JSON format and return
    return jsonify(employees)

@app.route('/api/customers', methods=['GET'])
def get_customers():
    # Connect to the database
    cursor = mysql.get_db().cursor()
    # Execute SQL query to select all records from the customers table
    cursor.execute('SELECT * FROM customers')
    # Fetch all records
    customers = cursor.fetchall()
    # Convert records to JSON format and return
    return jsonify(customers)