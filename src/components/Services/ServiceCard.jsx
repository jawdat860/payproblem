import React, { useState, useEffect, useContext } from 'react';
import { FaHeart } from 'react-icons/fa';
import CartContext from '../store/CartContext';
import like1 from "../../assets/ico-like.svg"
import like2 from "../../assets/ico-like-2.svg"
const ServiceCard = ({ service, onClick }) => {
  const [quantity, setQuantity] = useState(0);
  const [love, setLove] = useState(false);
  const cartCtx = useContext(CartContext);



const ButtonCard =()=>{
  cartCtx.addItem({
    id: service.id,
    name: service.title,
    amount: 1,
    price: service.price,
  });

}
const handleDecrement = (id) => {

    setQuantity((prevQuantity) => prevQuantity - 1);
    cartCtx.removeItem(id)
};

const handleIncrement = (ser) => {
  cartCtx.addItem({ ...ser, amount: 1 })
    setQuantity((prevQuantity) => prevQuantity + 1);
  
};
  useEffect(() => {


    if (cartCtx && Array.isArray(cartCtx.items)) {
      const existingItem = cartCtx.items.find(item => item.id === service.id);
      setQuantity(existingItem ? existingItem.amount : 0);
    }

    if (cartCtx && Array.isArray(cartCtx.itemsFavourite)) {
      const existingItemLove = cartCtx.itemsFavourite.find(item => item.id === service.id);
      setLove(existingItemLove ? existingItemLove.love : false);
    }
  }, [cartCtx, service.id]);

  return (
    <div

      className="relative items-center mb-[10px] flex flex-row bg-white dark:bg-gray-800  rounded-[20px] shadow-lg transition-transform transform hover:scale-105 duration-300 cursor-pointer w-full "
      // onClick={onClick}
      aria-label={`Open details for ${service.title}`}
    >
      <div className="relative w-full h-40 flex-[40%] p-[5px] " onClick={onClick}>
 
        <div
          style={{
            backgroundImage: `url(https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            
          }}
          className="w-full h-full object-cover rounded-[20px] relative"
          aria-label={`${service.title} image`}
        >
             <div className='flex pl-[10px] pt-[5px] '>
      <img src={like1} alt='like 1' className='mr-[5px]'/>
      <img src={like2} alt='like 2' />
    </div>
        </div>
      </div>
      <div className="pt-1 h-40 text-left flex flex-col flex-[60%] justify-between " >
        <div onClick={onClick} className='flex-[1] p-[6px] flex gap-[10px] flex-col'>
        <h1 className="text-[0.9rem] capitalize leading-[15px]  sm:text-lg font-bold">{service.title}</h1>
        <p className="text-xs sm:text-sm  text-gray-500 dark:text-gray-300 line-clamp-2">
          {service.description}
        </p>
        </div>
        <div className='flex justify-between'>
      <p className=" font-bold flex items-center justify-center  p-[11px] mr-[10px]   text-[1.05rem] text-black  bg-opacity-50 ">
            {service.price} ₽
          </p>
          {quantity == 0 ? 
            <button className='bg-[#eee]  p-[13px] rounded-tl-[20px] rounded-br-[20px] ' onClick={ButtonCard}>Заказть</button>
            : 
         
            <div className="relative flex items-center rounded-tl-[20px] rounded-br-[20px] max-w-[130px] bg-[#eee] flex-[20%] justify-between  px-[8px] aling-center">
              <button
                type="button"
                // onClick={handleDecrement}
                
                onClick={()=>handleDecrement(service.id)}
                className={`${
                  quantity <= 1 ? "opacity-50 cursor-not-allowed" : ""
                }   h-11  rounded-[20px] font-bold text-[30px]  justify-center items-center`}
              >
                -
              </button>
              <input
                type="text"
                id="quantity-input"
                value={quantity}
                readOnly
                className="bg-white rounded-l-[20px]  rounded-r-[20px]  border-x-0 border-gray-300 h-8 font-medium text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-[50%] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <button
                type="button"
                // onClick={handleIncrement}
                disabled={quantity >= 5}
                onClick={()=>handleIncrement(service)}
                className={`${
                  quantity >= 5 ? "opacity-50 cursor-not-allowed" : ""
                }   h-11   rounded-[20px] font-bold text-[20px] justify-center items-center`}
              >
                +
              </button>
            </div>
         
         
          }
          
          </div>
      </div>
      
    </div>
  );
};

export default ServiceCard;