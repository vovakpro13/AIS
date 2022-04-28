class Graph {
    constructor() {
        this.vertices = {}; // список суміжності
    }

    addVertex(value) {
        if (!this.vertices[value]) {
            this.vertices[value] = [];
        }
    }

    addEdge(vertex1, vertex2) {
        if (!(vertex1 in this.vertices) || !(vertex2 in this.vertices)) {
            throw new Error('Такої вершини нема!');
        }

        if (!this.vertices[vertex1].includes(vertex2)) {
            this.vertices[vertex1].push(vertex2);
        }
        if (!this.vertices[vertex2].includes(vertex1)) {
            this.vertices[vertex2].push(vertex1);
        }
    }

    dfs(startVertex, callback) {
        let list = this.vertices; // список суміжності
        let stack = [startVertex]; // стек вершин
        let visited = {[startVertex]: 1}; // відвідані вершини

        function handleVertex(vertex) {
            // колбек для пройденої вершини
            callback(vertex);

            // список суміжних вершин
            let reversedNeighboursList = [...list[vertex]].reverse();

            reversedNeighboursList.forEach(neighbour => {
                if (!visited[neighbour]) {
                    // відмітив як відвідану
                    visited[neighbour] = 1;
                    stack.push(neighbour);
                }
            });
        }

        // перебираєм вершини зі стеку
        while (stack.length) {
            console.log("Стек: ",  stack);

            let activeVertex = stack.pop();
            handleVertex(activeVertex);
        }
    }
}

const graph = new Graph();

graph.addVertex(1);
graph.addVertex(2);
graph.addVertex(3);
graph.addVertex(4);
graph.addVertex(5);
graph.addVertex(6);
graph.addVertex(7);

graph.addEdge(1, 2);
graph.addEdge(2, 4);
graph.addEdge(4, 3);
graph.addEdge(1, 6);
graph.addEdge(6, 7);
graph.addEdge(7, 5);

graph.dfs(1, (vertex) => {
    console.log("Відвідав " + vertex + " вершину")
})
