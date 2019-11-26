from flask import Flask, render_template, request
import json

app = Flask(__name__)


@app.route("/")
def gethtml():
    return render_template('index.html')

@app.route("/highscores")
def gethtml1():
    return render_template('highscores.html')

@app.route("/addScore", methods=['POST'])
def addscore():
    data = request.get_json()
    print("DATA: ", data)

    with open('scores.json', 'r') as file:
        scores = json.load(file)

    scores['scores'].append(data)

    with open('scores.json', 'w') as file:
        file.write(json.dumps(scores))

    return "ok", 201

@app.route("/getScores")
def gets():
    with open('scores.json', 'r') as file:
        scores = json.load(file)

    return json.dumps(scores)