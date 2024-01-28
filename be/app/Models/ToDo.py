from app import db

class ToDo(db.Model):
    __tablename__ = 'todo'  

    id   = db.Column(db.Integer, primary_key=True)    
    todo = db.Column(db.String(80), nullable=False) 
    completado   = db.Column(db.Boolean, nullable=False)   
    categoria_id = db.Column(db.Integer, db.ForeignKey('categoria.id'), nullable=False) 

    def toDict(self):
        return {
            "id"   : self.id,
            "todo" : self.todo,
            "completado" : self.completado,
            "categoria"  : self.categoria_id
        }

