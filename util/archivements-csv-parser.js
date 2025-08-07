import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { randomBytes } from 'crypto';

const categories = ['awards', 'papers', 'journals', 'international_papers', 'others'];

categories.forEach(category => {
    const papersDir = path.join('content', "achivements", category);

    if (fs.existsSync(papersDir)) {
        fs.readdirSync(papersDir)
            .filter(file => file.endsWith('.yaml'))
            .forEach(file => fs.unlinkSync(path.join(papersDir, file)));
    } else {
        fs.mkdirSync(papersDir, { recursive: true });
    }

    fs.createReadStream(`content/${category}.csv`)
        .pipe(csv({
            separator: ',',
            quote: '"',
            escape: '"',
            skipEmptyLines: true,
            skipLinesWithError: true,
        }))
        .on('data', (row) => {

            console.log('🔍 1行読み込み:', row);

            const slug = randomBytes(8).toString('hex');
            const filename = path.join(papersDir, `${slug}.yaml`);

            // データのクリーニング関数（ダブルクオーテーションの除去と安全な文字列処理）
            const cleanData = (value) => {
                if (!value) return "";
                // 前後の空白を除去し、ダブルクオーテーションで囲まれている場合は除去
                const cleaned = value.toString().trim();
                if (cleaned.startsWith('"') && cleaned.endsWith('"')) {
                    return cleaned.slice(1, -1);
                }
                return cleaned;
            };

            // 各フィールドのデータを取得してクリーニング
            const date = cleanData(row.date);
            const tags = cleanData(row.tags);
            const textMd = cleanData(row.text_md);
            const pdfLink = cleanData(row.pdf_link);
            const codeLink = cleanData(row.code_link);
            const dataLink = cleanData(row.data_link);

            // デバッグ用ログ
            console.log('📊 抽出されたデータ:', {
                date, tags, textMd, pdfLink, codeLink, dataLink
            });

            // タグのパース
            const tagsList = tags
                .split(':') // コロンで区切り
                .map(t => t.trim())
                .filter(Boolean) // 空文字を除く
                .map(t => `  - "${t.replace(/"/g, '\\"')}"`) // エスケープ処理
                .join('\n');

            // YAMLコンテンツ生成時にも安全な文字列処理
            const escapeYamlString = (str) => {
                if (!str) return "";
                return str.replace(/"/g, '\\"').replace(/\n/g, '\\n');
            };

            const content = `text_md: "${escapeYamlString(textMd)}"
date: "${escapeYamlString(date)}"
pdf_link: "${escapeYamlString(pdfLink)}"
code_link: "${escapeYamlString(codeLink)}"
data_link: "${escapeYamlString(dataLink)}"
tags:
${tagsList || '  - ""'}
`;

            fs.writeFileSync(filename, content);
            console.log(`✅ ${filename} を生成しました`);
        });
})