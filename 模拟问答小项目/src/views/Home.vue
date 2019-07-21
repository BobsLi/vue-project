<template>
  <div class="home-warp">
    <ItemContainer father-component="home"></ItemContainer>
  </div>
</template>

<script>
// @ is an alias to /src
import ItemContainer from "@/components/ItemContainer.vue";	

export default {
  name: "home",
  components: {
    ItemContainer,
  }
};
</script>
