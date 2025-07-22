<template>
    <div class="my-4">
        <template v-for ="info in infos" :key="info.title">
            <div class="mb-4 border rounded-lg p-4">
                <div class="cursor-pointer" @click="toggleExpanded(info.title)">
                    <div class="flex items-center justify-between">
                        <div>
                            <h2 class="text-xl font-bold">{{ info.title }}</h2>
                            <p class="text-sm text-gray-500">{{ new Date(info.date).toLocaleDateString() }}</p>
                        </div>
                        <div class="text-gray-400 text-xl">
                            {{ expandedItems[info.title] ? '▲' : '▼' }}
                        </div>
                    </div>
                </div>
                <div v-if="expandedItems[info.title]" class="mt-4 border-t pt-4">
                    <ContentRenderer :value="info" class="prose" />
                </div>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
const { data: infos } = await useAsyncData(() => queryCollection('infos').order("date", "DESC").all())

// 展開状態を管理するリアクティブオブジェクト
const expandedItems = ref<Record<string, boolean>>({})

// 展開/折りたたみを切り替える関数
const toggleExpanded = (title: string) => {
    expandedItems.value[title] = !expandedItems.value[title]
}
</script>