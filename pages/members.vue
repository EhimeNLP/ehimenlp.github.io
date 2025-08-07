<template>
    <div>
        <MainContent />
        
        <!-- 現役メンバーのカードギャラリー -->
        <div v-if="currentMembers.length > 0" class="current-members-section">
            <div class="members-grid">
                <MemberCard
                    v-for="member in currentMembers"
                    :key="member.name"
                    :name="member.name"
                    :role="member.role"
                    :link="member.link"
                    :image-name="member.image_name"
                />
            </div>
        </div>

        <!-- その他のタイプ別メンバー -->
        <div v-for="type in otherTypes" :key="type" class="member-type-section">
            <h2>{{ type }}</h2>
            <ul>
                <li v-for="member in getMembersByType(type)" :key="member.name">
                    {{ member.name }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import MainContent from '~/components/MainContent.vue';
import MemberCard from '~/components/MemberCard.vue';

interface Member {
    name: string;
    role: string;
    link: string;
    image_name: string;
    type: string;
}

const csvData = await $fetch('members.csv', {
    parseResponse: txt => txt
}) as string;

// CSVをパースする関数
function parseCSV(csvText: string): Member[] {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    
    return lines.slice(1).map(line => {
        const values = line.split(',').map(v => v.trim());
        return {
            name: values[headers.indexOf('name')] || '',
            role: values[headers.indexOf('role')] || '',
            link: values[headers.indexOf('link')] || '',
            image_name: values[headers.indexOf('image_name')] || '',
            type: values[headers.indexOf('type')] || ''
        } as Member;
    });
}

const members = parseCSV(csvData);

// 現役メンバーを取得
const currentMembers = computed(() => 
    members.filter(member => member.type === '現役')
);

// 現役以外のタイプを取得（重複を除いて順序を保持）
const otherTypes = computed(() => {
    const types = members
        .filter(member => member.type !== '現役')
        .map(member => member.type);
    return [...new Set(types)];
});

// 特定のタイプのメンバーを取得
const getMembersByType = (type: string) => {
    return members.filter(member => member.type === type);
};
</script>

<style scoped>
.current-members-section {
    margin: 2rem 0;
}

.members-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-top: 1rem;
}

.member-type-section {
    margin: 2rem 0;
}

.member-type-section h2 {
    color: #2c3e50;
    border-bottom: 2px solid #3498db;
    padding-bottom: 0.5rem;
    margin-bottom: 1rem;
}

.member-type-section ul {
    list-style-type: disc;
    margin-left: 1.5rem;
}

.member-type-section li {
    margin-bottom: 0.5rem;
    font-size: 1rem;
    line-height: 1.4;
}
</style>