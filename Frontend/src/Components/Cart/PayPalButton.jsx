import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js"
const PayPalButton = ({amount,onSuccess,onError}) => {

const clientId=import.meta.env.VITE_PAYPAL_CLIENTID    
return (
        <PayPalScriptProvider options={{'client-id':clientId}}>
            <PayPalButtons style={{layout:"vertical"}} createOrder={(data,actions)=>{
                return actions.order.create({
                    purchase_units:[{amount: {value:amount}}]
                })
            }}
            onApprove={(data,actions)=>{
                return actions.order.capture().then(onSuccess)
            }}
            onError={onError}
            />
        </PayPalScriptProvider>
    );
};

export default PayPalButton;