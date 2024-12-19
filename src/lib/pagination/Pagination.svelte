<script module lang="ts">
import { type VariantProps, tv } from "tailwind-variants";
import { onMount } from "svelte";

const paginationVariants = tv({
    slots: {
        base: "relative flex flex-nowrap items-center h-fit max-w-fit gap-1.5 overflow-visible",
        item: "flex flex-wrap items-center justify-center text-sm outline-none select-none shadow-sm truncate box-border",
    },
    variants: {
        radius: {
            lg: {
                item: "rounded-lg",
            },
            md: {
                item: "rounded-md",
            },
            sm: {
                item: "rounded-sm",
            },
        },
        active: {
            true: {
                item: "bg-primary-600 hover:bg-primary-700 text-white",
            },
            false: {
                item: "bg-slate-100 hover:bg-slate-200 text-slate-900",
            },
        },
        size: {
            sm: {
                item: "min-w-8 w-8 h-8",
            },
            md: {
                item: "min-w-9 w-9 h-9",
            },
            lg: {
                item: "min-w-10 w-10 h-10",
            }
        },
    },
    defaultVariants: {
        active: false,
        radius: "md",
        size: "md",
    },
});

type Size = VariantProps<typeof paginationVariants>["size"];
type Radius = VariantProps<typeof paginationVariants>["radius"];

function paginate(pages:number, current:number = 1, siblings:number, boundaries:number) {
  const items = [];

  for (let i = 1; i <= boundaries; i++) {
    if (i <= pages) {
      items.push(i);
    }
  }

  const startSibling = Math.max(current - siblings, boundaries + 1);
  const endSibling = Math.min(current + siblings, pages - boundaries);

  if (startSibling > boundaries + 1) {
    items.push("prev");
  }

  for (let i = startSibling; i <= endSibling; i++) {
    if (i > boundaries && i < pages - boundaries + 1) {
      items.push(i);
    }
  }

  if (endSibling < pages - boundaries) {
    items.push("next");
  }

  for (let i = pages - boundaries + 1; i <= pages; i++) {
    if (i > boundaries && i <= pages) {
      items.push(i);
    }
  }

  return items;
}

</script>

<script lang="ts">
import { ChevronLeft, ChevronRight } from "$lib/icons/index.js";

type PaginationProps = {
    id?:string;
    ref?:{(el:HTMLElement):void};
    class?:string;
    page?:number;
    pages?:number;
    siblings?:number;
    boundaries?:number;
    size?:Size;
    radius?:Radius;
    control?:boolean;
    disabled?:boolean;
    variant?: "flat"|"bordered"|"light";
    onchange?:{(page:number):void};
}

let {
    id,
    ref,
    class:className,
    pages = 0,
    page = 1,
    siblings = 2,
    boundaries = 1,
    size = "lg",
    radius = "lg",
}:PaginationProps = $props();

let list:Array<string|number> = $state([]);
let current = $state(page);
let el:HTMLElement;

onMount(() => {
    ref?.(el);

    list = paginate(pages, page, siblings, boundaries);
});

const {
    base,
    item,
} = paginationVariants();

</script>

<ul
	bind:this={el}
    id={id}
    class={base({className})}
>
    <li
        class={item({radius, size})}
    >
        <ChevronLeft/>
    </li>
    {#each list as value}
        <li
            class={item({radius, size, active: value === current})}
        >
            {value}
        </li>
    {/each}
    <li
        class={item({radius, size})}
    >
        <ChevronRight/>
    </li>
</ul>
