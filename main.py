import sqlite3


def criar_banco_de_dados():
    conn = sqlite3.connect('saude.db')
    c = conn.cursor()

    # Tabela de Alimentos
    c.execute('''CREATE TABLE IF NOT EXISTS alimentos
                 (id INTEGER PRIMARY KEY, nome TEXT, calorias INTEGER, proteinas REAL, carboidratos REAL, gorduras REAL)''')

    # Tabela de Dietas
    c.execute('''CREATE TABLE IF NOT EXISTS dietas
                 (id INTEGER PRIMARY KEY, nome TEXT, descricao TEXT)''')

    # Tabela de Exercícios
    c.execute('''CREATE TABLE IF NOT EXISTS exercicios
                 (id INTEGER PRIMARY KEY, nome TEXT, calorias_queimadas INTEGER)''')

    conn.commit()
    conn.close()



def adicionar_alimento(nome, calorias, proteinas, carboidratos, gorduras):
    conn = sqlite3.connect('saude.db')
    c = conn.cursor()
    c.execute("INSERT INTO alimentos (nome, calorias, proteinas, carboidratos, gorduras) VALUES (?, ?, ?, ?, ?)",
              (nome, calorias, proteinas, carboidratos, gorduras))
    conn.commit()
    conn.close()


def calcular_calorias(refeicao):
    conn = sqlite3.connect('saude.db')
    c = conn.cursor()
    total_calorias = 0
    for alimento in refeicao:
        c.execute("SELECT calorias FROM alimentos WHERE nome=?", (alimento,))
        resultado = c.fetchone()
        if resultado:
            total_calorias += resultado[0]
    conn.close()
    return total_calorias


def sugerir_dieta_e_exercicio(calorias_consumidas):
    conn = sqlite3.connect('saude.db')
    c = conn.cursor()

    # Sugerir dieta
    c.execute("SELECT nome, descricao FROM dietas ORDER BY RANDOM() LIMIT 1")
    dieta = c.fetchone()

    # Sugerir exercício
    c.execute("SELECT nome, calorias_queimadas FROM exercicios ORDER BY RANDOM() LIMIT 1")
    exercicio = c.fetchone()

    conn.close()

    return dieta, exercicio



criar_banco_de_dados()

# Exemplo de uso
refeicao = ['Maçã', 'Pão']
print(f"Total de calorias: {calcular_calorias(refeicao)}")

# Exemplo de uso
adicionar_alimento('Maçã', 52, 0.3, 14, 0.2)


# Exemplo de uso
dieta, exercicio = sugerir_dieta_e_exercicio(500)
print(f"Dieta sugerida: {dieta[0]} - {dieta[1]}")
print(f"Exercício sugerido: {exercicio[0]} - Queima {exercicio[1]} calorias")