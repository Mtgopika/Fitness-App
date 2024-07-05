from flask import Flask, request, jsonify
import subprocess
from flask_cors import CORS 

app = Flask(__name__)
CORS(app)

# Global variable to store the process
running_process = None
backend_path = "C:\\Users\\HP\\OneDrive\\Desktop\\my-project\\my-project\\my-project\\src\\Components\\Backend\\VENV"


def start_process(script_path):
    global running_process
    if running_process and running_process.poll() is None:
        return jsonify({'message': 'Process already running.'}), 400

    try:
        # Start the process
        running_process = subprocess.Popen(['C:/Users/HP/anaconda3/python.exe', script_path])
        return jsonify({'message': 'Process started successfully.'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def stop_process():
    global running_process
    if running_process and running_process.poll() is None:
        try:
            # Terminate the process
            running_process.terminate()
            running_process = None
            return jsonify({'message': 'Process stopped successfully.'}), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    else:
        return jsonify({'message': 'No running process to stop.'}), 400

@app.route('/pushup', methods=['GET'])
def start_pushup_process():
    return start_process(backend_path + '\\Pushup.py')

@app.route('/stop_pushup', methods=['GET'])
def stop_pushup_process():
    return stop_process()

@app.route('/Curls', methods=['GET'])
def start_Curls_process():
    return start_process(backend_path + '\\Curls.py')

@app.route('/stop_Curls', methods=['GET'])
def stop_Curls_process():
    return stop_process()

@app.route('/Legcurl', methods=['GET'])
def start_Legcurls_process():
    return start_process(backend_path + '\\Legcurl.py')

@app.route('/stop_Legcurl', methods=['GET'])
def stop_Legcurls_process():
    return stop_process()

@app.route('/Legraises', methods=['GET'])
def start_Legraises_process():
    return start_process(backend_path + '\\Legraises.py')

@app.route('/stop_Legraises', methods=['GET'])
def stop_Legraises_process():
    return stop_process()

@app.route('/Lunges', methods=['GET'])
def start_Lunges_process():
    return start_process(backend_path + '\\Lunges.py')

@app.route('/stop_Lunges', methods=['GET'])
def stop_Lunges_process():
    return stop_process()

@app.route('/Plank', methods=['GET'])
def start_Plank_process():
    return start_process(backend_path + '\\Plank.py')

@app.route('/stop_Plank', methods=['GET'])
def stop_Plank_process():
    return stop_process()

@app.route('/Pullups', methods=['GET'])
def start_Pullups_process():
    return start_process(backend_path + '\\Pullups.py')

@app.route('/stop_Pullups', methods=['GET'])
def stop_Pullups_process():
    return stop_process()

@app.route('/Squat', methods=['GET'])
def start_Squat_process():
    return start_process(backend_path + '\\Squat.py')

@app.route('/stop_Squat', methods=['GET'])
def stop_Squat_process():
    return stop_process()

@app.route('/CobraStretch', methods=['GET'])
def start_CobraStretch_process():
    return start_process(backend_path + '\\CobraStretch.py')

@app.route('/stop_CobraStretch', methods=['GET'])
def stop_CobraStretch_process():
    return stop_process()

@app.route('/Benchpress', methods=['GET'])
def start_Benchpress_process():
    return start_process(backend_path + '\\Benchpress.py')

@app.route('/stop_Benchpress', methods=['GET'])
def stop_Benchpress_process():
    return stop_process()

@app.route('/Abdo', methods=['GET'])
def start_Abdo_process():
    return start_process(backend_path + '\\Abdo.py')

@app.route('/stop_Abdo', methods=['GET'])
def stop_Abdo_process():
    return stop_process()

if __name__ == '__main__':
    app.run(debug=True, port=8081)
