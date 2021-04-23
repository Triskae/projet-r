export const classifiers = [
  {
    id: 'decision-tree',
    name: 'Decision Tree',
    form: [
      {
        type: 'select',
        label: 'Variable 1',
        options: ['A', 'B', 'C'],
        defaultOption: 'B'
      }
    ]
  },
  {
    id: 'random-forest',
    name: 'Random Forest',
    form: []
  },
  {
    id: 'k-nearest-neighbors',
    name: 'K-Nearest Neighbors',
    form: []
  },
  {
    id: 'support-vector-machine',
    name: 'Support Vector Machine',
    form: []
  },
  {
    id: 'naive-bayes',
    name: 'Naive Bayes',
    form: []
  },
  {
    id: 'neural-network',
    name: 'Neural Network',
    form: []
  }
]
