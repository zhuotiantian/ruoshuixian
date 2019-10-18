<template>
    <div class="container">
        <PockerIndex type="counts" :isShowTime="false" titleBtn="跳过" nextPage="/pages/fastPocker/ready/main" btnType="none"></PockerIndex>
    </div>
</template>
<script>
    import PockerIndex from "@/components/pockerIndex"
    export default {
        components: {
            PockerIndex
        },
    }
</script>