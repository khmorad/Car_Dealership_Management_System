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

# Create Employee
@app.route('/employee', methods=['POST'])
def create_employee():
    try:
        name = request.json['name']
        dob = request.json['dob']
        age = request.json['age']
        department = request.json['department']
        job_title = request.json['job_title']
        report_to = request.json['report_to']

        cursor = mysql.get_db().cursor()
        cursor.execute(
            "INSERT INTO Employee (Name, DOB, Age, Department, jobTitle, reportTo) VALUES (%s, %s, %s, %s, %s, %s)",
            (name, dob, age, department, job_title, report_to)
        )
        mysql.get_db().commit()

        return jsonify({"message": "Employee created successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Read all Employees
@app.route('/employee', methods=['GET'])
def get_employees():
    try:
        cursor = mysql.get_db().cursor()
        cursor.execute("SELECT * FROM Employee")
        employees = cursor.fetchall()

        return jsonify(employees), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Update Employee
@app.route('/employee/<int:employee_id>', methods=['PUT'])
def update_employee(employee_id):
    try:
        name = request.json['name']
        dob = request.json['dob']
        age = request.json['age']
        department = request.json['department']
        job_title = request.json['job_title']
        report_to = request.json['report_to']

        cursor = mysql.get_db().cursor()
        cursor.execute(
            "UPDATE Employee SET Name=%s, DOB=%s, Age=%s, Department=%s, jobTitle=%s, reportTo=%s WHERE Employee_ID=%s",
            (name, dob, age, department, job_title, report_to, employee_id)
        )
        mysql.get_db().commit()

        return jsonify({"message": "Employee updated successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Delete Employee
@app.route('/employee/<int:employee_id>', methods=['DELETE'])
def delete_employee(employee_id):
    try:
        cursor = mysql.get_db().cursor()
        cursor.execute("DELETE FROM Employee WHERE Employee_ID=%s", (employee_id,))
        mysql.get_db().commit()

        return jsonify({"message": "Employee deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Create Customer
@app.route('/customer', methods=['POST'])
def create_customer():
    try:
        name = request.json['name']
        dob = request.json['dob']
        age = request.json['age']
        address = request.json['address']
        phone_number = request.json['phone_number']
        email = request.json['email']

        cursor = mysql.get_db().cursor()
        cursor.execute(
            "INSERT INTO Customers (Name, DOB, Age, Address, PhoneNumber, Email) VALUES (%s, %s, %s, %s, %s, %s)",
            (name, dob, age, address, phone_number, email)
        )
        mysql.get_db().commit()

        return jsonify({"message": "Customer created successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Read all Customers
@app.route('/customer', methods=['GET'])
def get_customers():
    try:
        cursor = mysql.get_db().cursor()
        cursor.execute("SELECT * FROM Customers")
        customers = cursor.fetchall()

        return jsonify(customers), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Update Customer
@app.route('/customer/<int:customer_id>', methods=['PUT'])
def update_customer(customer_id):
    try:
        name = request.json['name']
        dob = request.json['dob']
        age = request.json['age']
        address = request.json['address']
        phone_number = request.json['phone_number']
        email = request.json['email']

        cursor = mysql.get_db().cursor()
        cursor.execute(
            "UPDATE Customers SET Name=%s, DOB=%s, Age=%s, Address=%s, PhoneNumber=%s, Email=%s WHERE Customers_ID=%s",
            (name, dob, age, address, phone_number, email, customer_id)
        )
        mysql.get_db().commit()

        return jsonify({"message": "Customer updated successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Delete Customer
@app.route('/customer/<int:customer_id>', methods=['DELETE'])
def delete_customer(customer_id):
    try:
        cursor = mysql.get_db().cursor()
        cursor.execute("DELETE FROM Customers WHERE Customers_ID=%s", (customer_id,))
        mysql.get_db().commit()

        return jsonify({"message": "Customer deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True)