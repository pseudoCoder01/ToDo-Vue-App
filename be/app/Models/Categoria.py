from app import db

class Categoria(db.Model):
    __tablename__ = 'categoria'

    id     = db.Column(db.Integer, primary_key=True)
    color  = db.Column(db.String(7), nullable=False)
    nombre = db.Column(db.String(24), nullable=False)  
    
    todo = db.relationship('ToDo', backref='categoria', lazy=True)