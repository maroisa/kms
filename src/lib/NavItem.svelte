<script>
    let {href, children, title} = $props()
</script>

<a href={href} class="btn btn-outline btn-primary flex flex-col justify-center items-center min-h-28">
    {@render children()}
    <p class="font-bold mt-2 text-xs sm:text-base">{title}</p>
</a>