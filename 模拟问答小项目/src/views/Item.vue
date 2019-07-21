<template>
  <div class="item-warp">
    <ItemContainer father-component="item"></ItemContainer>
  </div>
</template>

<script>
// @ is an alias to /src
import ItemContainer from "@/components/ItemContainer.vue";	

export default {
  name: "item",
  components: {
    ItemContainer,
  },
	created() {
		this.$store.commit('COUNTDOWN');
	}
};
</script>

<style lang="scss" scoped>
	
</style>
