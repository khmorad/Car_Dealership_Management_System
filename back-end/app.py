from flask import Flask
from flaskext.mysql import MySQL

app = Flask(__name__)

# MySQL configuration
app.config['MYSQL_DATABASE_USER'] = 'cs157'
app.config['MYSQL_DATABASE_PASSWORD'] = 'Xzu88xF2{t~V9o\m'
app.config['MYSQL_DATABASE_DB'] = 'your_database_name'
app.config['MYSQL_DATABASE_HOST'] = '34.83.200.253'

mysql = MySQL(app)

# Import your routes
import routes