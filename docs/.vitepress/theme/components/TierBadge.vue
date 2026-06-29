<template>
  <span class="tier-badge" :style="{ background: bg, color: fg }"><slot>{{ tier }}</slot></span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ tier: string }>()

const colors: Record<string, [string, string]> = {
  '地层': ['#656565','#fff'], '普通': ['#888','#fff'], '罕见': ['#4a9','#fff'],
  '稀有': ['#55f','#fff'], '传说': ['#f8c','#000'], '神级': ['#f84','#000'],
  '古董': ['#c8f','#000'], '神秘': ['#970bc5','#fff'], '神圣': ['#fffeab','#000'],
  '无瑕': ['#04dbfa','#000'], '星际': ['#fe8001','#fff'], '元宇宙': ['#00e500','#000'],
  '圣洁': ['#fd4444','#fff'], '天界': ['#a30000','#fff'], '虚灵': ['#ac47ff','#fff'],
  '幻象': ['#41ff6d','#000'], '多彩': ['#f0f','#fff'], '超维': ['#ff0080','#fff'],
  '无穷小': ['#fff','#000'],
  'Layer': ['#656565','#fff'], 'Common': ['#888','#fff'], 'Uncommon': ['#4a9','#fff'],
  'Rare': ['#55f','#fff'], 'Legendary': ['#f8c','#000'], 'Godly': ['#f84','#000'],
  'Antique': ['#c8f','#000'], 'Mystical': ['#970bc5','#fff'], 'Divine': ['#fffeab','#000'],
  'Flawless': ['#04dbfa','#000'], 'Interstellar': ['#fe8001','#fff'], 'Metaversal': ['#00e500','#000'],
  'Sacred': ['#fd4444','#fff'], 'Celestial': ['#a30000','#fff'], 'Ethereal': ['#ac47ff','#fff'],
  'Imaginary': ['#41ff6d','#000'], 'Polychromatical': ['#f0f','#fff'], 'Hyperdimensional': ['#ff0080','#fff'],
  'Infinitesimal': ['#fff','#000'],
}

const bg = computed(() => colors[props.tier]?.[0] || '#888')
const fg = computed(() => colors[props.tier]?.[1] || '#fff')
</script>

<style scoped>
.tier-badge {
  display: inline-block;
  padding: 2px 10px;
  border-radius: 12px;
  font-size: 0.85em;
  font-weight: 700;
  line-height: 1.5;
}
</style>
