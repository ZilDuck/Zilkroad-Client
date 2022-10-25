<script>
	import Card from '../../lib/OpenGraph/OpenGraphCard.svelte';

	const mess = 'fuck you'
</script>

<svelte:head>
	<meta content="http://localhost:3000/opengraph-og?message=Welcome!" property="og:image" />
</svelte:head>

<div class="card">
	<Card message={mess}/>
</div>

<style>
	@font-face {
		font-family: 'Noto Sans';
		src: url('/src/lib/OpenGraph/NotoSans-Regular.ttf');
	}

	.card {
		height: 630px;
		width: 1200px;
	}
</style>