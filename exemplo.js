// Função que implementa o algoritmo de Dijkstra
function dijkstra(grafo, origem) {
    let distancias = {};
    let visitados = new Set();
    let fila = [];

    // Inicializa as distâncias para infinito e a origem com 0
    for (let cidade in grafo) {
        distancias[cidade] = Infinity;
    }
    distancias[origem] = 0;
    fila.push([origem, 0]);

    while (fila.length > 0) {
        fila.sort((a, b) => a[1] - b[1]); // Ordena a fila pela menor distância
        let [cidadeAtual, distanciaAtual] = fila.shift(); // Pega a cidade com menor distância

        if (visitados.has(cidadeAtual)) continue; // Pula se já visitada

        visitados.add(cidadeAtual);

        // Verifica os vizinhos da cidade atual
        for (let vizinho in grafo[cidadeAtual]) {
            let peso = grafo[cidadeAtual][vizinho];
            let novaDistancia = distanciaAtual + peso;

            // Se a nova distância for menor, atualize
            if (novaDistancia < distancias[vizinho]) {
                distancias[vizinho] = novaDistancia;
                fila.push([vizinho, novaDistancia]);
            }
        }
    }

    return distancias;
}

// Grafo representando as cidades e suas conexões
let grafo = {
    'A': { 'B': 4, 'C': 2 },
    'B': { 'A': 4, 'C': 1 },
    'C': { 'A': 2, 'B': 1 }
};

// Função para exibir os resultados na página
function exibirResultados(distancias) {
    let resultDiv = document.getElementById('result');
    resultDiv.innerHTML = ''; // Limpa resultados anteriores

    for (let cidade in distancias) {
        let p = document.createElement('p');
        p.textContent = `Distância de A até ${cidade}: ${distancias[cidade]}`;
        resultDiv.appendChild(p);
    }
}

// Função que será chamada quando o botão for clicado
document.getElementById('calculateBtn').addEventListener('click', function () {
    let distancias = dijkstra(grafo, 'A'); // Calcula as distâncias da cidade A
    exibirResultados(distancias); // Exibe os resultados
});
