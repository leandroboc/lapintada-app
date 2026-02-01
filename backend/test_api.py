import requests
import json
import sys

print("--- INICIO DEL SCRIPT DE PRUEBA ---", flush=True)

url = "http://127.0.0.1:8000/chat"
payload = {"question": "¿De qué color es el cielo?"}
headers = {"Content-Type": "application/json"}

try:
    response = requests.post(url, data=json.dumps(payload), headers=headers)
    response.raise_for_status()
    
    try:
        print(response.json(), flush=True)
    except json.JSONDecodeError:
        print("La respuesta no es un JSON válido:", flush=True)
        print(response.text, flush=True)

except requests.exceptions.RequestException as e:
    print(f"Ocurrió un error en la petición: {e}", flush=True)

sys.stdout.flush()
