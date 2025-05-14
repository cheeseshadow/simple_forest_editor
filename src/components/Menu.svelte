<script lang="ts">
	type MenuSection = 'main' | 'upload'

	let page: MenuSection = 'main'
</script>

<div class="menu">
	{#if page === 'main'}
		<button>Save</button>
		<button onclick={() => (page = 'upload')}>Load</button>
	{:else if page === 'upload'}
		<form class="form">
			<button onclick={() => (page = 'main')}>Back</button>
			<input type="file" />
			<button type="submit">Load</button>
		</form>
	{/if}
</div>

<style>
	.menu {
		z-index: 100;
		position: absolute;
		top: 12px;
		right: 12px;

		display: flex;
		gap: 12px;
		flex-direction: column;
		background-color: white;
		border-radius: 20px;
		overflow: hidden;
		box-shadow: 12px 12px 0 rgba(0, 0, 0, 0.1);
		padding: 12px;
	}

	.form {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
</style>
