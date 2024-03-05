<svelte:options accessors={true} />

<script lang="ts">

	import { onMount } from 'svelte'; //imports the needed onMount handler
	let terminalElement: HTMLElement;
	let terminalController: xterm.Terminal;
	import 'xterm/css/xterm.css'
	// Tip to avoid xterm.Terminal not a constructor
	// https://svelte.dev/repl/6e240ad6907d42a6a1f33e2b69df3d06?version=3.48.0
	// https://github.com/xtermjs/xterm.js/issues/3887
	import xTerm from 'xterm';

	onMount(async () => {
		terminalController = new xTerm.Terminal();
		terminalController.open(terminalElement)                // open the element bound to the var
		// 		terminalController.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ')
		terminalController.write(value)
		terminalController.onData((e) => {
			// https://github.com/gradio-app/gradio/blob/379b6f662ebacc04298da93ef4cd61922c2fdf71/js/image/src/StaticImage.svelte
			gradio.dispatch("input", { input: e});
			//console.log(e)
			//value = "alalal"
			//terminalController.write(e)
		})
	});

	import type { Gradio } from "@gradio/utils";
	import { BlockTitle } from "@gradio/atoms";
	import { Block } from "@gradio/atoms";
	import { StatusTracker } from "@gradio/statustracker";
	import type { LoadingStatus } from "@gradio/statustracker";
	import { tick } from "svelte";

	export interface TermInputData {
		input: string
	}

	export let gradio: Gradio<{
		change: never;
		submit: never;
		input: TermInputData;
	}>;
	export let label = "Terminal";
	export let elem_id = "";
	export let elem_classes: string[] = [];
	export let visible = true;
	export let value = "";
	export let placeholder = "";
	export let show_label: boolean;
	export let scale: number | null = null;
	export let min_width: number | undefined = undefined;
	export let loading_status: LoadingStatus | undefined = undefined;
	export let value_is_output = false;
	export let interactive: boolean;
	export let rtl = false;

	let el: HTMLTextAreaElement | HTMLInputElement;
	const container = true;

	function handle_change(): void {
		if (terminalController) {
			terminalController.write(value)
		}
		gradio.dispatch("change");
		if (!value_is_output) {
			//gradio.dispatch("input");
		}
	}

	$: if (value === null) value = "";

	// When the value changes, dispatch the change event via handle_change()
	// See the docs for an explanation: https://svelte.dev/docs/svelte-components#script-3-$-marks-a-statement-as-reactive
	$: value, handle_change();
</script>

<Block
	{visible}
	{elem_id}
	{elem_classes}
	{scale}
	{min_width}
	allow_overflow={false}
	padding={true}
>
	{#if loading_status}
		<StatusTracker
			autoscroll={gradio.autoscroll}
			i18n={gradio.i18n}
			{...loading_status}
		/>
	{/if}

	<label class:container>
		<BlockTitle {show_label} info={undefined}>{label}</BlockTitle>
		<div id="terminal" bind:this="{terminalElement}">{placeholder}</div> 
	</label>
</Block>

<style>
	label {
		display: block;
		width: 100%;
	}

	input {
		display: block;
		position: relative;
		outline: none !important;
		box-shadow: var(--input-shadow);
		background: var(--input-background-fill);
		padding: var(--input-padding);
		width: 100%;
		color: var(--body-text-color);
		font-weight: var(--input-text-weight);
		font-size: var(--input-text-size);
		line-height: var(--line-sm);
		border: none;
	}
	.container > input {
		border: var(--input-border-width) solid var(--input-border-color);
		border-radius: var(--input-radius);
	}
	input:disabled {
		-webkit-text-fill-color: var(--body-text-color);
		-webkit-opacity: 1;
		opacity: 1;
	}

	input:focus {
		box-shadow: var(--input-shadow-focus);
		border-color: var(--input-border-color-focus);
	}

	input::placeholder {
		color: var(--input-placeholder-color);
	}
</style>
