from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware  # Esta importación faltaba
import sqlite3

app = FastAPI()

# Configuración CORS correcta
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Conexión a SQLite
def get_db():
    conn = sqlite3.connect('../src/database.db')
    # Verificar y actualizar estructura de la tabla
    conn.execute("PRAGMA table_info(empresas)")
    columns = [column[1] for column in conn.fetchall()]
    if 'password' not in columns:
        conn.execute("ALTER TABLE empresas ADD COLUMN password TEXT")
        conn.commit()
    return conn

@app.post("/registro-empresa")
async def registro_empresa(nombre: str, cuit: str, email: str, telefono: str, password: str):
    conn = get_db()
    try:
        conn.execute(
            "INSERT INTO empresas (nombre, cuit, email, telefono, password) VALUES (?, ?, ?, ?, ?)",
            (nombre, cuit, email, telefono, password)
        )
        conn.commit()
        return {"mensaje": "Empresa registrada exitosamente"}
    except sqlite3.Error as e:
        raise HTTPException(status_code=400, detail=str(e))
    finally:
        conn.close()


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)