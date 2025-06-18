<template>
    <div>
        <h1 class="text-2xl font-bold">研究室へようこそ！</h1>
        <p>ここは〇〇研究室の公式サイトです。</p>
        <UAlert title="Heads up!" />
        <ContentRenderer :value="home" class="prose" />
    </div>
</template>

<script setup lang="ts">
const { data: home } = await useAsyncData(() => queryCollection('content').path('/').first())
</script>