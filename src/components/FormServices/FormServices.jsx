import { useEffect, useRef, useState } from "react";
import WebApp from "@twa-dev/sdk";
import { isIframe, openLink } from '@telegram-apps/sdk';
import { useNavigate } from "react-router-dom";
function FormServices({ amount, items }) {
  const formRef = useRef(null);
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState(""); // New state for address input
  const nav =useNavigate()
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://securepay.tinkoff.ru/html/payForm/js/tinkoff_v2.js";
    script.async = true;
    document.body.appendChild(script);

    // const data = WebApp.initDataUnsafe;
    // if (Object.keys(data).length === 0 && data.constructor === Object) {
    //   console.error("❌ Open this app in Telegram");
    //   return;
    // }
    // console.log("✅ Telegram WebApp Available", data);
    // WebApp.expand();

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const form = formRef.current;

    const handleSubmit = (e) => {
      e.preventDefault();
      const { email, phone, receipt } = form;

      if (!email.value && !phone.value) {
        return alert("Поле E-mail или Phone не должно быть пустым");
      }

      form.receipt.value = JSON.stringify({
        "EmailCompany": "mail@mail.com",
        "Taxation": "patent",
        "FfdVersion": "1.2",
        "Items": items,
        "Payer": {
          "Name": fullName,
          "Address": address // Include payer's address in the receipt
        }
      });

      console.log("Form data before submission:", {
        Amount: form.amount.value,
        Description: form.description.value,
        Email: form.email.value,
        Phone: form.phone.value,
        FullName: fullName,
        Address: address,
      });
     
     WebApp.BackButton.show(true)
    // eslint-disable-next-line no-undef
   
    pay(form)
      
    };

    form.addEventListener("submit", handleSubmit);

    return () => {
      form.removeEventListener("submit", handleSubmit);
    };
  }, [items, fullName, address]);
  // const pay = (form) => {
  //   if (window.Tinkoff && window.Tinkoff.Pay) {
  //     window.Tinkoff.Pay(form);
  //   } else {
  //     console.error("Tinkoff SDK not available.");
  //   }
  // };
  
  
  return (
    <div className="max-w-lg mx-auto bg-white font-sans bg-[#eee] rounded-lg p-6">
      <form className="payform-tbank" name="payform-tbank" id="payform-tbank" ref={formRef}  target="_blank" >
       
        <input type="hidden" name="terminalkey" value={"1665754848495DEMO"} />
        <input type="hidden" name="frame" value="false" />
        <input type="hidden" name="language" value="ru" />
        <input type="hidden" name="receipt" value="" />

        <div className="mb-4">
          <input
            className="w-full rounded-lg py-2 px-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            name="amount"
            type="hidden"
            defaultValue={amount}
            readOnly
          />
        </div>

        <div className="mb-4">
          <input
            className="w-full rounded-lg py-2 px-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            type="hidden"
            placeholder="Описание заказа"
            name="description"
            defaultValue="Оплата товаров"
          />
        </div>

        <div className="mb-4">
          <label className="text-gray-700 text-sm block mb-1">ФИО плательщика:</label>
          <input
            className="w-full rounded-lg py-2 px-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            type="text"
            placeholder="Введите ваше ФИО"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            name="fullName"
            required
          />
        </div>

        <div className="mb-4">
          <label className="text-gray-700 text-sm block mb-1">Адрес:</label>
          <input
            className="w-full rounded-lg py-2 px-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            type="text"
            placeholder="Введите ваш адрес"
            value={address}
            onChange={(e) => setAddress(e.target.value)} // Controlled input for address
            name="address"
            required
          />
        </div>

        <div className="mb-4">
          <label className="text-gray-700 text-sm block mb-1">E-mail:</label>
          <input
            className="w-full rounded-lg py-2 px-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            type="email"
            placeholder="Введите ваш e-mail"
            name="email"
          />
        </div>

        <div className="mb-4">
          <label className="text-gray-700 text-sm block mb-1">Контактный телефон:</label>
          <input
            className="w-full rounded-lg py-2 px-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            type="tel"
            placeholder="Введите ваш телефон"
            name="phone"
          />
        </div>

        <input
          className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all cursor-pointer"
          type="submit"
          value="Оплатить"
        />
      </form>
    </div>
  );
}

export default FormServices;
