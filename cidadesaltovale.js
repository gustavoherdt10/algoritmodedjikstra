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
