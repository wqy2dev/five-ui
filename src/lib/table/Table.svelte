<script lang="ts" module>
import type { Snippet } from "svelte";

export type TableColumn = {
    // unique key
    key:string;
    // column label
    label:string|Snippet;
    // default display
    placeholder?:string;
    // custom render
    render?:Snippet<[Record<string, any>, number]>;
    // column width
    width?:string;
}

type TableProps = {
    // table columns
    columns:TableColumn[];
    // data source
    source?:Record<string, any>[];
    // default display
    placeholder?:string|Snippet;
    // caption header
    header?:Snippet;
    // caption footer
    footer?:Snippet;
}

</script>

<script lang="ts">

let {
    columns,
    source,
    header,
    footer,
    placeholder,
}:TableProps = $props();

</script>

<div class="relative min-w-full overflow-x-auto overflow-y-hidden bg-white">
    <table class="w-full border-collapse border-spacing-0 table table-fixed">
        {#if header}
            <caption class="caption-top pb-3">
                {@render header()}
            </caption>
        {/if}

        <colgroup>
            {#each columns as column}
                <col 
                    width={column.width}
                />
            {/each}
        </colgroup>

        <thead>
            <tr class="h-12 border-input border-b bg-gray-100">
                {#each columns as column}
                    <th class="text-left text-sm text-slate-800 text-ellipsis whitespace-nowrap px-2 overflow-hidden">
                        {#if typeof column.label === "string"}
                            {column.label}
                        {:else}
                            {@render column.label()}
                        {/if}
                    </th>
                {/each}
            </tr>
        </thead>

        <tbody>
            {#if source}
                {#each source as row, i}
                    <tr class="h-12 border-input border-b hover:bg-gray-100">
                        {#each columns as column}
                            <td class="text-left text-sm text-slate-800 text-ellipsis whitespace-nowrap px-2 overflow-hidden">
                                {#if column.render}
                                    {@render column.render(row, i)}
                                {:else}
                                    {row[column.key] ?? column.placeholder}
                                {/if}
                            </td>
                        {/each}
                    </tr>
                {/each}
            {:else}
                <tr class="h-40 border-solid border-b border-gray-100">
                    <td 
                        class="text-center text-base text-slate-600 text-nowrap"
                        colspan={columns.length}
                    >
                        {#if placeholder}
                            {#if typeof placeholder === "string"}
                                {placeholder}
                            {:else}
                                {@render placeholder()}
                            {/if}
                        {:else}
                            empty Data
                        {/if}
                    </td>
                </tr>
            {/if}
        </tbody>

        {#if footer}
            <caption class="caption-bottom pt-3">
                {@render footer()}
            </caption>
        {/if}
    </table>
</div>
