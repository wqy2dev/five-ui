<script lang="ts" module>
import { tv } from "tailwind-variants";
import { onMount, type Snippet } from "svelte";

const tableVariants = tv({
	slots: {
        wrapper: "relative min-w-full rounded-lg overflow-x-auto overflow-y-hidden",
        table: "w-full border-collapse border-spacing-0 table table-fixed",
        row: "h-12 border-solid border-b border-gray-100",
        column: "text-sm text-gray-900 text-ellipsis whitespace-nowrap px-2 overflow-hidden",
    },
	variants: {
        effect: {
            header: {
                row: "bg-gray-50",
            },
            hover: {
                row: "hover:bg-gray-50",
            },
            striped: {
                row: "even:bg-gray-50",
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
        bordered: {
            true: {
                table: "border-solid border border-gray-100",
                column: "border-solid border-r border-gray-100",
            },
        },
	},
	defaultVariants: {
        align: "left",
        bordered: false,
	},
});

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
    render?:Snippet<[Record<string, any>, number]>;
    // column width
    width?:string;
}

type TableProps = {
    id?:string;
    class?:string;
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
}

</script>

<script lang="ts">

let {
    id,
    class: className,
    ref,
    columns,
    source,
    effect,
    bordered,
    placeholder,
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
} = tableVariants({
    bordered,
});

</script>

<div
    bind:this={el}
    id={id}
    class={wrapper({className})}
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
            <tr class={row({effect:"header"})}>
                {#each columns as c}
                    <th class={column({align:c.align})}>
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
            {#if source}
                {#each source as r, i}
                    <tr class={row({effect})}>
                        {#each columns as c}
                            <td class={column({align:c.align})}>
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
    </table>
</div>
