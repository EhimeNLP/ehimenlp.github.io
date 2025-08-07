<template>
    <div class="my-4">
        <!-- フィルタリング用チェックボックス -->
        <div class="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 class="text-lg font-semibold mb-3">論文をフィルタリング</h3>
            <div class="flex flex-wrap gap-4">
                <label 
                    v-for="tag in availableTags" 
                    :key="tag"
                    class="flex items-center"
                >
                    <input 
                        v-model="selectedTags"
                        type="checkbox" 
                        :value="tag"
                        class="mr-2"
                    >
                    {{ tag }}
                </label>
            </div>
            <div class="mt-2 text-sm text-gray-600">
                表示中: {{ filteredPapers.length }} 件 / 全 {{ papers?.length || 0 }} 件
            </div>
        </div>
        
        <template v-for="(paper, index) in filteredPapers" :key="paper.id">
            <div class="mb-4">
                <span class="mr-2">{{ index + 1 }}.</span>

                <!-- eslint-disable-next-line vue/no-v-html -->
                <div class="prose inline" v-html="renderMarkdown(paper.text_md)" />

                <!-- リンク（PDFがある場合） -->
                <template v-if="paper.pdf_link && paper.pdf_link !== ''">
                    <a 
                        :href="paper.pdf_link" 
                        target="_blank" 
                        class="text-blue-600 hover:text-blue-800 underline ml-2"
                    >[PDF]</a>
                </template>

                <!-- コードリンク -->
                <template v-if="paper.code_link && paper.code_link !== ''">
                    <a 
                        :href="paper.code_link" 
                        target="_blank" 
                        class="text-blue-600 hover:text-blue-800 underline ml-2"
                    >
                        [Code]
                    </a>
                </template>

                <!-- データリンク -->
                <template v-if="paper.data_link && paper.data_link !== ''">
                    <a 
                        :href="paper.data_link" 
                        target="_blank" 
                        class="text-blue-600 hover:text-blue-800 underline ml-2"
                    >
                        [Data]
                    </a>
                </template>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import MarkdownIt from 'markdown-it'

const props = defineProps<{
    type: 'papers' | 'journals' | 'international_papers' | 'awards' | 'others'
}>();

// markdown-itインスタンスを作成
const md = new MarkdownIt()

// Markdownテキストをレンダリングする関数
const renderMarkdown = (text: string): string => {
    // インラインレンダリングを使用してpタグを避ける
    return md.renderInline(text || '')
}

const { data: papers } = await useAsyncData(props.type, () => queryCollection(props.type).all())

// 選択されたタグを管理するリアクティブな変数
const selectedTags = ref<string[]>([])

// 利用可能なタグを動的に生成
const availableTags = computed(() => {
    if (!papers.value) return []
    
    // 全ての論文からタグを収集
    const allTags = new Set<string>()
    papers.value.forEach(paper => {
        if (paper.tags && Array.isArray(paper.tags)) {
            paper.tags.forEach(tag => allTags.add(tag))
        }
    })
    
    // セットを配列に変換してソート
    return Array.from(allTags).sort()
})

// フィルタリングされた論文を計算プロパティで管理
const filteredPapers = computed(() => {
    if (!papers.value) return []
    
    // タグが選択されていない場合は全ての論文を表示
    if (selectedTags.value.length === 0) {
        return papers.value
    }
    
    // 選択されたタグの全てを含む論文をフィルタリング（AND検索）
    return papers.value.filter(paper => {
        return paper.tags && selectedTags.value.every(tag => paper.tags.includes(tag))
    })
})

console.log('Papers data:', papers.value)
</script>