<script>
    let {name, value} = $props()
</script>

<div class="flex gap-4 bg-base-200 p-3 border-1">
    <p class="flex-1 font-semibold">{name}</p>
    <p class="">:</p>
    <p class="flex-2">{value}</p>
</div>