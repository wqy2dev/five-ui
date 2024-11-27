import { Snippet, Component } from "svelte";

export interface AlertProps {
    variant?: "info"|"success"|"warning"|"danger";
    id?:string;
    class?: string;
    children: Snippet;
}

export declare const Alert: Component<AlertProps, {}, any>;
