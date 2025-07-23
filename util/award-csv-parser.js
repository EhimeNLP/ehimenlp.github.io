import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { randomBytes } from 'crypto';


const awardsDir = path.join('content', "papers", 'awards');

if (fs.existsSync(awardsDir)) {
    fs.readdirSync(awardsDir)
        .filter(file => file.endsWith('.yaml'))
        .forEach(file => fs.unlinkSync(path.join(awardsDir, file)));
} else {
    fs.mkdirSync(awardsDir, { recursive: true });
}

fs.createReadStream('content/awards.csv')
    .pipe(csv())
    .on('data', (row) => {
        console.log('🔍 1行読み込み:', row);

        const slug = randomBytes(8).toString('hex');
        const filename = path.join('content/papers/awards', `${slug}.yaml`);

        const membersRaw = row.members || ""; // ← スペルミスに対応
        const membersList = membersRaw
            .split(/[:,、]/) // 「:」や「、」などの区切りに対応
            .map(m => m.trim())
            .filter(Boolean) // 空文字を除く
            .map(m => `  - "${m}"`)
            .join('\n');
        const onlyFirstAuthor = row.only_first_author?.toLowerCase() === 'true';


        const content = `title: "${row.title}"
date: "${row.date}"
department: "${row.department}"
award_name: "${row.award_name}"
award_link: "${row.award_link}"
only_first_author: ${onlyFirstAuthor}
members:
${membersList}
`;

        fs.writeFileSync(filename, content);
        console.log(`✅ ${filename} を生成しました`);
    });
