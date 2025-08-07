<template>
  <div 
    class="member-card"
    :class="{ 'clickable': link }"
    @click="handleClick"
  >
    <div class="image-container">
      <img 
        :src="`/member-image/${imageName}`" 
        :alt="`${name}の写真`"
        class="member-image">
    </div>
    <div class="member-info">
      <p class="member-text">{{ role }}：{{ name }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  imageName: string
  role: string
  name: string
  link: string
}

const props = defineProps<Props>()

const handleClick = () => {
  if (props.link) {
    window.open(props.link, '_blank')
  }
}
</script>

<style scoped>
.member-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.member-card.clickable {
  cursor: pointer;
}

.member-card.clickable:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.image-container {
  margin-bottom: 12px;
}

.member-image {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
  border: 2px solid #e5e7eb;
}

.member-info {
  text-align: center;
}

.member-text {
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  line-height: 1.4;
}

@media (max-width: 768px) {
  .member-image {
    width: 100px;
    height: 100px;
  }
  
  .member-text {
    font-size: 12px;
  }
}
</style>
