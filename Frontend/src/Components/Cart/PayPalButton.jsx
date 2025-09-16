import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js"
const PayPalButton = ({amount,onSuccess,onError}) => {
//  Secret key 1EEPdLqK3fhacaxDTxtucDo_AbRdHh6WH9e4Vq0W8tGe2X1w9wYAFIJOVSvRLio8f6Z2_dCOXVvIdfYmr
// snadbox_acciunt=sb-lww5t46271217@personal.example.com
// password:{Q%7=R&j
//     sanbox_url=https://sandbox.paypal.com
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