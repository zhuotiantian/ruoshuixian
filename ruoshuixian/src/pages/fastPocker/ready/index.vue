<template>
    <div class="container">
        <CountIndex nextPage="/pages/fastPocker/memary/main" :hideProccess="true"></CountIndex>
    </div>
</template>
<script>
    import CountIndex from "@/components/countIndex"
    export default {
        components: {
            CountIndex
        }
    }
</script>