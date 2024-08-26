import { redirect } from "react-router-dom";


export const cartActions = async ({ request }) => {
    let formData = await request.formData();
    let data = Object.fromEntries(formData);
    let intent = formData.get('intent');


    if (intent === 'remove-product') {
        const response = await fetch(`/api/cart/remove/${data.product_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                amount: +data.amount
            })
        })

        if (response.ok) {
            const message = await response.json();
            return message
        }
    }

    if (intent === 'purchase-product') {
        const response = await fetch(`/api/cart/purchase`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        })

        if (response.ok) {
            const message = await response.json();
            console.log(message)
            return redirect(`/order/${data.order_index}`)
        }

    }

    if (intent === 'clear-cart') {
        const response = await fetch(`/api/cart/clear`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },

        })

        if (response.ok) {
            const message = await response.json();
            return message
        }
    }

    return "None"

}
