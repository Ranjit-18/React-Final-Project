import { useDispatch, useSelector } from "react-redux";
import { addPurchase, clearCart, decrementQuantity, incrementQuantity, removeItem } from "./store";
import { useState } from "react"; 
import "./Cart.css";
function Cart()
{
    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    
    const [discPercAmount,setDiscPercAmount] = useState(0);
    //below function is used to set the percentage value
    const setPercentAmount = (discPercAmount) =>{
        setDiscPercAmount(discPercAmount);
    }
    const [couponCode,setCouponCode] = useState('')
    const [couponPercDiscount,setCouponPercDiscount] = useState(0);

    const handleApplyCoupon = () =>{
        switch(couponCode)
        {
            case 'RANJIT10' :
                            setCouponPercDiscount(10);
                            break;
            case 'RANJIT20' :
                            setCouponPercDiscount(20);
                            break;
            case 'RANJIT30' :
                            setCouponPercDiscount(30);
                            break;
            default :
                    alert("Invalid coupon code");
                    setCouponPercDiscount(0);
        }
    }
    const calculateTotal = () =>{
        //calculate the total amount
        const total = cartItems.reduce((sum,item)=>sum + item.quantity * item.price,0);
       //calcualte total discount %
        const totalDiscount = discPercAmount + couponPercDiscount;

        //calculate the discount Price
        const discountPrice = (total * totalDiscount)/100;

        //calculate coupon discount
       // const couponCodeDiscount =(total * couponPercDiscount)/100;
        //calculate the net amount
        //const netAmount = total - discountPrice;
        //
        const finalNetAmount = total - discountPrice //- couponCodeDiscount;

        return{
            total,
            discountPrice,
            //couponCodeDiscount,
            //netAmount,
            totalDiscount,
            finalNetAmount
        }

    }
    const {total,discountPrice,/*netAmount couponCodeDiscount*/totalDiscount,finalNetAmount} = calculateTotal();
    
    const handleCompletePurchase = () =>{
        //taking the values
        const {finalNetAmount} = calculateTotal()
        const purchaseDate = new Date().toLocaleDateString();
        
        //using above values making the object
        const purchaseDetails ={
            date : purchaseDate,
            items : [...cartItems],
            totalAmount : Number(finalNetAmount),
        };

        //dispatch the clear cart action to store
        dispatch(clearCart());

        dispatch(addPurchase(purchaseDetails))

    }
    return (
        <>
            {cartItems.length > 0 ? (
                <>
                <ul>
                    {cartItems.map((item, index) => (
                        <li key={index}>
                            {item.name} - ${item.price.toFixed(2)}  
                            <button onClick={() => dispatch(incrementQuantity(item))}>+</button>{item.quantity}
                            <button onClick={() => dispatch(decrementQuantity(item))}>-</button>  
                            <button onClick={() => dispatch(removeItem(item))}>Remove</button>                        </li>
                    ))}
                </ul>
                <p>Total before discount : {total.toFixed(2)}</p>
                <button onClick={()=>setPercentAmount(10)}>Apply 10% discount</button>
                <button onClick={() =>setPercentAmount(20)}>Apply 20% discount</button>
                <button onClick={() =>setPercentAmount(30)}>Apply 30% discount</button><br />
                <p>Discount Percentage Applied : {totalDiscount}%</p>
                <p>Discount Amount : {discountPrice.toFixed(2)}</p>
                <p>FINAL AMOUNT AFTER DISCOUNT  : {finalNetAmount.toFixed(2)}</p>

                Coupon Code: <input type="text" value={couponCode}
                onChange={(e)=>setCouponCode(e.target.value)}
                placeholder="Enter coupon code"
                /> <br /> 
                <button onClick={()=>handleApplyCoupon()}>Apply Coupon</button>
                <button onClick={handleCompletePurchase}>Complete Purchase</button>
                </>
            )  : (
                <p>Your cart is empty.</p>
            )}
        </>
    );
}

export default Cart;

/*<p>Coupon Discount Percentage Applied : {couponPercDiscount}</p>
                <p>Coupon Discount Amount : {couponCodeDiscount.toFixed(2)}</p>
                <p>Final Amount after Discount  : {finalNetAmount.toFixed(2)}</p>
*/