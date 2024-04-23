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
        cursor = mysql.get_db().cursor()
        # Extract data from request
        data = request.get_json()
        name = data['name']
        dob = data['dob']
        department = data['department']
        job_title = data['job_title']
        report_to = data.get('report_to')  # Optional field
        # Insert data into database
        cursor.execute("INSERT INTO Employees (Name, DOB, Department, jobTitle, reportTo) VALUES (%s, %s, %s, %s, %s)",
                       (name, dob, department, job_title, report_to))
        mysql.get_db().commit()
        return jsonify({"message": "Employee created successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Read all Employees
@app.route('/employee', methods=['GET'])
def get_employees():
    try:
        cursor = mysql.get_db().cursor()
        # Query database for employees
        cursor.execute("SELECT * FROM Employees")
        employees = cursor.fetchall()
        # Return employees as JSON
        return jsonify([{"EmployeeID": emp[0], "Name": emp[1], "DOB": emp[2], "Department": emp[3], "jobTitle": emp[4], "reportTo": emp[5]} for emp in employees]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Update Employee
@app.route('/employee/<int:employee_id>', methods=['PUT'])
def update_employee(employee_id):
    try:
        cursor = mysql.get_db().cursor()
        # Extract data from request
        data = request.get_json()
        name = data['name']
        dob = data['dob']
        department = data['department']
        job_title = data['job_title']
        report_to = data.get('report_to')  # Optional field
        # Update employee in database
        cursor.execute("UPDATE Employees SET Name=%s, DOB=%s, Department=%s, jobTitle=%s, reportTo=%s WHERE EmployeeID=%s",
                       (name, dob, department, job_title, report_to, employee_id))
        mysql.get_db().commit()
        return jsonify({"message": "Employee updated successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Delete Employee
def delete_employee(employee_id):
    try:
        cursor = mysql.get_db().cursor()
        # Delete employee from database
        cursor.execute("DELETE FROM Employees WHERE EmployeeID=%s", (employee_id,))
        mysql.get_db().commit()
        return jsonify({"message": "Employee deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Create Customer
@app.route('/customer', methods=['POST'])
def create_customer():
    try:
        cursor = mysql.get_db().cursor()
        # Extract data from request
        data = request.get_json()
        name = data['name']
        dob = data['dob']
        address = data['address']
        phone_number = data['phone_number']
        email = data['email']
        employee_id = data['employee_id']
        # Insert data into database
        cursor.execute("INSERT INTO Customers (Name, DOB, Address, PhoneNumber, Email, EmployeeID) VALUES (%s, %s, %s, %s, %s, %s)",
                       (name, dob, address, phone_number, email, employee_id))
        mysql.get_db().commit()
        return jsonify({"message": "Customer created successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Read all Customers
@app.route('/customer', methods=['GET'])
def get_customers():
    try:
        cursor = mysql.get_db().cursor()
        # Query database for customers
        cursor.execute("SELECT * FROM Customers")
        customers = cursor.fetchall()
        # Return customers as JSON
        return jsonify([{"CustomerID": cust[0], "Name": cust[1], "DOB": cust[2], "Address": cust[3], "PhoneNumber": cust[4], "Email": cust[5], "EmployeeID": cust[6]} for cust in customers]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    
# Update Customer
@app.route('/customer/<int:customer_id>', methods=['PUT'])
def update_customer(customer_id):
    try:
        cursor = mysql.get_db().cursor()
        # Extract data from request
        data = request.get_json()
        name = data['name']
        dob = data['dob']
        address = data['address']
        phone_number = data['phone_number']
        email = data['email']
        employee_id = data['employee_id']
        # Update customer in database
        cursor.execute("UPDATE Customers SET Name=%s, DOB=%s, Address=%s, PhoneNumber=%s, Email=%s, EmployeeID=%s WHERE CustomerID=%s",
                       (name, dob, address, phone_number, email, employee_id, customer_id))
        mysql.get_db().commit()
        return jsonify({"message": "Customer updated successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Delete Customer
@app.route('/customer/<int:customer_id>', methods=['DELETE'])
def delete_customer(customer_id):
    try:
        cursor = mysql.get_db().cursor()
        # Delete customer from database
        cursor.execute("DELETE FROM Customers WHERE CustomerID=%s", (customer_id,))
        mysql.get_db().commit()
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