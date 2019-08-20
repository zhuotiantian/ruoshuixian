<template>
    <div class="container">
        <PockerIndex type="counts" titleBtn="跳过" nextPage="./ready/main" btnType="none"></PockerIndex>
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