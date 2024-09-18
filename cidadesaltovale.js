const graph = {
    'Ituporanga': { 'Aurora': 26, 'Atalanta': 33, 'Petrolandia': 18, 'Chapadao do Lageado': 26, 'Imbuia': 50, 'Vidal Ramos': 62 },
    'Aurora': { 'Rio do Sul': 26, 'Ituporanga': 26, 'Atalanta': 59.4 },
    'Rio do Sul': { 'Aurora': 26, 'Lontras': 39, 'Ibirama': 81, 'Laurentino': 39, 'Trombudo Central': 63 },
    'Agronomica': { 'Trombudo Central': 54, 'Presidente Getulio': 108 },
    'Trombudo Central': { 'Atalanta': 138.6, 'Rio do Sul': 63, 'Laurentino': 57, 'Agronomica': 54, 'Agrolandia': 21 },
    'Agrolandia': { 'Trombudo Central': 21 },
    'Atalanta': { 'Ituporanga': 33, 'Aurora': 59.4, 'Trombudo Central': 138.6 },
    'Petrolandia': { 'Ituporanga': 18, 'Chapadao do Lageado': 50.6 },
    'Chapadao do Lageado': { 'Ituporanga': 26, 'Petrolandia': 50.6, 'Imbuia': 25 },
    'Imbuia': { 'Ituporanga': 50, 'Chapadao do Lageado': 25 },
    'Vidal Ramos': { 'Ituporanga': 62, 'Ibirama': 299.2 },
    'Lontras': { 'Rio do Sul': 39, 'Ibirama': 51, 'Presidente Getulio': 58 },
    'Ibirama': { 'Rio do Sul': 81, 'Vidal Ramos': 299.2, 'Lontras': 51, 'Presidente Getulio': 36 },
    'Presidente Getulio': { 'Agronomica': 108, 'Lontras': 58, 'Ibirama': 36, 'Laurentino': 114 },
    'Laurentino': { 'Rio do Sul': 39, 'Trombudo Central': 57, 'Presidente Getulio': 114 }
};

function dijkstra(graph, start, end) {
    const distances = {};
    const visited = {};
    const previous = {};
    const queue = [];

    // Inicializando as distâncias
    for (let city in graph) {
        distances[city] = Infinity;
        previous[city] = null;
        visited[city] = false;
    }

    distances[start] = 0;
    queue.push([start, 0]);

    while (queue.length > 0) {
        queue.sort((a, b) => a[1] - b[1]);
        const [currentCity] = queue.shift();

        if (currentCity === end) break;

        if (!visited[currentCity]) {
            visited[currentCity] = true;

            for (let neighbor in graph[currentCity]) {
                let distance = distances[currentCity] + graph[currentCity][neighbor];

                if (distance < distances[neighbor]) {
                    distances[neighbor] = distance;
                    previous[neighbor] = currentCity;
                    queue.push([neighbor, distance]);
                }
            }
        }
    }

    const path = [];
    let current = end;
    while (current !== null) {
        path.unshift(current);
        current = previous[current];
    }

    return { path, distance: distances[end] };
}

document.getElementById('calculateBtn').addEventListener('click', function () {
    const startCity = document.getElementById('startCity').value;
    const endCity = document.getElementById('endCity').value;

    const result = dijkstra(graph, startCity, endCity);

    const output = document.getElementById('output');
    if (result.distance === Infinity) {
        output.textContent = `Não há caminho entre ${startCity} e ${endCity}.`;
    } else {
        output.innerHTML = `
            <strong>Caminho percorrido:</strong> ${result.path.join(' -> ')}<br>
            <strong>Custo total:</strong> ${result.distance} unidades.
        `;
    }
});

const cityCoordinates = {
    'Ituporanga': { x: 100, y: 300 },
    'Aurora': { x: 200, y: 250 },
    'Rio do Sul': { x: 300, y: 200 },
    'Agronomica': { x: 400, y: 150 },
    'Trombudo Central': { x: 500, y: 250 },
    'Agrolandia': { x: 600, y: 350 },
    'Atalanta': { x: 150, y: 350 },
    'Petrolandia': { x: 100, y: 150 },
    'Chapadao do Lageado': { x: 50, y: 100 },
    'Imbuia': { x: 150, y: 100 },
    'Vidal Ramos': { x: 250, y: 50 },
    'Lontras': { x: 350, y: 100 },
    'Ibirama': { x: 450, y: 50 },
    'Presidente Getulio': { x: 550, y: 150 },
    'Laurentino': { x: 500, y: 200 }
};

// Função para desenhar o caminho no canvas
function drawPathOnCanvas(path) {
    const canvas = document.getElementById('pathCanvas');
    const ctx = canvas.getContext('2d');

    // Limpa o canvas antes de desenhar um novo caminho
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'black';
    ctx.font = '16px Arial';

    // Desenha as cidades como círculos e seus nomes
    path.forEach((city, index) => {
        const { x, y } = cityCoordinates[city];
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, 2 * Math.PI);  // Desenha um círculo para cada cidade
        ctx.fillStyle = '#e21919';  // Cidades em vermelho
        ctx.fill();
        ctx.fillStyle = 'black';  // Texto em preto
        ctx.fillText(city, x - 30, y - 15);  // Nome da cidade ao lado do círculo
        ctx.closePath();

        // Desenha a linha de conexão entre as cidades
        if (index > 0) {
            const prevCity = cityCoordinates[path[index - 1]];
            ctx.beginPath();
            ctx.moveTo(prevCity.x, prevCity.y);
            ctx.lineTo(x, y);
            ctx.strokeStyle = '#0000FF';  // Linhas azuis
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.closePath();
        }
    });
}

document.getElementById('calculateBtn').addEventListener('click', function () {
    const startCity = document.getElementById('startCity').value;
    const endCity = document.getElementById('endCity').value;

    const result = dijkstra(graph, startCity, endCity);

    const output = document.getElementById('output');
    if (result.distance === Infinity) {
        output.textContent = `Não há caminho entre ${startCity} e ${endCity}.`;
    } else {
        output.innerHTML = `
            <strong>Caminho percorrido:</strong> ${result.path.join(' -> ')}<br>
            <strong>Custo total:</strong> ${result.distance} unidades.
        `;

        // Desenha o caminho no canvas
        drawPathOnCanvas(result.path);
    }
});

