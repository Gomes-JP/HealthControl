from flask import Flask, jsonify, request

app = Flask(__name__)

alimentos = []

@app.route('/adicionar_alimento', methods=['POST'])
def adicionar_alimento():
    data = request.json
    alimentos.append(data)
    return jsonify({"message": "Alimento adicionado com sucesso!"}), 201

@app.route('/calcular_calorias', methods=['POST'])
def calcular_calorias():
    data = request.json
    total_calorias = sum(alimento['calorias'] for alimento in alimentos if alimento['nome'] in data['refeicao'])
    return jsonify({"total_calorias": total_calorias}), 200

if __name__ == '__main__':
    app.run(debug=True)