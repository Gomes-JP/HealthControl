document.addEventListener('DOMContentLoaded', function() {
    const formAlimento = document.getElementById('form-alimento');
    const formCalorias = document.getElementById('form-calorias');
    const formGastoCalorico = document.getElementById('form-gasto-calorico');
    const btnSugerir = document.getElementById('btn-sugerir');
    const listaAlimentos = document.getElementById('lista-alimentos');
    const totalCalorias = document.getElementById('total-calorias');
    const sugestaoDiv = document.getElementById('sugestao');
    const objetivoSelect = document.getElementById('objetivo');
    const gastoCaloricoInput = document.getElementById('gasto-calorico');

    let alimentos = [];
    let gastoCaloricoMedio = 0;

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
        const alimentoItem = document.createElement('div');
        alimentoItem.className = 'alimento-item';

        const label = document.createElement('label');
        label.textContent = `${nome} (${calorias} kcal)`;

        const inputQuantidade = document.createElement('input');
        inputQuantidade.type = 'number';
        inputQuantidade.min = '0';
        inputQuantidade.value = '1';

        alimentoItem.appendChild(label);
        alimentoItem.appendChild(inputQuantidade);
        listaAlimentos.appendChild(alimentoItem);

        // Limpar o formulário
        formAlimento.reset();
    });

    // Calcular calorias
    formCalorias.addEventListener('submit', function(event) {
        event.preventDefault();

        const alimentoItems = document.querySelectorAll('.alimento-item');
        let total = 0;

        alimentoItems.forEach(item => {
            const nome = item.querySelector('label').textContent.split(' ')[0];
            const quantidade = parseInt(item.querySelector('input').value);
            const alimento = alimentos.find(a => a.nome === nome);
            if (alimento) {
                total += alimento.calorias * quantidade;
            }
        });

        totalCalorias.textContent = `Total de calorias consumidas: ${total}`;
    });

    // Salvar gasto calórico médio
    formGastoCalorico.addEventListener('submit', function(event) {
        event.preventDefault();
        gastoCaloricoMedio = parseInt(gastoCaloricoInput.value);
        alert(`Gasto calórico médio salvo: ${gastoCaloricoMedio} kcal/dia`);
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

        // Ajustar a sugestão com base nas calorias consumidas e no gasto calórico
        let mensagemCalorias = '';
        const balancoCalorico = totalCaloriasConsumidas - gastoCaloricoMedio;

        if (objetivo === 'perda_peso' && balancoCalorico > 0) {
            mensagemCalorias = `<p>Você está consumindo ${balancoCalorico} calorias a mais do que gasta. Considere reduzir o consumo para atingir seu objetivo de perda de peso.</p>`;
        } else if (objetivo === 'ganho_massa' && balancoCalorico < 500) {
            mensagemCalorias = `<p>Você está consumindo ${balancoCalorico} calorias a menos do que precisa. Considere aumentar o consumo para atingir seu objetivo de ganho de massa.</p>`;
        } else if (objetivo === 'manutencao' && Math.abs(balancoCalorico) > 200) {
            mensagemCalorias = `<p>Você está consumindo ${balancoCalorico} calorias fora da faixa ideal. Tente ajustar o consumo para manter o equilíbrio calórico.</p>`;
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

// Função para alternar entre abas
function abrirAba(event, nomeAba) {
    const abasConteudo = document.querySelectorAll('.aba-conteudo');
    abasConteudo.forEach(aba => aba.style.display = 'none');

    const abaLinks = document.querySelectorAll('.aba-link');
    abaLinks.forEach(link => link.classList.remove('ativa'));

    document.getElementById(nomeAba).style.display = 'block';
    event.currentTarget.classList.add('ativa');
}