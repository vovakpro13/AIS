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

    dfs(startVertex) {
        console.log("Пішов в глибину");

        const stack = [startVertex]; // стек вершин
        const visited = {[startVertex]: true}; // відвідані вершини

        // перебираєм вершини зі стеку
        while (stack.length) {
            const activeVertex = stack.pop();

            console.log("Відвідав " + activeVertex + " вершину")

            // список суміжних вершин
            let reversedNeighboursList = [...this.vertices[activeVertex]].reverse();

            reversedNeighboursList.forEach(neighbour => {
                if (!visited[neighbour]) {
                    // відмітив як відвідану
                    visited[neighbour] = true;
                    stack.push(neighbour);
                }
            });
        }
    }

    bfs(startVertex) {
        console.log("Пішов в ширину");

        const stack = [startVertex];
        const visited = { [startVertex]: true };

        while(stack.length) {
            const vertex = stack.shift();

            console.log("Відвідав " + vertex + " вершину")

            const temp = this.vertices[vertex];

            temp.forEach(n =>  {
                if(!visited[n]) {
                    visited[n] = true;
                    stack.push(n);
                }
            })
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

graph.dfs(1, )
console.log('-------------------------')
graph.bfs(1,)
