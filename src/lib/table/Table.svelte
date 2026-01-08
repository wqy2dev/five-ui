<script lang="ts" module>
import { tv } from "tailwind-variants";
import { onMount, type Snippet } from "svelte";

const tableVariants = tv({
	slots: {
        wrapper: "relative rounded-lg min-w-full overflow-x-auto overflow-y-hidden",
        table: "w-full border-collapse border-spacing-0 table table-fixed",
        row: "h-12",
        column: "text-sm text-slate-700 truncate px-2",
        empty: "h-40 border-solid border-b border-slate-100",
    },
	variants: {
        effect: {
            header: {
                row: "bg-slate-50",
            },
            hover: {
                row: "hover:bg-slate-50",
            },
            striped: {
                row: "even:bg-slate-50",
            },
        },
        align: {
            left: {
                column: "text-left",
            },
            center: {
                column: "text-center",
            },
            right: {
                column: "text-right",
            },
        },
        rowBordered: {
            true: {
                row: "border-solid border-b border-slate-200",
            },
        },
        columnBordered:{
            true: {
                column: "border-solid border-r border-slate-200",
            },
        },
        bordered: {
            true: {
                wrapper: "border-solid border border-slate-200",
            },
        },
        compact: {
            true: {
                row: "h-10",
            },
            false: {
                row: "h-12",
            },
        },
	},
	defaultVariants: {
        align: "left",
        bordered: false,
        rowBordered: false,
        columnBordered: false,
        compact: false,
	},
});

export type TableColRender = Snippet<[Record<string, any>, number]>;

export type TableColumn = {
    // unique key
    key:string;
    // column label
    label:string|Snippet;
    // default display
    placeholder?:string;
    // text alignment
    align?: "left"|"center"|"right",
    // custom render
    render?:TableColRender;
    // column width
    width?:string;
}

type TableProps = {
    id?:string;
    class?:{
        base?:string,
        empty?:string,
    };
    ref?:{(el:HTMLElement):void};
    // table columns
    columns:TableColumn[];
    // data source
    source?:Record<string, any>[];
    // default display
    placeholder?:string|Snippet;
    // row effect
    effect?: "striped" | "hover";
    // with border
    bordered?:boolean;
    // compact mode
    compact?:boolean;
}

</script>

<script lang="ts">
import DocumentText from "$lib/icons/DocumentText.svelte";

let {
    id,
    class: className,
    ref,
    columns,
    source,
    effect,
    bordered,
    compact = false,
    placeholder = "No data",
}:TableProps = $props();

let el: HTMLElement;

onMount(() => {
    ref?.(el);
});

const {
    wrapper,
    table,
    row,
    column,
    empty,
} = tableVariants({
    bordered,
});

</script>

<div
    bind:this={el}
    id={id}
    class={wrapper({className: className?.base})}
>
    <table class={table()}>
        <colgroup>
            {#each columns as column}
                <col 
                    width={column.width}
                />
            {/each}
        </colgroup>

        <thead>
            <tr class={row({effect:"header", rowBordered: true, compact})}>
                {#each columns as c,i}
                    <th class={column({align:c.align, columnBordered: bordered && columns.length !== i+1})}>
                        {#if typeof c.label === "string"}
                            {c.label}
                        {:else}
                            {@render c.label()}
                        {/if}
                    </th>
                {/each}
            </tr>
        </thead>

        <tbody>
            {#if source && source.length > 0}
                {#each source as r, i}
                    <tr class={row({effect, rowBordered: source.length !== i+1, compact})}>
                        {#each columns as c,j}
                            <td class={column({align:c.align, columnBordered: bordered && columns.length !== j+1})}>
                                {#if c.render}
                                    {@render c.render(r, i)}
                                {:else}
                                    {r[c.key] ?? c.placeholder}
                                {/if}
                            </td>
                        {/each}
                    </tr>
                {/each}
            {:else}
                <tr class={empty({className: className?.empty})}>
                    <td 
                        class="text-center"
                        colspan={columns.length}
                    >
                        {#if typeof placeholder === "string"}
                            <span class="inline-block">
                                <DocumentText
                                    class="block text-slate-200"
                                    size={60}
                                />

                                <span class="text-slate-400 text-[13px]">
                                    {placeholder}
                                </span>
                            </span>
                        {:else}
                            {@render placeholder()}
                        {/if}
                    </td>
                </tr>
            {/if}
        </tbody>
    </table>
</div>
