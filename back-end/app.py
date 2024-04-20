from flask import Flask, request, jsonify
from flaskext.mysql import MySQL
import os

app = Flask(__name__)

# MySQL configuration
app.config['MYSQL_DATABASE_HOST'] = os.environ.get('34.83.200.253')
app.config['MYSQL_DATABASE_USER'] = os.environ.get('cs157')
#Use "export DB_PASSWORD=Xzu88xF2{t~V9o\m to make it store into your local machine for security purposes
app.config['MYSQL_DATABASE_PASSWORD'] = os.environ.get('Databasecs157')
app.config['MYSQL_DATABASE_DB'] = os.environ.get('CarManagement')

# Initialize MySQL
mysql = MySQL(app)


#************************Rio Taiga(Employee, Customer table)***********************************
# Create Employee
@app.route('/employee', methods=['POST'])
def create_employee():
    try:
        # Extract data from request
        # Validate data
        # Insert data into database
        return jsonify({"message": "Employee created successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Read all Employees
@app.route('/employee', methods=['GET'])
def get_employees():
    try:
        # Query database for employees
        # Return employees as JSON
        return jsonify([]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Update Employee
@app.route('/employee/<int:employee_id>', methods=['PUT'])
def update_employee(employee_id):
    try:
        # Extract data from request
        # Validate data
        # Update employee in database
        return jsonify({"message": "Employee updated successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Delete Employee
@app.route('/employee/<int:employee_id>', methods=['DELETE'])
def delete_employee(employee_id):
    try:
        # Delete employee from database
        return jsonify({"message": "Employee deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Create Customer
@app.route('/customer', methods=['POST'])
def create_customer():
    try:
        # Extract data from request
        # Validate data
        # Insert data into database
        return jsonify({"message": "Customer created successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Read all Customers
@app.route('/customer', methods=['GET'])
def get_customers():
    try:
        # Query database for customers
        # Return customers as JSON
        return jsonify([]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Update Customer
@app.route('/customer/<int:customer_id>', methods=['PUT'])
def update_customer(customer_id):
    try:
        # Extract data from request
        # Validate data
        # Update customer in database
        return jsonify({"message": "Customer updated successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Delete Customer
@app.route('/customer/<int:customer_id>', methods=['DELETE'])
def delete_customer(customer_id):
    try:
        # Delete customer from database
        return jsonify({"message": "Customer deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    #*****************************************************************************
    
    #************************Eddie (Car, Car_part table)**************************
    #*****************************************************************************


    #************************YAR (transaction)************************************



    #*****************************************************************************




if __name__ == "__main__":
    app.run(debug=True)