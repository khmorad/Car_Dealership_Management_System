from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
import os
from dotenv import load_dotenv


app = Flask(__name__)

app.config['MYSQL_HOST'] = os.getenv("host")
app.config['MYSQL_USER'] = os.getenv("user")
app.config['MYSQL_PASSWORD'] = os.getenv("password")
app.config['MYSQL_DB'] = os.getenv("dbName")
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
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
# GET method for all cars
@app.route('/cars', methods=['GET'])
def get_all_car():
    try:
        cursor = mysql.connection.cursor()
        # Query database for employees
        cursor.execute("SELECT * FROM Cars")
        employees = cursor.fetchall()
        # Return employees as JSON
        cursor.close()
        return jsonify(employees), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# GET method for a single car using car_id
@app.route('/cars/<string:car_id>', methods=['GET'])
def get_one_car(car_id):
    try:
        cursor = mysql.connection.cursor()
        # Query database for employees
        cursor.execute("SELECT * FROM Cars WHERE VIN=%s", (car_id,))
        data = cursor.fetchall()
        cursor.close()
        if not data:
            return jsonify({"Error": "Car ID is invalid"}), 404
        return jsonify(data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# CREATE method for a single car
@app.route('/cars', methods=['POST'])
def create_car():
    try:
        cursor = mysql.connection.cursor()
        request_data = request.get_json()
        # Query database for employees
        cursor.execute("SELECT * FROM Cars WHERE VIN=%(VIN)s", request_data)
        returned_data = cursor.fetchall()
        if returned_data:
            cursor.close()
            return jsonify({"Error": "Car ID is already existed"}), 404
        cursor.execute("INSERT INTO Cars (VIN, Year_of_manufacturing, Brand, Model, Trim, Mileage, Type, Exterior_color, Drivetrain, Gas_Type, MPG, Interior_color, Seats_no, Price, Customer_ID) VALUES (%(VIN)s, %(Year_of_manufacturing)s, %(Brand)s, %(Model)s, %(Trim)s, %(Mileage)s, %(Type)s, %(Exterior_color)s, %(Drivetrain)s, %(Gas_Type)s, %(MPG)s, %(Interior_color)s, %(Seats_no)s, %(Price)s, %(Customer_ID)s)", request_data)
        return jsonify({"Success": "Car is added"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# DELETE
@app.route('/cars', methods=['DELETE'])
def create_car():
    try:
        cursor = mysql.connection.cursor()
        request_data = request.get_json()
        # Query database for employees
        cursor.execute("SELECT * FROM Cars WHERE VIN=%(VIN)s", request_data)
        returned_data = cursor.fetchall()
        if returned_data:
            cursor.close()
            return jsonify({"Error": "Car ID is already existed"}), 404
        cursor.execute(
            "INSERT INTO Cars (VIN, Year_of_manufacturing, Brand, Model, Trim, Mileage, Type, Exterior_color, Drivetrain, Gas_Type, MPG, Interior_color, Seats_no, Price, Customer_ID) VALUES (%(VIN)s, %(Year_of_manufacturing)s, %(Brand)s, %(Model)s, %(Trim)s, %(Mileage)s, %(Type)s, %(Exterior_color)s, %(Drivetrain)s, %(Gas_Type)s, %(MPG)s, %(Interior_color)s, %(Seats_no)s, %(Price)s, %(Customer_ID)s)",
            request_data)
        return jsonify({"Success": "Car is added"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    #*****************************************************************************


    #************************YAR (transaction)************************************



    #*****************************************************************************




if __name__ == "__main__":
    app.run(debug=True)