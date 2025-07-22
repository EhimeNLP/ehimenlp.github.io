<template>
    <div>
        <LabHeader />
        <div class="container mx-auto p-4 bg-white shadow-md">
            <slot/>
        </div>
    </div>
</template>

<script setup lang="ts">
import LabHeader from '~/components/LabHeader.vue';
</script>