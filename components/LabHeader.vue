<template>
    <header class="flex items-center justify-between p-4 bg-blue-600 text-white">
        <!-- ロゴ -->
        <div class="text-xl font-bold">
            〇〇研究室
        </div>

        <!-- デスクトップナビゲーション -->
        <nav class="hidden md:flex space-x-6">
            <NuxtLink to="/" class="hover:underline">ホーム</NuxtLink>
            <NuxtLink to="/research" class="hover:underline">研究テーマ</NuxtLink>
            <NuxtLink to="/output" class="hover:underline">成果公開</NuxtLink>
            <NuxtLink to="/papers" class="hover:underline">論文リスト</NuxtLink>
            <NuxtLink to="/members" class="hover:underline">メンバー</NuxtLink>
            <NuxtLink to="/recruit" class="hover:underline">学生募集</NuxtLink>
        </nav>

        <!-- モバイルハンバーガーメニュー -->
        <div class="md:hidden relative">
            <button 
                class="text-white focus:outline-none"
                :class="{ 'text-blue-200': isMenuOpen }"
                @click="toggleMenu"
            >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path 
                        stroke-linecap="round" 
                        stroke-linejoin="round" 
                        stroke-width="2" 
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                </svg>
            </button>
            
            <!-- プルダウンメニュー -->
            <nav 
                v-show="isMenuOpen" 
                class="absolute right-0 top-full mt-2 w-48 bg-blue-600 rounded-lg shadow-lg border border-blue-500"
            >
                <div class="py-2">
                    <NuxtLink 
                        to="/" 
                        class="block px-4 py-2 hover:bg-blue-700 hover:text-blue-100"
                        @click="closeMenu"
                    >
                        ホーム
                    </NuxtLink>
                    <NuxtLink 
                        to="/research" 
                        class="block px-4 py-2 hover:bg-blue-700 hover:text-blue-100"
                        @click="closeMenu"
                    >
                        研究テーマ
                    </NuxtLink>
                    <NuxtLink 
                        to="/output" 
                        class="block px-4 py-2 hover:bg-blue-700 hover:text-blue-100"
                        @click="closeMenu"
                    >
                        成果公開
                    </NuxtLink>
                    <NuxtLink 
                        to="/papers" 
                        class="block px-4 py-2 hover:bg-blue-700 hover:text-blue-100"
                        @click="closeMenu"
                    >
                        論文リスト
                    </NuxtLink>
                    <NuxtLink 
                        to="/members" 
                        class="block px-4 py-2 hover:bg-blue-700 hover:text-blue-100"
                        @click="closeMenu"
                    >
                        メンバー
                    </NuxtLink>
                    <NuxtLink 
                        to="/recruit" 
                        class="block px-4 py-2 hover:bg-blue-700 hover:text-blue-100"
                        @click="closeMenu"
                    >
                        学生募集
                    </NuxtLink>
                </div>
            </nav>
        </div>
    </header>
</template>

<script setup>
import { ref } from 'vue'

const isMenuOpen = ref(false)

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
    isMenuOpen.value = false
}
</script>