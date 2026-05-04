import React, { Fragment, useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import { LayoutContext } from "../layout";
import { subTotal, quantity, totalCost } from "../partials/Mixins";
import { cartListProduct } from "../partials/FetchApi";
import { fetchData } from "./Action";

const apiURL = process.env.REACT_APP_API_URL;

export const CheckoutComponent = () => {
  const history = useHistory();
  const { data, dispatch } = useContext(LayoutContext);

  const [state, setState] = useState({
    address: "",
    phone: "",
    error: ""
  });

  useEffect(() => {
    fetchData(cartListProduct, dispatch);
  }, []);

  const placeOrder = async () => {

    if (!state.address || !state.phone) {
      setState({
        ...state,
        error: "All fields required"
      });
      return;
    }

    try {

      const orderData = {
        allProduct: data.cartProduct.map((item)=>({
          id:item._id,
          quantitiy: quantity(item._id)
        })),

        user: JSON.parse(localStorage.getItem("jwt")).user._id,

        amount: totalCost(),

        transactionId: "FAKE_" + Date.now(),

        address: state.address,
        phone: state.phone
      };

      const res = await axios.post(
`${apiURL}/api/orders/place-order`,
orderData
);

      if(res.data.success){
        alert("🎉 Order Successful");
        history.push("/dashboard/user/orders");
      }

    } catch(err){
      console.log(err);
      setState({
        ...state,
        error:"Something went wrong"
      });
    }
  };


  if(data.loading){
    return(
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    )
  }


  return(
    <Fragment>

      <section className="mx-4 mt-20 md:mx-12 md:mt-32 lg:mt-24">

        <div className="text-2xl mx-2">
          Order
        </div>

        <div className="flex flex-col md:flex-row md:space-x-2">

          {/* products */}
          <div className="md:w-1/2">
            <CheckoutProducts products={data.cartProduct}/>
          </div>


          {/* checkout form */}
          <div className="w-full md:w-1/2 p-4 md:p-8">

            {state.error && (
              <div className="bg-red-200 py-2 px-4 rounded mb-4">
                {state.error}
              </div>
            )}

            <div className="flex flex-col py-2">
              <label className="pb-2">
                Delivery Address
              </label>

              <input
                value={state.address}
                onChange={(e)=>
                  setState({
                    ...state,
                    address:e.target.value,
                    error:""
                  })
                }
                type="text"
                className="border px-4 py-2"
                placeholder="Address..."
              />
            </div>


            <div className="flex flex-col py-2 mb-4">
              <label className="pb-2">
                Phone
              </label>

              <input
                value={state.phone}
                onChange={(e)=>
                  setState({
                    ...state,
                    phone:e.target.value,
                    error:""
                  })
                }
                type="number"
                className="border px-4 py-2"
                placeholder="+91"
              />
            </div>


            <div
              onClick={placeOrder}
              className="w-full px-4 py-2 text-center text-white font-semibold cursor-pointer"
              style={{background:"#303031"}}
            >
              Place Order
            </div>

          </div>

        </div>

      </section>

    </Fragment>
  )
};




const CheckoutProducts = ({products}) => {

  const history = useHistory();

  return(
    <Fragment>

      <div className="grid grid-cols-2 md:grid-cols-1">

        {products && products.length > 0 ? (

          products.map((product,index)=>(
            <div
              key={index}
              className="col-span-1 m-2 md:py-6 md:border-t md:border-b md:flex md:items-center md:justify-between"
            >

              <div className="md:flex md:items-center md:space-x-4">

                <img
                  onClick={()=>history.push(`/products/${product._id}`)}
                  className="cursor-pointer md:h-20 md:w-20 object-cover"
                  src={`${apiURL}/uploads/products/${product.pImages[0]}`}
                  alt="product"
                />

                <div className="text-lg md:ml-6">
                  {product.pName}
                </div>

                <div className="md:ml-6 text-sm text-gray-600">
                  Price : ₹{product.pPrice}
                </div>

                <div className="md:ml-6 text-sm text-gray-600">
                  Quantity : {quantity(product._id)}
                </div>

                <div className="text-sm text-gray-600">
                  Subtotal : ₹{subTotal(product._id,product.pPrice)}
                </div>

              </div>

            </div>
          ))

        ):(
          <div>No product found for checkout</div>
        )}

      </div>

    </Fragment>
  )
}

export default CheckoutProducts;