import { ArrowBack } from "@mui/icons-material";
import { Box, Modal } from "@mui/material";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useContext, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import axiosApp from "../../common/api";
import { BINGO_ACCESS_TOKEN_KEY } from "../../common/constants";
import { AppContext } from "../../common/context";
import landingPageStyles from "../../styles/landingPage.module.scss";

function GetCoins() {
  const { openCoinsModal, setOpenCoinsModal, setOpenWallet } =
    useContext(AppContext);
  const [paypal, setPaypal] = useState(true);
  const [coinsModal, setCoinsModal] = useState(false);
  const [optionModal, setOptionModal] = useState(false);
  const [paymentModal, setPaymentModal] = useState(false);
  const [amount, setAmount] = useState(0);
  const [payNow, setPayNow] = useState(true);

  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_CLIENT_ID);

  const Paypal = () => {
    return (
      <>
        <p
          className={`${landingPageStyles.giftModalTitle}`}
          style={{ marginTop: "20px" }}
        >
          How would you like to pay?
        </p>
        <div className={`${landingPageStyles.paymentOptionContainer}`}>
          <div
            className={`${landingPageStyles.paymentOption} ${
              paypal ? landingPageStyles.active : ""
            }`}
            onClick={() => setPaypal(true)}
          >
            {paypal && (
              <FaCheckCircle
                className={`${landingPageStyles.paymentIcon}`}
                color="#FF3636"
              />
            )}
            <img src="/static/images/paypal.png" width="80%" />
          </div>
          <div
            className={`${landingPageStyles.paymentOption} ${
              !paypal ? landingPageStyles.active : ""
            }`}
            onClick={() => setPaypal(false)}
          >
            {!paypal && (
              <FaCheckCircle
                className={`${landingPageStyles.paymentIcon}`}
                color="#FF3636"
              />
            )}
            <img src="/static/images/stripe.png" width="100%" />
          </div>
        </div>
        <PayPalScriptProvider
          options={{
            "client-id": `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}`,
          }}
        >
          <PayPalButtons
            style={{
              shape: "pill",
              color: "blue",
              layout: "vertical",
              label: "paypal",
            }}
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: amount,
                    },
                  },
                ],
              });
            }}
            onApprove={async (data, actions) => {
              const order = await actions.order.capture();
              console.log({ od: order.id });
              const response = await axiosApp.post(
                "/checkout-paypal/",
                {
                  id: order.id,
                },
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                      BINGO_ACCESS_TOKEN_KEY
                    )}`,
                  },
                }
              );
              console.log(response);
            }}
            onError={(err) => {
              console.log(err);
            }}
          />
        </PayPalScriptProvider>
      </>
    );
  };

  const Stripe = () => {
    const [isProcessing, setProcessingTo] = useState(false);
    const [checkoutError, setCheckoutError] = useState();

    const stripe = useStripe();
    const elements = useElements();

    const CARD_OPTIONS = {
      iconStyle: "solid",
      style: {
        base: {
          iconColor: "#c4f0ff",
          color: "#000",
          fontWeight: 400,
          fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
          fontSize: "20px",
          fontSmoothing: "antialiased",
          ":-webkit-autofill": { color: "#000" },
          "::placeholder": { color: "#9e9e9e" },
        },
        invalid: {
          iconColor: "#0f0",
          color: "#f00",
        },
      },
    };

    const handleCardDetailsChange = (ev) => {
      ev.error ? setCheckoutError(ev.error.message) : setCheckoutError();
    };

    const handleFormSubmit = async (ev) => {
      setProcessingTo(true);

      try {
        const paymentMethodReq = await stripe.createPaymentMethod({
          type: "card",
          card: elements.getElement(CardNumberElement),
        });

        if (paymentMethodReq.error) {
          console.log("Error", paymentMethodReq.error);
          setCheckoutError(paymentMethodReq.error.message);
          setProcessingTo(false);
          return;
        }

        console.log("payem", paymentMethodReq);

        const response = await axiosApp.post(
          "/checkout-stripe/",
          {
            amount: amount * 100,
            payment_method_id: paymentMethodReq.paymentMethod.id,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(
                BINGO_ACCESS_TOKEN_KEY
              )}`,
            },
          }
        );

        console.log("response", response);

        // onSuccessfulCheckout();
      } catch (err) {
        console.log(err.message);
        setCheckoutError(err.message);
      }
    };

    return (
      <>
        <p
          className={`${landingPageStyles.giftModalTitle}`}
          style={{ marginTop: "20px" }}
        >
          How would you like to pay?
        </p>
        <div className={`${landingPageStyles.paymentOptionContainer}`}>
          <div
            className={`${landingPageStyles.paymentOption} ${
              paypal ? landingPageStyles.active : ""
            }`}
            onClick={() => setPaypal(true)}
          >
            {paypal && (
              <FaCheckCircle
                className={`${landingPageStyles.paymentIcon}`}
                color="#FF3636"
              />
            )}
            <img src="/static/images/paypal.png" width="80%" />
          </div>
          <div
            className={`${landingPageStyles.paymentOption} ${
              !paypal ? landingPageStyles.active : ""
            }`}
            onClick={() => setPaypal(false)}
          >
            {!paypal && (
              <FaCheckCircle
                className={`${landingPageStyles.paymentIcon}`}
                color="#FF3636"
              />
            )}
            <img src="/static/images/stripe.png" width="100%" />
          </div>
        </div>
        <p
          className={`${landingPageStyles.giftModalTitle}`}
          style={{ margin: "20px 0px" }}
        >
          Card Number
        </p>
        <div
          style={{
            padding: "5px 20px",
            border: "#003 solid 1px",
            borderRadius: "5%",
          }}
        >
          <CardNumberElement
            options={CARD_OPTIONS}
            onChange={handleCardDetailsChange}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ flex: "2", marginRight: "30px" }}>
            <p
              className={`${landingPageStyles.giftModalTitle}`}
              style={{ margin: "20px 0px" }}
            >
              Expiration Date
            </p>
            <div
              style={{
                padding: "5px 20px",
                border: "#003 solid 1px",
                borderRadius: "5%",
              }}
            >
              <CardExpiryElement
                options={CARD_OPTIONS}
                onChange={handleCardDetailsChange}
              />
            </div>
          </div>
          <div style={{ flex: "1" }}>
            <p
              className={`${landingPageStyles.giftModalTitle}`}
              style={{ margin: "20px 0px" }}
            >
              CVV/CVC
            </p>
            <div
              style={{
                padding: "5px 20px",
                border: "#003 solid 1px",
                borderRadius: "5%",
              }}
            >
              <CardCvcElement
                options={CARD_OPTIONS}
                onChange={handleCardDetailsChange}
              />
            </div>
          </div>
        </div>
        <button
          className={`${landingPageStyles.getCoinsBtn}`}
          onClick={handleFormSubmit}
          disabled={isProcessing || !stripe}
        >
          Pay
        </button>
      </>
    );
  };
  return (
    <div>
      <Modal
        open={coinsModal || openCoinsModal}
        onClose={() => {
          setCoinsModal(false);
          setOpenCoinsModal(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          className={`${landingPageStyles.coinsContainer}`}
          sx={{ background: "white" }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <ArrowBack
              fontSize="small"
              sx={{ color: "black", cursor: "pointer" }}
              onClick={() => {
                setCoinsModal(false);
                setOpenCoinsModal(false);
                setOpenWallet(true);
              }}
            />

            <Box
              fontSize="30px"
              fontFamily="Inter"
              fontWeight="700"
              color="black"
            >
              Get Coins!
            </Box>

            <img
              src="/static/images/cross.svg"
              width="17px"
              height="17px"
              style={{ cursor: "pointer" }}
              alt="close"
              onClick={() => {
                setCoinsModal(false);
                setOpenCoinsModal(false);
              }}
            />
          </Box>
          <div className={`${landingPageStyles.packageContainer}`}>
            <div className={`${landingPageStyles.package}`}>
              <img
                src="/static/images/coin1.svg"
                className={`${landingPageStyles.coinsImage}`}
              />
              <p>100</p>
              <input
                type="button"
                className={`${landingPageStyles.btn}`}
                value="$10"
                onClick={() => {
                  setAmount(9.99);
                  setCoinsModal(false);
                  setOpenCoinsModal(false);
                  setOptionModal(true);
                }}
              />
            </div>
            <div className={`${landingPageStyles.package}`}>
              <img
                src="/static/images/coin2.svg"
                className={`${landingPageStyles.coinsImage}`}
              />
              <p>200</p>
              <input
                type="button"
                className={`${landingPageStyles.btn}`}
                value="$20"
                onClick={() => {
                  setAmount(19.99);
                  setCoinsModal(false);
                  setOpenCoinsModal(false);
                  setOptionModal(true);
                }}
              />
            </div>
            <div className={`${landingPageStyles.package}`}>
              <img
                src="/static/images/coin3.svg"
                className={`${landingPageStyles.coinsImage}`}
              />
              <p>500</p>
              <input
                type="button"
                className={`${landingPageStyles.btn}`}
                value="$50"
                onClick={() => {
                  setAmount(49.99);
                  setCoinsModal(false);
                  setOpenCoinsModal(false);
                  setOptionModal(true);
                }}
              />
            </div>
            <div className={`${landingPageStyles.package}`}>
              <img
                src="/static/images/coin4.svg"
                className={`${landingPageStyles.coinsImage}`}
              />
              <p>1000</p>
              <input
                type="button"
                className={`${landingPageStyles.btn}`}
                value="$100"
                onClick={() => {
                  setAmount(99.99);
                  setCoinsModal(false);
                  setOpenCoinsModal(false);
                  setOptionModal(true);
                }}
              />
            </div>
            <div className={`${landingPageStyles.package}`}>
              <img
                src="/static/images/coin5.svg"
                className={`${landingPageStyles.coinsImage}`}
              />
              <p>2000</p>
              <input
                type="button"
                className={`${landingPageStyles.btn}`}
                value="$200"
                onClick={() => {
                  setAmount(199.99);
                  setCoinsModal(false);
                  setOpenCoinsModal(false);
                  setOptionModal(true);
                }}
              />
            </div>
          </div>
        </Box>
      </Modal>

      <Modal
        open={optionModal}
        onClose={() => setOptionModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          className={`${landingPageStyles.giftModal}`}
          style={{ maxHeight: "80vh", overflowY: "scroll" }}
        >
          {paypal ? (
            <Paypal />
          ) : (
            <Elements stripe={stripePromise}>
              <Stripe />
            </Elements>
          )}
        </Box>
      </Modal>
      <Modal
        open={paymentModal}
        onClose={() => setPaymentModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          className={`${landingPageStyles.giftModal}`}
          style={{ maxHeight: "80vh", overflowY: "scroll" }}
        >
          <p
            className={`${landingPageStyles.giftModalTitle}`}
            style={{ marginTop: "20px" }}
          >
            How would you like to pay?
          </p>
          <div className={`${landingPageStyles.paymentOptionContainer}`}>
            <div
              className={`${landingPageStyles.paymentOption} ${
                paypal ? landingPageStyles.active : ""
              }`}
              onClick={() => setPaypal(true)}
            >
              {paypal && (
                <FaCheckCircle
                  className={`${landingPageStyles.paymentIcon}`}
                  color="#FF3636"
                />
              )}
              <img src="/static/images/paypal.png" width="80%" />
            </div>
            <div
              className={`${landingPageStyles.paymentOption} ${
                !paypal ? landingPageStyles.active : ""
              }`}
              onClick={() => setPaypal(false)}
            >
              {!paypal && (
                <FaCheckCircle
                  className={`${landingPageStyles.paymentIcon}`}
                  color="#FF3636"
                />
              )}
              <img src="/static/images/stripe.png" width="100%" />
            </div>
          </div>
          <p className={`${landingPageStyles.giftModalTitle}`}>Card Number</p>
          <input
            placeholder="Enter your card number"
            className={landingPageStyles.giftModalInput}
            style={{ paddingRight: "80px", marginTop: "10px" }}
            // onChange={}
            // value={giftAmount}
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ flex: "2" }}>
              <p
                className={`${landingPageStyles.giftModalTitle}`}
                style={{ marginTop: "20px" }}
              >
                Expiration Date
              </p>
              <input
                placeholder="MM/YY"
                className={landingPageStyles.giftModalInput}
                style={{ width: "70%", textAlign: "center", marginTop: "10px" }}
                // onChange={}
                // value={giftAmount}
              />
            </div>
            <div style={{ flex: "1" }}>
              <p
                className={`${landingPageStyles.giftModalTitle}`}
                style={{ marginTop: "20px" }}
              >
                CVV/CVC
              </p>
              <input
                className={landingPageStyles.giftModalInput}
                style={{
                  paddingRight: "20px",
                  textAlign: "center",
                  marginTop: "10px",
                }}
                // onChange={}
                // value={giftAmount}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              margin: "10px 0px",
            }}
          >
            <p
              className={`${landingPageStyles.giftModalTitle}`}
              style={{ marginRight: "20px", fontWeight: "bold" }}
            >
              Total:
            </p>
            <p
              className={`${landingPageStyles.giftModalTitle}`}
              style={{ marginTop: "20px" }}
            >
              {`$${amount.toFixed(2)}`}
            </p>
          </div>
          <button className={`${landingPageStyles.getCoinsBtn}`}>Pay</button>
        </Box>
      </Modal>
    </div>
  );
}

export default GetCoins;
