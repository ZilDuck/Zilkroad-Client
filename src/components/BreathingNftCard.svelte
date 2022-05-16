<script lang="ts">
	export let className = ''
	export let price = true
</script>

<article class="group flex flex-col w-full relative bg-black rounded-lg {className}">
	<div>
		<div
			class="w-full rounded-lg bg-zilkroad-gray-darker after:pb-[100%] after:content-[''] after:block animate-[pulse_ease-in-out_3s_infinite]"
		/>
		<span
			class="flex rounded-sm items-center mt-5 bg-zilkroad-gray-darker h-7 text-xl font-medium w-5/12 animate-[pulse_ease-in-out_3s_infinite]"
		/>
	</div>

	<span class="mt-2 h-4 rounded-sm font-light animate-[pulse_ease-in-out_3s_infinite] w-4/12 bg-zilkroad-gray-darker text-zilkroad-gray-lighter" />

	{#if price}
		<span class="bg-zilkroad-gray-darker rounded-sm font-light h-4 animate-[pulse_ease-in-out_3s_infinite] w-6/12 mt-2" />
	{/if}
</article>
