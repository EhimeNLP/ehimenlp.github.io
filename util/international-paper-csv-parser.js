import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { randomBytes } from 'crypto';


const papersDir = path.join('content', "papers", 'international_papers');

if (fs.existsSync(papersDir)) {
    fs.readdirSync(papersDir)
        .filter(file => file.endsWith('.yaml'))
        .forEach(file => fs.unlinkSync(path.join(papersDir, file)));
} else {
    fs.mkdirSync(papersDir, { recursive: true });
}

fs.createReadStream('content/international_papers.csv')
    .pipe(csv())
    .on('data', (row) => {
        console.log('🔍 1行読み込み:', row);

        const slug = randomBytes(8).toString('hex');
        const filename = path.join('content/papers/international_papers', `${slug}.yaml`);

        // メンバーのパース
        const membersRaw = row.members || "";
        const membersList = membersRaw
            .split(':') // コロンで区切り
            .map(m => m.trim())
            .filter(Boolean) // 空文字を除く
            .map(m => `  - "${m}"`)
            .join('\n');

        // タグのパース
        const tagsRaw = row.tag || "";
        const tagsList = tagsRaw
            .split(':') // コロンで区切り
            .map(t => t.trim())
            .filter(Boolean) // 空文字を除く
            .map(t => `  - "${t}"`)
            .join('\n');

        const content = `title: "${row.title || ""}"
info: "${row.info || ""}"
date: "${row.date}"
pdf_link: "${row.pdf_link || ""}"
code_link: "${row.code_link || ""}"
data_link: "${row.data_link || ""}"
tags:
${tagsList || '  - ""'}
members:
${membersList || '  - ""'}
`;

        fs.writeFileSync(filename, content);
        console.log(`✅ ${filename} を生成しました`);
    });
