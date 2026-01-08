<script lang="ts">
import { Select, Form, FormField, Input, Textarea, Button, Switch, RadioGroup, Radio, Checkbox, CheckboxGroup, Message, type MessageInstance, Editor, TimePicker, KV, type KVInstance } from "$lib/index.js";

const sizes = ["sm", "md", "lg"];

let message:MessageInstance;
let kv:KVInstance;
</script>

<svelte:head>
    <title>Form</title>
</svelte:head>

<h2 class="text-lg font-bold leading-10">
    Form
</h2>

<div>
    <Form
        trim={true}
    >
        <FormField
            label="Username"
            name="username"
            required
            rules={[
                {
                    rule: (value) => value.length > 0,
                    msg: "Username is required",
                },
            ]}
        >
            <Input
                type="text"
                class="w-full"
            />
        </FormField>

        <FormField
            label="Password"
            name="Password"
            required
            rules={[
                {
                    rule: (value) => value.length > 0,
                    msg: "Password is required",
                },
            ]}
        >
            <Input
                type="password"
                class="w-full"
            />
        </FormField>
    </Form>
</div>

<div class="mt-6">
    <Form layout="row">
        <FormField
            class="w-96"
            label="用户名称"
            name="username"
            rules={[
                {
                    rule: (value) => value.length > 0,
                    msg: "Username is required",
                },
            ]}
        >
            <Input
                type="text"
                class="w-full"
            />
        </FormField>

        <FormField
            class="w-96"
            label="手机号码"
            name="mobile"
            rules={[
                {
                    rule: (value) => value.length > 0,
                    msg: "Mobile is required",
                },
            ]}
        >
            <Input
                type="text"
                class="w-full"
            />
        </FormField>

        <FormField
            class="w-96"
            label="Email"
            labelClass="w-[66px]"
            name="Email"
            tooltip="Email is required"
            rules={[
                {
                    rule: (value) => value.length > 0,
                    msg: "Email is required",
                },
            ]}
        >
            <Input
                type="text"
            />
        </FormField>
    </Form>
</div>

<div class="mt-6">
    <Form 
        layout="col" 
        onsubmit={(data, errors) => {
            console.log(data, errors, "<<<<");
            if(errors.length > 0) {
                const err = errors[0];

                message.push({
                    message: err.msg,
                    variant: "error", 
                    onclose: () => {
                        console.log("close ---")
                    }
                });
            }
        }
    }>

        <FormField
            label="爱好"
            name="hobby"
            required
            onchange={value => {
                console.log("hobby:", value);
            }}
            rules={[
                {
                    rule: (value) => value && value.length > 0,
                    msg: "请选择类型",
                },
            ]}
            >
            <CheckboxGroup>
                {#each [
                    {label:"打篮球", value:"A"},
                    {label:"看电影", value:"B"},
                    {label:"骑行", value:"C"},
                    {label:"游泳", value:"D"},
                    {label:"唱歌", value:"E"}
                ] as item}
                    <Checkbox value={item.value}>
                        {item.label}
                    </Checkbox>
                {/each}
            </CheckboxGroup>
        </FormField>

        <FormField
            label="性别"
            name="sex"
            required
            rules={[
                {
                    rule: (value) => !!value,
                    msg: "请选择类型",
                },
            ]}
            onchange={value => {
                console.log("sex:", value);
            }}
        >
            <RadioGroup>
                {#each [
                    {label:"男生", value:"A"},
                    {label:"女生", value:"B"},
                    {label:"保密", value:"C"},
                ] as item}
                    <Radio value={item.value}>
                        {item.label}
                    </Radio>
                {/each}
            </RadioGroup>
        </FormField>

        <FormField
            label="职业"
            name="career"
            required
            rules={[
                {
                    rule: (value) => {
                        return value !== "" && value !== undefined;
                    },
                    msg: "请选择职业",
                },
            ]}
        >
            <Select
                placeholder="请选择职业"
                options={[
                    {value:"A", label:"程序员"},
                    {value:"B", label:"设计师"},
                    {value:"C", label:"产品经理"},
                    {value:"D", label:"测试工程师"},
                    {value:"E", label:"运维工程师"},
                ]}
            />
        </FormField>

        <FormField
            label="登录账号"
            name="username"
            tooltip="Username is required"
            required
            rules={[
                {
                    rule: (value) => value === "OK",
                    msg: "Username is required",
                },
            ]}
        >
            <Input
                type="text"
                class="w-full"
            />
        </FormField>

        <FormField
            label="登录密码"
            name="Password"
            required
            tooltip="登录密码"
            rules={[
                {
                    rule: (value) => value === "OK",
                    msg: "Password is required",
                },
            ]}
        >
            <Input
                type="password"
                class="w-full"
            />
        </FormField>

        <FormField
            label="开始时间"
            name="start_time"
            required
            tooltip="开始时间"
            offset={10}
            rules={[
                {
                    rule: (value) => value !== "",
                    msg: "Start time is required",
                },
            ]}
        >
            <TimePicker />
        </FormField>

        <FormField
            label="说明"
            name="remark"
            required
            rules={[
                {
                    rule: (value) => value === "OK",
                    msg: "请填写说明",
                },
            ]}
        >
            <Textarea/>
        </FormField>

        <FormField
            label="环境变量"
            name="env"
            value={{k:"GOPATH", v:"/go"}}
            required
            rules={[
                {
                    rule: (value) => value && value.k && value.v,
                    msg: "请填写环境变量",
                },
            ]}
        >
            <Button size="sm" onclick={() => kv.add()}>Add</Button>

            <KV
                bind:this={kv}
                value={[]}
            />
        </FormField>

        <FormField
            label="构建命令"
            name="code"
            value="#!/bin/bash"
            required
            rules={[
                {
                    rule: (value) => value != "",
                    msg: "请填写构建命令",
                },
            ]}
        >
            <Editor
                placeholder="#!/bin/bash"
                onfocus={() => {

                }}
                onblur={() => {
                }}
                onchange={v => {
                }}
            />
        </FormField>

        <FormField
            label="启用"
            name="switch"
            required
            rules={[
                {
                    rule: (value) => value === "on",
                    msg: "请启用",
                },
            ]}
        >
            <Switch 
                value="on"
                onValue="on"
                offValue="off"
            />
        </FormField>

        <Button type="submit" class="w-20">Submit</Button>
    </Form>
</div>


<!-- create message global instance -->
<Message 
    bind:this={message}
    max={3}
/>
