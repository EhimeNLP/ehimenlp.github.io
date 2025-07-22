<template>
    <div>
        <LabHeader />
        <slot />
    </div>
</template>

<script setup lang="ts">
import LabHeader from '~/components/LabHeader.vue';
</script>