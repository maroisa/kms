export function formatDate(dateString) {
    const date = new Date(dateString).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
    console.log(date);
    return date;
}
