<template>
  <div class="about">
		<h5>{{ t }}</h5>
    <h1>This is an about page{{ $route.params.id }}</h1>
  </div>
</template>

<script>
	export default {
		props: {
			t: [
				{
					type: String,
					default: '0',
				},
				{
					type: Number,
					default: 0,
				},
			],
		},
	}
</script>
