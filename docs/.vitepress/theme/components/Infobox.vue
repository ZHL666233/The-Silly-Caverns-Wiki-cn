<template>
  <div class="wiki-infobox">
    <div class="infobox-title" v-if="title" v-html="title" />
    <div class="infobox-image" v-if="image">
      <img :src="image" :alt="title" loading="lazy" />
    </div>
    <table v-if="rows.length">
      <tr v-for="(row, i) in rows" :key="i">
        <th>{{ row.key }}</th>
        <td v-html="row.val" />
      </tr>
    </table>
    <div class="infobox-section" v-for="(sec, i) in sections" :key="'s'+i">
      <div class="infobox-section-title" v-if="sec.title">{{ sec.title }}</div>
      <table>
        <tr v-for="(row, j) in sec.rows" :key="j">
          <th>{{ row.key }}</th>
          <td v-html="row.val" />
        </tr>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  title?: string
  image?: string
  data?: string
}>()

interface Row { key: string; val: string }
interface Section { title?: string; rows: Row[] }

const sections = computed<Section[]>(() => {
  if (!props.data) return []
  const result: Section[] = []
  let cur: Section = { rows: [] }
  const lines = props.data.split('\n')
  for (const line of lines) {
    if (line.startsWith('## ')) {
      if (cur.rows.length) result.push(cur)
      cur = { title: line.slice(3).trim(), rows: [] }
    } else {
      const m = line.match(/^\|\s*([^|]+?)\s*\|\s*(.+?)\s*\|$/)
      if (m) cur.rows.push({ key: m[1].trim(), val: m[2].trim() })
    }
  }
  if (cur.rows.length) result.push(cur)
  return result
})

const rows = computed<Row[]>(() => {
  if (sections.value.length) return []
  if (!props.data) return []
  return props.data.split('\n').map(line => {
    const m = line.match(/^\|\s*([^|]+?)\s*\|\s*(.+?)\s*\|$/)
    return m ? { key: m[1].trim(), val: m[2].trim() } : { key: '', val: line }
  }).filter(r => r.key)
})
</script>

<style scoped>
.wiki-infobox {
  float: right;
  width: 300px;
  max-width: 100%;
  margin: 0 0 16px 24px;
  border: 2px solid var(--vp-c-brand);
  border-radius: 10px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
  font-size: 13px;
}
.infobox-title {
  background: var(--vp-c-brand);
  color: #fff;
  padding: 10px 14px;
  font-size: 16px;
  font-weight: 700;
  text-align: center;
}
.infobox-image {
  padding: 12px;
  text-align: center;
  background: var(--vp-c-bg);
}
.infobox-image img { max-width: 100%; max-height: 200px; border-radius: 6px; }
table { width: 100%; border-collapse: collapse; }
th, td { padding: 8px 12px; border-bottom: 1px solid var(--vp-c-divider); }
th { background: var(--vp-c-bg-mute); text-align: left; font-weight: 600; width: 40%; white-space: nowrap; }
td { color: var(--vp-c-text-1); }
.infobox-section-title {
  background: var(--vp-c-bg-mute);
  padding: 8px 12px;
  font-weight: 700;
  font-size: 13px;
  border-top: 2px solid var(--vp-c-brand);
}
@media (max-width: 640px) {
  .wiki-infobox { float: none; width: 100%; margin: 0 0 16px 0; }
}
</style>
