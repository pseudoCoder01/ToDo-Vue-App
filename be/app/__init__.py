import os
from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from app.config import DevConfig

# Cargar .env
APP_ROOT = os.path.join(os.path.dirname(__file__), "..")
dotenv_path = os.path.join(APP_ROOT, ".env")
load_dotenv(dotenv_path)

# flask
app = Flask(__name__)
app.config.from_object(DevConfig)
app.config["SECURITY_TRACKABLE"] = True
app.config["SECRET_KEY"] = os.getenv("SKEY")

# flask_cors
CORS(app)

# flask_sqlalchemy
db = SQLAlchemy(app)
# flask_migrate
migrate = Migrate(app, db)

from app.routes import *