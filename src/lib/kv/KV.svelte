<script lang="ts" module>
import { Button, Table, Modal, Form, FormField, FormHideField, Input, type FormFieldRule, type FormValidateError, type FormInstance, type TableColRender } from "$lib/index.js";
import type { Snippet } from "svelte";

export type KVInstance = {
    add: {():void};
}

type KVRow = {
    key: string;
    value: string|number;
}

type KVLabel = {
    key: string;
    value: string;
    action: string;
    action_edit: string;
    action_remove: string;
    modal_title_add: string;
    modal_title_edit: string;
    modal_cancel: string;
    modal_ok: string;
}

export type KVProps = {
    label?:KVLabel,
    value?:KVRow[];
    keyTip?:string;
    valueTip?:string;
    actionWidth?:string;
    keyRules?:FormFieldRule[];
    valueRules?:FormFieldRule[];
    keyInput?:Snippet;
    valueInput?:Snippet;
    keyColRender?:TableColRender;
    valueColRender?:TableColRender;
    placeholder?: string;
    onchange?:{(data:any):void};
}

</script>

<script lang="ts">

let {
    value = [],
    label = {
        key: "Key",
        value: "Value",
        action: "Action",
        action_edit: "Edit",
        action_remove: "Remove",
        modal_title_add: "Add KV",
        modal_title_edit: "Edit KV",
        modal_cancel: "Cancel",
        modal_ok: "Ok",
    },
    keyTip = "",
    valueTip = "",
    actionWidth = "200px",
    keyRules = [{
        rule: (v) => v?.length > 0,
        msg: "Key is required",
    }],
    valueRules = [{
        rule: (v) => v?.length > 0,
        msg: "Value is required",
    }],
    keyInput,
    valueInput,
    keyColRender,
    valueColRender,
    placeholder = "No data",
    onchange,
}:KVProps = $props();

let data = $state(value);

$effect(() => {
    data = value;
});

let form = $state<FormInstance|null>(null);

function onsubmit() {
    form?.submit();
}

let modal = $state<{show:boolean, value:any}>({
    show: false,
    value: null,
});

export function add() {
    modal = {show:true, value:{key:"", value:"", index:-1}};
}

function update(index:number, value:Record<string, any>) {
    modal = {show:true, value: {...value, index}};
}

function oncancel() {
    modal = {show:false, value:null};
}

function onremove(index:number) {
    data.splice(index, 1);
}

function onform(row:Record<string, any>, errors:FormValidateError[]) {
    if(errors.length === 0) {
        if(row.index === -1) {
            data.push({key: row.key, value: row.value});
        } else {
            data[row.index] = {key: row.key, value: row.value};
        }

        modal = {show:false, value:null};
    }
}

$effect(() => {
    onchange?.(data.map(item => ({key:item.key, value:item.value})));
});

</script>

{#snippet actionRender(row:Record<string, any>, index:number)}
    <Button
        size="xs"
        onclick={() => update(index, row)}
    >
        {label.action_edit}
    </Button>
    <Button 
        size="xs"
        variant="danger"
        onclick={() => onremove(index)}
    >
        {label.action_remove}
    </Button>
{/snippet}

<Table
    bordered
    compact
    effect="hover"
    columns={[
        {label: label.key, key: "key", render:keyColRender},
        {label: label.value, key: "value", render:valueColRender},
        {label: label.action, key: "_", width: actionWidth, render:actionRender}
    ]}
    source={data}
    placeholder={placeholder}
/>

{#if modal.show}
    <Modal
        title={modal.value.index === -1 ? label.modal_title_add : label.modal_title_edit}
        okText={label.modal_ok}
        cancelText={label.modal_cancel}
        onok={onsubmit}
        oncancel={oncancel}
    >
        <Form
            bind:this={form}
            layout="col"
            onsubmit={onform}
        >
            <FormField
                label={label.key}
                name="key"
                value={modal.value.key}
                required
                rules={keyRules}
                tooltip={keyTip}
            >
                {#if keyInput}
                    {@render keyInput()}
                {:else}
                    <Input/>
                {/if}
            </FormField>

            <FormField
                label={label.value}
                name="value"
                value={modal.value.value}
                required
                rules={valueRules}
                tooltip={valueTip}
            >
                {#if valueInput}
                    {@render valueInput()}
                {:else}
                    <Input/>
                {/if}
            </FormField>

            <FormHideField
                name="index"
                value={modal.value.index}
            />
        </Form>
    </Modal>
{/if}
