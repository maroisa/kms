export const load = async ({ params }) => {
    return {
        ptik: await (await fetch("http://localhost:3000/api/ptik")).json()
    }
}
