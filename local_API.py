from flask import Flask, jsonify, request

app = Flask(__name__)

# Sample data
faculty = [
    {"id": 1, "name": "Rajesh", "dept": "Mechanical"},
    {"id": 2, "name": "Himanshu", "dept": "ECE"}
]

# ---------- GET ----------
@app.route('/faculty', methods=['GET'])
def get_faculty():
    return jsonify(faculty)


# ---------- POST ----------
@app.route('/faculty', methods=['POST'])
def add_faculty():

    data = request.json

    if "name" not in data or "dept" not in data:
        return jsonify({"message": "Name and Dept required"}), 400

    new_data = {
        "id": len(faculty) + 1,
        "name": data["name"],
        "dept": data["dept"]
    }

    faculty.append(new_data)

    return jsonify(new_data), 201


# ---------- PUT (Full Update) ----------
@app.route('/faculty/<int:id>', methods=['PUT'])
def put_faculty(id):

    data = request.json

    # PUT requires complete object
    if "name" not in data or "dept" not in data:
        return jsonify({"message": "Both name and dept required"}), 400

    for f in faculty:

        if f["id"] == id:

            f["name"] = data["name"]
            f["dept"] = data["dept"]

            return jsonify(f)

    return jsonify({"message": "Not found"}), 404


# ---------- PATCH (Partial Update) ----------
@app.route('/faculty/<int:id>', methods=['PATCH'])
def patch_faculty(id):

    data = request.json

    for f in faculty:

        if f["id"] == id:

            if "name" in data:
                f["name"] = data["name"]

            if "dept" in data:
                f["dept"] = data["dept"]

            return jsonify(f)

    return jsonify({"message": "Not found"}), 404


# ---------- DELETE ----------
@app.route('/faculty/<int:id>', methods=['DELETE'])
def delete_faculty(id):

    global faculty

    for f in faculty:

        if f["id"] == id:

            faculty.remove(f)

            return jsonify({"message": "Deleted successfully"})

    return jsonify({"message": "Not found"}), 404


# ---------- Run Server ----------
if __name__ == '__main__':
    app.run(debug=True,use_reloader=False)
