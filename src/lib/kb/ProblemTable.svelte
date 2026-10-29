<script lang="ts">
  import reports from '#lib/data/reports-4471.json';
  import notes from '#lib/data/desk-notes.json';
  import { uniqueById, type Report } from '#lib/kb/causes';
  import { tenantOf } from '#lib/kb/locales';
  import { groupByProblem } from '#lib/kb/problems';
  import { TICKET_REPO, TICKETS } from '#lib/kb/tickets-4471';

  let { ticket }: { ticket: number } = $props();

  const rows = $derived((reports as Report[]).filter((r) => r.mergedInto === ticket));
  const merged = $derived(uniqueById(rows));
  const groups = $derived(groupByProblem(merged, tenantOf, notes.oneDayMove));
  const counted = $derived(groups.reduce((n, g) => n + g.reports.length, 0));
  const list = (n: Record<string, number>) =>
    Object.entries(n)
      .sort((a, b) => b[1] - a[1])
      .map(([k, v]) => `${k} ×${v}`)
      .join(' · ');
</script>

<p class="sum">
  <strong>{merged.length}</strong> reports merged into #{ticket}
  ({rows.length - merged.length} rows in the export are the same report twice) ·
  <strong>{groups.length}</strong> problems · every report counted once: <strong>{counted === merged.length ? 'yes' : 'no'}</strong>
</p>

<table>
  <thead>
    <tr><th>problem</th><th>reports</th><th>ticket</th><th>state</th><th>tenants</th><th>came in by</th><th>intake tagged</th><th>seen</th></tr>
  </thead>
  <tbody>
    {#each groups as g (g.problem)}
      {@const t = TICKETS[g.problem]}
      <tr>
        <td><code>{g.problem}</code></td>
        <td><strong>{g.reports.length}</strong></td>
        <td>{#if t}<a href="{TICKET_REPO}/issues/{t.issue}">#{t.issue}</a> {t.title}{:else}none yet{/if}</td>
        <td class="small">{#if t}<strong class:open={t.state === 'open'}>{t.state}</strong>: {t.why}{/if}</td>
        <td>{g.tenants.length}</td>
        <td class="small">{list(g.channels)}</td>
        <td class="small">{list(g.taggedAs)}</td>
        <td class="small">{g.firstSeen} → {g.lastSeen}</td>
      </tr>
    {/each}
  </tbody>
</table>

<style>
  .sum { font-size: 1.05rem; }
  .small { color: var(--muted); font-size: 0.85em; }
  .open { color: var(--warn); }
</style>
