<script module lang="ts">
import { type VariantProps, tv } from "tailwind-variants";
import { onMount } from "svelte";

const paginationVariants = tv({
    slots: {
        base: "relative flex flex-nowrap items-center h-fit max-w-fit gap-3 overflow-visible",
        button: "flex flex-wrap items-center justify-center text-sm outline-none select-none truncate box-border transition-all duration-300 group border-solid border",
    },
    variants: {
        variant: {
            flat: {
                button: "bg-slate-100 border-slate-100 hover:bg-slate-200 hover:border-slate-200 text-slate-700",
            },
            outline: {
                button: "bg-white hover:bg-slate-100 hover:border-slate-200 text-slate-700",
            },
            ghost: {
                button: "bg-white border-white hover:bg-slate-100 hover:border-slate-100 text-slate-700",
            },
        },
        radius: {
            lg: {
                button: "rounded-lg",
            },
            md: {
                button: "rounded-md",
            },
            sm: {
                button: "rounded-sm",
            },
            full: {
                button: "rounded-full",
            },
        },
        active: {
            true: {
                button: "bg-primary-600 hover:bg-primary-700 hover:border-primary-700 text-white border-primary-600 cursor-default",
            },
            false: {
                button: "cursor-inherit",
            },
        },
        size: {
            sm: {
                button: "min-w-7 w-7 h-7",
            },
            md: {
                button: "min-w-8 w-8 h-8",
            },
            lg: {
                button: "min-w-9 w-9 h-9",
            }
        },
        disabled: {
            true: {
                base: "opacity-60 cursor-not-allowed pointer-events-none",
            },
            false: {
                base: "cursor-pointer",
            }
        },
    },
    defaultVariants: {
        variant: "flat",
        radius: "md",
        size: "md",
        disabled: false,
    },
});

type Size = VariantProps<typeof paginationVariants>["size"];
type Radius = VariantProps<typeof paginationVariants>["radius"];
type Variant = VariantProps<typeof paginationVariants>["variant"];

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
import { ChevronDoubleLeft, ChevronDoubleRight, ChevronLeft, ChevronRight, EllipsisHorizontal } from "$lib/icons/index.js";

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
    variant?:Variant;
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
    variant = "flat",
    size = "md",
    radius = "md",
    control = true,
    disabled = false,
    onchange,
}:PaginationProps = $props();

let list:Array<string|number> = $state([]);
let current = $state(page);
let el:HTMLElement;

function next() {
    if(current < pages) {
        go(current+1);
    }
}

function prev() {
    if(current > 1) {
        go(current-1);
    }
}

function go(page:number|string) {
    if(disabled) {
        return;
    }
    if(typeof page === "string") {
        if(page === "prev") {
            prev();
        } else if(page === "next") {
            next();
        }
    } else {
        list = paginate(pages, current = page, siblings, boundaries);

        onchange?.(page);
    }
}

onMount(() => {
    ref?.(el);

    list = paginate(pages, current, siblings, boundaries);
});

const {
    base,
    button,
} = paginationVariants({variant, radius, size, disabled});

</script>

<div
	bind:this={el}
    id={id}
    class={base({className})}
>
    {#if control}
        <button
            class={button()}
            type="button"
            disabled={disabled}
            onclick={prev}
        >
            <ChevronLeft size={15} />
        </button>
    {/if}

    {#each list as value}
        {@const active = value === current}

        <button
            class={button({active})}
            type="button"
            disabled={disabled}
            {...(active ? {}:{onclick:() => go(value)})}
        >
            {#if value === "prev"}
                <ChevronDoubleLeft size={15} class="group-hover:block hidden"/>
                <EllipsisHorizontal size={15} class="group-hover:hidden block"/>
            {:else if value === "next"}
                <ChevronDoubleRight size={15} class="group-hover:block hidden"/>
                <EllipsisHorizontal size={15} class="group-hover:hidden block"/>
            {:else}
                {value}
            {/if}
        </button>
    {/each}

    {#if control}
        <button
            class={button()}
            type="button"
            onclick={next}
            disabled={disabled}
        >
            <ChevronRight size={15} />
        </button>
    {/if}
</div>
