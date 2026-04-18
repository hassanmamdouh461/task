const fs = require('fs');
const path = './src/data/tasks.json';

const data = JSON.parse(fs.readFileSync(path, 'utf-8'));

const difficultyRank = {
    'Easy': 1,
    'Medium': 2,
    'Hard': 3
};

// Sort the data based on difficulty rank
data.sort((a, b) => difficultyRank[a.difficulty] - difficultyRank[b.difficulty]);

// Re-assign IDs to be perfectly sequential from 1 to N
data.forEach((task, index) => {
    task.id = index + 1;
});

// Write back to the file
fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf-8');
console.log('Successfully sorted tasks by difficulty and renumbered IDs.');
