from flask import Flask, jsonify

app = Flask(__name__)


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "healthy", "service": "python-api"})


@app.route("/api/data", methods=["GET"])
def get_data():
    return jsonify(
        {
            "message": "Hello from the Python API!",
            "items": [
                {"id": 1, "name": "Widget Alpha"},
                {"id": 2, "name": "Widget Beta"},
                {"id": 3, "name": "Widget Gamma"},
            ],
        }
    )


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
