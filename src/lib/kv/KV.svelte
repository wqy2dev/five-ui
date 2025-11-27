<script lang="ts" module>
import { Button, Table, Modal, Form, FormField, FormHideField, Input, type FormFieldRule, type FormValidateError, type FormInstance } from "$lib/index.js";

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
    modal_title: string;
}

type KVProps = {
    label?:KVLabel,
    value?:KVRow[];
    valueLength?:number;
    keyTip?:string;
    valueTip?:string;
    keyRules?:FormFieldRule[];
    valueRules?:FormFieldRule[];
    onchange?:{(data:any):void};
}

</script>

<script lang="ts">

let {
    value = [],
    valueLength,
    label = {
        key: "Key",
        value: "Value",
        action: "Action",
        action_edit: "Edit",
        action_remove: "Remove",
        modal_title: "Add KV",
    },
    keyTip = "",
    valueTip = "",
    keyRules = [{
        rule: (v) => v?.length > 0,
        msg: "Key is required",
    }],
    valueRules = [{
        rule: (v) => v?.length > 0,
        msg: "Value is required",
    }],
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
        {label: label.key, key: "key"},
        {label: label.value, key: "value"},
        {label: label.action, key: "_", width: "240px", render:actionRender}
    ]}
    source={data}
/>

{#if modal.show}
    <Modal
        title={label.modal_title}
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
                <Input/>
            </FormField>
            <FormField
                label={label.value}
                name="value"
                value={modal.value.value}
                required
                rules={valueRules}
                tooltip={valueTip}
            >
                <Input
                    showCount={valueLength !== undefined}
                    maxlength={valueLength}
                />
            </FormField>

            <FormHideField
                name="index"
                value={modal.value.index}
            />
        </Form>
    </Modal>
{/if}
