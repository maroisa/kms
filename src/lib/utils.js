export function formatDate(date){
    const options = {
        year: "numeric", 
        day: "numeric", 
        month: "long"
    }
    
    const newDate = new Date(date).toLocaleDateString("id-ID", options)
    return newDate
}
