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

    let alimentos = JSON.parse(localStorage.getItem('alimentos')) || [];
    let gastoCaloricoMedio = parseInt(localStorage.getItem('gastoCaloricoMedio')) || 0;
    let dados = { dietas: {}, exercicios: {} };

    // Carregar dados de dietas e exercícios do arquivo JSON
    fetch('dados.json')
        .then(response => response.json())
        .then(data => {
            dados = data;
        })
        .catch(error => console.error('Erro ao carregar dados:', error));

    // Carregar alimentos salvos no localStorage
    function carregarAlimentos() {
        listaAlimentos.innerHTML = '';
        alimentos.forEach(alimento => {
            const alimentoItem = document.createElement('div');
            alimentoItem.className = 'alimento-item';

            const label = document.createElement('label');
            label.textContent = `${alimento.nome} (${alimento.calorias} kcal)`;

            const inputQuantidade = document.createElement('input');
            inputQuantidade.type = 'number';
            inputQuantidade.min = '0';
            inputQuantidade.value = '1';

            alimentoItem.appendChild(label);
            alimentoItem.appendChild(inputQuantidade);
            listaAlimentos.appendChild(alimentoItem);
        });
    }

    carregarAlimentos();

    // Adicionar alimento
    formAlimento.addEventListener('submit', function(event) {
        event.preventDefault();

        const nome = document.getElementById('nome').value;
        const calorias = parseInt(document.getElementById('calorias').value);
        const proteinas = parseFloat(document.getElementById('proteinas').value);
        const carboidratos = parseFloat(document.getElementById('carboidratos').value);
        const gorduras = parseFloat(document.getElementById('gorduras').value);

        alimentos.push({ nome, calorias, proteinas, carboidratos, gorduras });
        localStorage.setItem('alimentos', JSON.stringify(alimentos));

        carregarAlimentos();
        formAlimento.reset();
    });

    // Calcular calorias
    formCalorias.addEventListener('submit', function(event) {
        event.preventDefault();

        const alimentoItems = document.querySelectorAll('.alimento-item');
        let total = 0;

        alimentoItems.forEach((item, index) => {
            const quantidade = parseInt(item.querySelector('input').value);
            const alimento = alimentos[index];
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
        localStorage.setItem('gastoCaloricoMedio', gastoCaloricoMedio);
        alert(`Gasto calórico médio salvo: ${gastoCaloricoMedio} kcal/dia`);
    });

    // Sugerir dieta e exercício
    btnSugerir.addEventListener('click', function() {
        const objetivo = objetivoSelect.value;
        const totalCaloriasConsumidas = parseInt(totalCalorias.textContent.split(': ')[1]) || 0;

        const dietas = dados.dietas[objetivo];
        const exercicios = dados.exercicios[objetivo];

        if (!dietas || !exercicios) {
            sugestaoDiv.innerHTML = `<p>Nenhuma sugestão disponível para o objetivo selecionado.</p>`;
            return;
        }

        const dietaSugerida = dietas[Math.floor(Math.random() * dietas.length)];
        const exercicioSugerido = exercicios[Math.floor(Math.random() * exercicios.length)];

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