import dayjs from 'dayjs'
import React from 'react'

const DeliveryDate = ({deliveryOptions,cartItem}) => {
     const selectedDeliveryOption = deliveryOptions.find(
                     (deliveryOption) =>
                       deliveryOption.id === cartItem.deliveryOptionId
                   );
  return (
    <div className="delivery-date">
                            Delivery date:{" "}
                            {dayjs(
                              selectedDeliveryOption.estimatedDeliveryTimeMs
                            ).format("dddd, MMMM D")}
                          </div>
  )
}

export default DeliveryDate