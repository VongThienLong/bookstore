import React from "react";

const CartItem = ({
  item,
  selected,
  toggleSelection,
  handleIncreaseQuantity,
  handleDecreaseQuantity,
  handleRemoveFromCart,
}) => {
  return (
    <div className="flex items-center border-b px-2 py-4 gap-2 md:gap-4">
      {/* Checkbox */}
      <div className="inline-flex items-center">
        <label className="flex items-center cursor-pointer relative">
          <input
            type="checkbox"
            className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-blue-600 checked:border-blue-600"
            checked={selected || false}
            onChange={() => toggleSelection(item.id)}
          />
          <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5"
              viewBox="0 0 20 20"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </span>
        </label>
      </div>

      {/* Image */}
      <img
        src={item.hinhAnh}
        alt={item.tenSach}
        className="w-24 h-28 object-cover rounded-md"
      />

      <div className="w-full flex flex-col md:flex-row items-start md:items-center gap-4">
        {/* Product Details */}
        <div className="flex flex-col flex-grow space-y-2">
          <p className="text-md lg:text-lg font-medium">{item.tenSach}</p>
          <p className="text-base text-red-500 font-bold">
            {item.donGia.toLocaleString()} đ
          </p>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center justify-between w-full md:w-fit space-x-6">
          <div className="flex items-center justify-center space-x-1">
            <button
              onClick={() => handleDecreaseQuantity(item.id)}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              -
            </button>
            <span className="min-w-5 text-center">{item.quantity || 1}</span>
            <button
              onClick={() => handleIncreaseQuantity(item.id)}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              +
            </button>
          </div>

          {/* Total Price */}
          <p className="hidden md:block min-w-28 font-bold text-red-500">
            {(item.donGia * (item.quantity || 1)).toLocaleString()} đ
          </p>

          {/* Remove Button */}
          <button
            onClick={() => handleRemoveFromCart(item.id)}
            className="text-gray-500 hover:text-red-500"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
