# Tables

**Use tables for tabular data only**: things with rows *and* columns that relate to each other (prices, schedules, comparisons). Never use tables for page layout; that's what Flexbox and Grid are for.

## A complete, accessible table <span class="lvl lvl-1">Beginner</span> { #a-complete-accessible-table data-toc-label="A complete, accessible table" }

```html
<table>
  <caption>Plan comparison</caption>
  <colgroup>
    <col>
    <col span="2">
    <col class="highlight">
  </colgroup>
  <thead>
    <tr>
      <th scope="col">Feature</th>
      <th scope="col">Free</th>
      <th scope="col">Pro</th>
      <th scope="col">Team</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Projects</th>
      <td>3</td>
      <td>Unlimited</td>
      <td>Unlimited</td>
    </tr>
    <tr>
      <th scope="row">Storage</th>
      <td>1 GB</td>
      <td>100 GB</td>
      <td>1 TB</td>
    </tr>
    <tr>
      <th scope="row">Support</th>
      <td colspan="2">Community forum</td>
      <td>24/7 phone</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th scope="row">Price / month</th>
      <td>₹0</td>
      <td>₹499</td>
      <td>₹1,999</td>
    </tr>
  </tfoot>
</table>
```

<div class="demo">
<table>
  <caption style="font-weight:700;padding:.3em">Plan comparison</caption>
  <colgroup><col><col span="2"><col style="background:rgba(228,87,46,.15)"></colgroup>
  <thead>
    <tr><th scope="col">Feature</th><th scope="col">Free</th><th scope="col">Pro</th><th scope="col">Team</th></tr>
  </thead>
  <tbody>
    <tr><th scope="row">Projects</th><td>3</td><td>Unlimited</td><td>Unlimited</td></tr>
    <tr><th scope="row">Storage</th><td>1 GB</td><td>100 GB</td><td>1 TB</td></tr>
    <tr><th scope="row">Support</th><td colspan="2" style="text-align:center">Community forum</td><td>24/7 phone</td></tr>
  </tbody>
  <tfoot>
    <tr><th scope="row">Price / month</th><td>₹0</td><td>₹499</td><td>₹1,999</td></tr>
  </tfoot>
</table>
</div>

## Every table element

| Element | Use |
|---|---|
| `<table>` | The table container |
| `<caption>` | The table's title. First child of `<table>`. Screen readers announce it. |
| `<colgroup>` / `<col>` | Style whole columns. Only `background`, `border`, `width` and `visibility` work on columns. |
| `<thead>` | Header rows. Repeats on each printed page. |
| `<tbody>` | Body rows. A table can have several, to group rows. |
| `<tfoot>` | Summary rows (totals) |
| `<tr>` | A table row |
| `<th>` | A header cell. `scope="col"` or `scope="row"` tells assistive tech what it labels. |
| `<td>` | A data cell |

## Spanning cells <span class="lvl lvl-1">Beginner</span> { #spanning-cells data-toc-label="Spanning cells" }

```html
<table>
  <tr><th rowspan="2">Mon</th><td>9:00 Standup</td></tr>
  <tr><td>14:00 Design review</td></tr>
  <tr><th>Tue</th><td>10:00 Planning</td></tr>
</table>
```

<div class="demo">
<table>
  <tr><th rowspan="2">Mon</th><td>9:00 Standup</td></tr>
  <tr><td>14:00 Design review</td></tr>
  <tr><th>Tue</th><td>10:00 Planning</td></tr>
</table>
</div>

`colspan="n"` merges cells across columns; `rowspan="n"` merges down rows.

## Styling tables <span class="lvl lvl-2">Intermediate</span> { #styling-tables data-toc-label="Styling tables" }

```css
table {
  border-collapse: collapse;       /* single borders instead of doubled */
  inline-size: 100%;
  font-variant-numeric: tabular-nums;   /* digits line up in columns */
}
th, td {
  padding: .5rem .75rem;
  border-block-end: 1px solid #ddd;
  text-align: start;
}
td:is(:nth-child(n+2)) { text-align: end; }  /* right-align numbers */
tbody tr:nth-child(even) { background: #f6f7f9; }   /* zebra stripes */
tbody tr:hover { background: #fff1ea; }
thead th { position: sticky; inset-block-start: 0; background: white; }  /* sticky header */
```

## Responsive tables <span class="lvl lvl-2">Intermediate</span> { #responsive-tables data-toc-label="Responsive tables" }

Tables don't shrink well. Two reliable patterns:

=== "1. Horizontal scroll (simplest)"

    ```html
    <div class="table-scroll" role="region" aria-labelledby="cap" tabindex="0">
      <table>
        <caption id="cap">Quarterly results</caption>
        …
      </table>
    </div>
    ```

    ```css
    .table-scroll { overflow-x: auto; }
    ```

    `tabindex="0"` makes the scroll area keyboard-scrollable; `role="region"` + label makes it announceable.

=== "2. Stack cells as cards on small screens"

    ```html
    <td data-label="Storage">100 GB</td>
    ```

    ```css
    @media (max-width: 600px) {
      thead { display: none; }
      tr, td { display: block; }
      td::before { content: attr(data-label) ": "; font-weight: 700; }
    }
    ```

    !!! warning
        Changing `display` on table elements can strip their table semantics in some browsers. Add `role="table"`, `role="row"`, `role="cell"` explicitly if you use this pattern.

!!! tip "Senior note · 🟠 Advanced"
    For complex tables with multi-level headers, use `id` on each `<th>` and `headers="id1 id2"` on each `<td>`. Test with a screen reader in table mode (++ctrl+alt+arrow-right++ in VoiceOver/NVDA) to hear what each cell announces.
