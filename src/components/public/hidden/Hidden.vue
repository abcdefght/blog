<template>
    <div id="p-hidden" class="hidden" v-if="flag">

    </div>
</template>

<script>
    export default {
        name: "Hidden",
        data(){
          return {
            flag:false
          }
        },
        methods:{
          open(){
            this.flag=true;
          },
          close(){
            this.flag=false;
          }
        }
    }
</script>


