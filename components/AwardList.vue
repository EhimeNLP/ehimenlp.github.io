<template>
    <div class="my-4">
        <template v-for="(award, index) in awards" :key="award.id">
            <div class="mb-4">
                <span class="mr-2">{{ index + 1 }}.</span>
                <span class="mr-2">{{ award.department }}</span>
                
                <!-- 受賞名（リンクがある場合はリンク付き） -->
                <template v-if="award.award_link">
                    <a 
                        :href="award.award_link" 
                        target="_blank" 
                        class="text-blue-600 hover:text-blue-800 underline mr-2"
                    >
                        {{ award.award_name }}
                    </a>
                </template>
                <template v-else>
                    <span class="mr-2">{{ award.award_name }}</span>
                </template>

                <!-- 日付 -->
                <span class="mr-2">
                    （{{ new Date(award.date).toLocaleDateString('ja-JP', { 
                        year: 'numeric', 
                        month: 'long'
                    }) }}）
                </span>

                <!-- 著者リスト -->
                <template v-for="(member, memberIndex) in award.members" :key="member">
                    <span 
                        v-if="memberIndex === 0 && award.only_first_author" 
                        class="font-bold"
                    >
                        {{ member }}
                    </span>
                    <span v-else>{{ member }}</span>
                    <span v-if="memberIndex < award.members.length - 1">, </span>
                </template>

                <!-- タイトル -->
                <span class="ml-2">{{ award.title }}</span>
            </div>
        </template>
    </div>

</template>

<script setup lang="ts">
const { data: awards } = await useAsyncData("awards", () => queryCollection('awards').all())
console.log('Awards data:', awards.value)
</script>