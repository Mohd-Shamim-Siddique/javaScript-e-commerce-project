import { updateCartItemCount } from "./main";

export const addToCart = (element, count, originalPrice) => {

    if (count === 0) return;

    let existingCart = JSON.parse(localStorage.getItem('product')) || [];
    console.log(JSON.parse(localStorage.getItem('product')));


    const currentProduct = {
        id: element.id,
        category: element.category,
        title: element.title,
        image: element.image,
        unitPrice: originalPrice,
        quantity: count,
        totalPrice: originalPrice * count,
    };

    const filteredItems = existingCart.filter(item => item.id === element.id);

    if (filteredItems.length > 0) {
        existingCart = existingCart.map(item => {
            console.log(item.quantity)
            if (item.id === element.id) {
                const updatedQuantity = item.quantity + count;
                return {
                    ...item,
                    quantity: updatedQuantity,
                    totalPrice: Number((item.unitPrice * updatedQuantity).toFixed(2))
                };
            }
            return item;
        });
    } else {
        existingCart.push(currentProduct);
    }

    localStorage.setItem('product', JSON.stringify(existingCart));
    updateCartItemCount()

}
