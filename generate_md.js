const fs = require('fs');

const tasks = JSON.parse(fs.readFileSync('./src/data/tasks.json', 'utf-8'));

let md = '# مراجعة بنك أسئلة C# والحلول 🚀\n\nفيما يلي قائمة بجميع المهام الـ 19 الموجودة حالياً في المنصة بعد الترتيب من الأسهل للأصعب، مع وصف كل مهمة والحل النموذجي:\n\n---\n\n';

tasks.forEach(task => {
    md += `### ${task.id}️⃣ ${task.title}\n`;
    md += `**المستوى:** \`${task.difficulty}\`\n`;
    md += `**الوصف:** ${task.description}\n`;
    md += `**الحل:**\n\`\`\`csharp\n${task.codeSnippet}\n\`\`\`\n\n---\n\n`;
});

// Write to the user's brain directory
const outPath = 'C:/Users/Lenovo/.gemini/antigravity/brain/b2e8ece4-0578-4eba-80b1-9e4a587aa6aa/csharp_tasks_review.md';
fs.writeFileSync(outPath, md, 'utf-8');
console.log('Markdown generated successfully!');
