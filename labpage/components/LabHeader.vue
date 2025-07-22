<template>
    <header class="flex items-center justify-between p-4 bg-blue-600 text-white">
        <!-- ロゴ -->
        <div class="text-xl font-bold">
            〇〇研究室
        </div>

        <!-- ナビゲーション -->
        <nav class="space-x-6">
            <NuxtLink to="/" class="hover:underline">ホーム</NuxtLink>
            <NuxtLink to="/research" class="hover:underline">研究内容</NuxtLink>
            <NuxtLink to="/members" class="hover:underline">メンバー</NuxtLink>
            <NuxtLink to="/publications" class="hover:underline">業績</NuxtLink>
        </nav>
    </header>
</template>

<script>
export default {
    name: 'LabHeader'
}
</script>