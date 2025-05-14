<script lang="ts">
</script>

<div class="card">
	<slot />
</div>

<style>
	.card {
		position: absolute;
		width: 100px;
		height: 100px;
		display: flex;
		border-radius: 20px;
		overflow: hidden;
		box-shadow: 12px 12px 0 rgba(0, 0, 0, 0.1);
		background-color: white;
	}
</style>
