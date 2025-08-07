<template>
    <div>
        <MainContent />
        <PapersList type="awards"/>
        <PapersList type="papers" />
        <PapersList type="journals" />
        <PapersList type="international_papers" />
        <PapersList type="others" />
    </div>
</template>

<script setup lang="ts">
import MainContent from '~/components/MainContent.vue';
import PapersList from '~/components/PapersList.vue';
</script>