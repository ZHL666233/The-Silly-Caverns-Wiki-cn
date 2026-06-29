<template>
  <div class="wiki-tabber">
    <div class="wt-tabs">
      <button v-for="(t, i) in tabs" :key="i" :class="{ active: i === active }" @click="active = i" v-html="t.title" />
    </div>
    <div class="wt-panel" v-for="(t, i) in tabs" :key="i" v-show="i === active">
      <div v-html="t.body" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, useSlots, onMounted } from 'vue'

const slots = useSlots()
const active = ref(0)

interface Tab { title: string; body: string }
const tabs = ref<Tab[]>([])

onMounted(() => {
  // 从默认 slot 中解析 <!-- tab:XXX --> 标记
  const el = document.createElement('div')
  // 通过 render 函数获取 slot 内容
  const raw = (slots.default?.()?.[0]?.children as string) || ''
  const parts = raw.split(/<!-- tab:(.+?) -->/)
  for (let i = 1; i < parts.length; i += 2) {
    tabs.value.push({ title: parts[i].trim(), body: (parts[i+1] || '').trim() })
  }
})
</script>

<style scoped>
.wiki-tabber { margin: 16px 0; border: 1px solid var(--vp-c-divider); border-radius: 8px; overflow: hidden; }
.wt-tabs { display: flex; flex-wrap: wrap; background: var(--vp-c-bg-soft); border-bottom: 1px solid var(--vp-c-divider); }
.wt-tabs button { padding: 10px 16px; border: none; background: none; cursor: pointer; font-size: 14px; color: var(--vp-c-text-1); transition: all .2s; border-bottom: 2px solid transparent; white-space: nowrap; }
.wt-tabs button:hover { background: var(--vp-c-bg-mute); }
.wt-tabs button.active { border-bottom-color: var(--vp-c-brand); color: var(--vp-c-brand); font-weight: 600; }
.wt-panel { padding: 16px; }
.wt-panel :deep(table) { margin: 0; width: 100%; }
</style>
