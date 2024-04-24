from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from datetime import datetime
import os
from dotenv import load_dotenv
app = Flask(__name__)


# MySQL configuration
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '021888274047Mm!'
app.config['MYSQL_DB'] = 'CarManagement'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'


#app.config['MYSQL_HOST'] = os.getenv("host")
#app.config['MYSQL_USER'] = os.getenv("user")
#app.config['MYSQL_PASSWORD'] = os.getenv("password")
#app.config['MYSQL_DB'] = os.getenv("dbName")
#app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

# Initialize MySQL
mysql = MySQL(app)


#************************Rio Taiga(Employee, Customer table)***********************************

#*****************************************************************************
    
#************************Eddie (Car, Car_part table)**************************
#*****************************************************************************


#************************YAR (transaction)************************************

#create
@app.route("/transactions", methods=["POST"])
def add_transaction():
    try:
        data = request.json
        if not data or 'Transaction_ID' not in data or 'Part_ID' not in data or 'VIN' not in data or 'Date' not in data or 'Price' not in data or 'Employee_ID' not in data:
            return jsonify({'error': 'Missing required fields in request'}), 400
        
        id = data['Transaction_ID']
        part_id = data['Part_ID']
        vin = data['VIN']
        
        # Extract and format the date
        date_str = data['Date']
        date = datetime.strptime(date_str, '%a, %d %b %Y %H:%M:%S %Z').strftime('%Y-%m-%d')

        price = data['Price']
        employee_id = data['Employee_ID']

        cursor = mysql.connection.cursor()
        cursor.execute("INSERT INTO transactions (Transaction_ID, Part_ID, VIN, Date, Price, Employee_ID) VALUES (%s, %s, %s, %s, %s, %s)", (id, part_id, vin, date, price, employee_id))
        mysql.connection.commit()

        return jsonify({'message': 'Transaction created successfully'}), 201
    except KeyError as e:
        return jsonify({'error': f'Missing key in request: {e}'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        cursor.close()    
#read
@app.route("/transactions", methods=['GET'])
def get_transactions():
    try:
        cursor = mysql.connection.cursor()
        cursor.execute('SELECT * from transactions;')
        transactions = cursor.fetchall()
        cursor.close()
        return jsonify(transactions), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
    
@app.route("/transactions/<int:Transaction_ID>", methods = ['GET'])
def get_single_transactions(Transaction_ID):
    cursor = mysql.connection.cursor()
    try:
        cursor.execute('SELECT * FROM transactions WHERE Transaction_ID = %s ', [Transaction_ID])
        transaction = cursor.fetchone()
        if transaction:
           return jsonify(transaction), 200
        else:
            return jsonify({'error': 'Transaction not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)})


@app.route("/transactions/<int:Transaction_ID>", methods=['PUT'])
def update_transaction(Transaction_ID):
  cursor = mysql.connection.cursor()
  try:
    # Get existing transaction data (optional)
    cursor.execute("SELECT * FROM Transactions WHERE Transaction_ID = %s", [Transaction_ID])
    existing_transaction = cursor.fetchone()

    if not existing_transaction:
      return jsonify({'error': 'Transaction not found'}), 404

    # Extract and validate update data from request
    data = request.get_json()
    if not data:
      return jsonify({'error': 'Missing update data in request'}), 400

    # Prepare update parameters with potential sanitization (consider libraries like SQLAlchemy)
    update_data = {}
    if 'Part_ID' in data:
      update_data['Part_ID'] = data['Part_ID']  # Sanitize if needed
    if 'VIN' in data:
      update_data['VIN'] = data['VIN']  # Sanitize if needed
    if 'Date' in data:
      # Consider using datetime parsing and formatting for consistency
      update_data['Date'] = data['Date']
    if 'Price' in data:
      update_data['Price'] = data['Price']
    if 'Employee_ID' in data:
      update_data['Employee_ID'] = data['Employee_ID']  # Sanitize if needed

    # Construct UPDATE statement with parameterization to prevent SQL injection
    set_clause = ", ".join([f"{key} = %s" for key in update_data.keys()])
    update_query = f"UPDATE Transactions SET {set_clause} WHERE Transaction_ID = %s"
    update_params = list(update_data.values()) + [Transaction_ID]

    cursor.execute(update_query, update_params)

    # Check if rows were updated (optional)
    if cursor.rowcount == 0:
      return jsonify({'message': 'No changes made to transaction'}), 200  # Or a more specific message

    mysql.connection.commit()
    return jsonify({'message': 'Transaction updated successfully'}), 200

  except Exception as e:
    mysql.connection.rollback()
    return jsonify({'error': str(e)}), 500

  finally:
    cursor.close()





@app.route("/transactions/<int:Transaction_ID>", methods=['DELETE'])
def delete_transactions(Transaction_ID):
  cursor = mysql.connection.cursor()
  try:
    #used inner join to gather all the 
    cursor.execute("""
      DELETE t
      FROM Transactions t
      INNER JOIN Cars c ON t.VIN = c.VIN
      INNER JOIN Car_part cp ON t.Part_ID = cp.Part_ID
      INNER JOIN Employees e ON t.Employee_ID = e.Employee_ID
      WHERE t.Transaction_ID = %s
    """, [Transaction_ID])

    # check if rows were deleted (optional)
    if cursor.rowcount == 0:
      return jsonify({'error': 'Transaction not found'}), 404

    mysql.connection.commit()
    return jsonify({'message': 'Transaction deleted successfully'}), 200

  except Exception as e:
    mysql.connection.rollback()
    return jsonify({'error': str(e)}), 500

  finally:
    cursor.close()


    #*****************************************************************************




if __name__ == "__main__":
    app.run(debug=True)