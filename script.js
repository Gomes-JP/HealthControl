document.addEventListener('DOMContentLoaded', function() {
    const formAlimento = document.getElementById('form-alimento');
    const formCalorias = document.getElementById('form-calorias');
    const btnSugerir = document.getElementById('btn-sugerir');
    const selectRefeicao = document.getElementById('refeicao');
    const totalCalorias = document.getElementById('total-calorias');
    const sugestaoDiv = document.getElementById('sugestao');

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

        // Atualizar a lista de alimentos no select
        const option = document.createElement('option');
        option.value = nome;
        option.textContent = nome;
        selectRefeicao.appendChild(option);

        // Limpar o formulário
        formAlimento.reset();
    });

    // Calcular calorias
    formCalorias.addEventListener('submit', function(event) {
        event.preventDefault();

        const selectedOptions = Array.from(selectRefeicao.selectedOptions);
        const total = selectedOptions.reduce((sum, option) => {
            const alimento = alimentos.find(a => a.nome === option.value);
            return sum + (alimento ? alimento.calorias : 0);
        }, 0);

        totalCalorias.textContent = `Total de calorias consumidas: ${total}`;
    });

    // Sugerir dieta e exercício
    btnSugerir.addEventListener('click', function() {
        const dietas = [
            { nome: "Dieta Low Carb", descricao: "Reduza a ingestão de carboidratos e aumente a ingestão de proteínas." },
            { nome: "Dieta Mediterrânea", descricao: "Baseada em frutas, vegetais, grãos integrais e azeite de oliva." }
        ];

        const exercicios = [
            { nome: "Corrida", calorias_queimadas: 600 },
            { nome: "Yoga", calorias_queimadas: 200 }
        ];

        const dietaSugerida = dietas[Math.floor(Math.random() * dietas.length)];
        const exercicioSugerido = exercicios[Math.floor(Math.random() * exercicios.length)];

        sugestaoDiv.innerHTML = `
            <h3>Dieta Sugerida:</h3>
            <p><strong>${dietaSugerida.nome}</strong> - ${dietaSugerida.descricao}</p>
            <h3>Exercício Sugerido:</h3>
            <p><strong>${exercicioSugerido.nome}</strong> - Queima ${exercicioSugerido.calorias_queimadas} calorias</p>
        `;
    });
});