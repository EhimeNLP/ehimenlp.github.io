<template>
    <div>
        <ContentRenderer v-if="content" :value="content" class="prose" />
    </div>
</template>

<script setup lang="ts">
const route = useRoute()
console.log(route.path)
const {data: content} = await useAsyncData(`content-${route.path}`,() => queryCollection('page').path(route.path).first())
</script>