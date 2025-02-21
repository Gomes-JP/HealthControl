document.addEventListener('DOMContentLoaded', function() {
    const formAlimento = document.getElementById('form-alimento');
    const formCalorias = document.getElementById('form-calorias');
    const btnSugerir = document.getElementById('btn-sugerir');
    const listaAlimentos = document.getElementById('lista-alimentos');
    const totalCalorias = document.getElementById('total-calorias');
    const sugestaoDiv = document.getElementById('sugestao');
    const objetivoSelect = document.getElementById('objetivo');

    let alimentos = [];

    // Adicionar alimento
    formAlimento.addEventListener('submit', function(event) {
        event.preventDefault();

        const nome = document.getElementById('nome').value;
        const calorias = parseInt(document.getElementById('calorias').value);
        const proteinas = parseFloat(document.getElementById('proteinas').value);
        const carboidratos = parseFloat(document.getElementById('carboidratos').value);
        const gorduras = parseFloat(document.getElementById('gorduras').value);

        alimentos.push({ nome, calorias, proteinas, carboidratos, gorduras });

        // Atualizar a lista de alimentos
        const label = document.createElement('label');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = 'alimento';
        checkbox.value = nome;
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(`${nome} (${calorias} kcal)`));
        listaAlimentos.appendChild(label);

        // Limpar o formulário
        formAlimento.reset();
    });

    // Calcular calorias
    formCalorias.addEventListener('submit', function(event) {
        event.preventDefault();

        const selectedCheckboxes = document.querySelectorAll('#lista-alimentos input[type="checkbox"]:checked');
        const total = Array.from(selectedCheckboxes).reduce((sum, checkbox) => {
            const alimento = alimentos.find(a => a.nome === checkbox.value);
            return sum + (alimento ? alimento.calorias : 0);
        }, 0);

        totalCalorias.textContent = `Total de calorias consumidas: ${total}`;
    });

    // Sugerir dieta e exercício
    btnSugerir.addEventListener('click', function() {
        const objetivo = objetivoSelect.value;
        const totalCaloriasConsumidas = parseInt(totalCalorias.textContent.split(': ')[1]) || 0;

        const dietas = {
            perda_peso: [
                { nome: "Dieta Low Carb", descricao: "Reduza a ingestão de carboidratos e aumente a ingestão de proteínas." },
                { nome: "Dieta Mediterrânea", descricao: "Baseada em frutas, vegetais, grãos integrais e azeite de oliva." }
            ],
            ganho_massa: [
                { nome: "Dieta Hipercalórica", descricao: "Aumente a ingestão de calorias e proteínas para ganho de massa muscular." },
                { nome: "Dieta Rica em Proteínas", descricao: "Foco em alimentos ricos em proteínas para construção muscular." }
            ],
            manutencao: [
                { nome: "Dieta Balanceada", descricao: "Mantenha uma dieta equilibrada com carboidratos, proteínas e gorduras." },
                { nome: "Dieta Flexível", descricao: "Dieta que permite flexibilidade na escolha dos alimentos, mantendo o equilíbrio calórico." }
            ]
        };

        const exercicios = {
            perda_peso: [
                { nome: "Corrida", calorias_queimadas: 600 },
                { nome: "HIIT", calorias_queimadas: 500 }
            ],
            ganho_massa: [
                { nome: "Levantamento de Peso", calorias_queimadas: 300 },
                { nome: "CrossFit", calorias_queimadas: 400 }
            ],
            manutencao: [
                { nome: "Yoga", calorias_queimadas: 200 },
                { nome: "Caminhada", calorias_queimadas: 250 }
            ]
        };

        // Escolher dieta e exercício com base no objetivo e nas calorias consumidas
        const dietaSugerida = dietas[objetivo][Math.floor(Math.random() * dietas[objetivo].length)];
        const exercicioSugerido = exercicios[objetivo][Math.floor(Math.random() * exercicios[objetivo].length)];

        // Ajustar a sugestão com base nas calorias consumidas
        let mensagemCalorias = '';
        if (objetivo === 'perda_peso' && totalCaloriasConsumidas > 2000) {
            mensagemCalorias = `<p>Você consumiu ${totalCaloriasConsumidas} calorias. Considere reduzir o consumo para atingir seu objetivo de perda de peso.</p>`;
        } else if (objetivo === 'ganho_massa' && totalCaloriasConsumidas < 2500) {
            mensagemCalorias = `<p>Você consumiu ${totalCaloriasConsumidas} calorias. Considere aumentar o consumo para atingir seu objetivo de ganho de massa.</p>`;
        } else if (objetivo === 'manutencao' && (totalCaloriasConsumidas < 1800 || totalCaloriasConsumidas > 2200)) {
            mensagemCalorias = `<p>Você consumiu ${totalCaloriasConsumidas} calorias. Tente manter o consumo entre 1800 e 2200 calorias para manutenção.</p>`;
        }

        sugestaoDiv.innerHTML = `
            <h3>Dieta Sugerida:</h3>
            <p><strong>${dietaSugerida.nome}</strong> - ${dietaSugerida.descricao}</p>
            <h3>Exercício Sugerido:</h3>
            <p><strong>${exercicioSugerido.nome}</strong> - Queima ${exercicioSugerido.calorias_queimadas} calorias</p>
            ${mensagemCalorias}
        `;
    });
});