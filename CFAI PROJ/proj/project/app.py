from flask import Flask, render_template, jsonify
from collections import deque
app = Flask(__name__)
graph = {
    'A': ['B', 'C'],
    'B': ['D', 'E'],
    'C': ['D','E'],
    'D': ['F'],
    'E': ['F'],
    'F': []
}
def bfs(start, goal):
    queue = deque([start])
    explored = set()
    parent = {start: None}
    steps = []

    while queue:
        current = queue.popleft()

        steps.append({
            "current": current,
            "queue": list(queue),
            "explored": list(explored)
        })

        if current == goal:
            break

        explored.add(current)

        for neighbor in graph[current]:
            if neighbor not in explored and neighbor not in queue:
                parent[neighbor] = current
                queue.append(neighbor)

    return parent, steps


def get_path(parent, goal):
    path = []
    while goal:
        path.append(goal)
        goal = parent.get(goal)
    return path[::-1]

@app.route('/')
def index():
    return render_template('index.html')
@app.route('/run_bfs')
def run_bfs():
    parent, steps = bfs('A', 'F')
    path = get_path(parent, 'F')
    return jsonify({
        "steps": steps,
        "path": path
    })
if __name__ == '__main__':
    app.run(debug=True)