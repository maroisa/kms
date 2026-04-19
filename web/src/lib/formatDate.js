export default function formatDate(dateString) {
    const format = new Date(dateString).toLocaleDateString("id-ID", {
        dateStyle: "long",
    });
    return format;
}
