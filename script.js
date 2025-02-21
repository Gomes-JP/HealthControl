// Adicionar alimento
formAlimento.addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const calorias = parseInt(document.getElementById('calorias').value);
    const proteinas = parseFloat(document.getElementById('proteinas').value);
    const carboidratos = parseFloat(document.getElementById('carboidratos').value);
    const gorduras = parseFloat(document.getElementById('gorduras').value);

    fetch('/adicionar_alimento', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, calorias, proteinas, carboidratos, gorduras })
    }).then(response => response.json())
      .then(data => {
          alert(data.message);
          formAlimento.reset();
      });
});

// Calcular calorias
formCalorias.addEventListener('submit', function(event) {
    event.preventDefault();

    const selectedOptions = Array.from(selectRefeicao.selectedOptions);
    const refeicao = selectedOptions.map(option => option.value);

    fetch('/calcular_calorias', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ refeicao })
    }).then(response => response.json())
      .then(data => {
          totalCalorias.textContent = `Total de calorias consumidas: ${data.total_calorias}`;
      });
});