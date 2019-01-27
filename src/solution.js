const solution = function ( graph, start, finish ) {

  const lowestConstSibling = ( costs, visited ) => Object.keys(costs).reduce(( prev, current ) => {
    return (prev === null || costs[ current ] < costs[ prev ]) && !visited.includes(current) ? current : prev;
  }, null);

  const costs = Object.assign({ [finish]: Infinity }, graph[ start ]);
  const parents = { [ finish ]: null };
  Object.keys(graph[ start ]).forEach(point => parents[ point ] = start);

  const visited = [];
  let node = lowestConstSibling(costs, visited);

  while (node) {
    let cost = costs[node];
    let children = graph[node];

    Object.keys(children).map(child => {
      let newCost = cost + children[child];
      if (!costs[child] || costs[child] > newCost) {
        costs[child] = newCost;
        parents[child] = node;
      }
    });
    visited.push(node);
    node = lowestConstSibling(costs, visited);
  }

  const path = [finish];
  let parent = parents[finish];
  while (parent) {
    path.push(parent);
    parent = parents[parent];
  }

  return {
    distance: costs[finish],
    path: path.reverse()
  };
};
