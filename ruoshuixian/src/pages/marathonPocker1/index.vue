<template>
    <div class="container">
        <PockerIndex type="counts" nextPage="./ready/main" btnType="none"></PockerIndex>
    </div>
</template>
<script>
    import PockerIndex from "@/components/pockerIndex"
    export default {
        components: {
            PockerIndex
        }
    }
</script>