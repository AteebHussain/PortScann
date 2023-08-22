# backend/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from port_scanner import port_scanner

app = Flask(__name__)
CORS(app)  

@app.route('/scan_ports', methods=['POST'])
def scan_ports():
    data = request.get_json()
    target_host = data.get('target_host')
    start_port = int(data.get('start_port'))
    end_port = int(data.get('end_port')) + 1

    ports_range = (start_port, end_port)
    open_ports = port_scanner(target_host, ports_range)

    return jsonify({'open_ports': open_ports})

if __name__ == '__main__':
    app.run(debug=True)
