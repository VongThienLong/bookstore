import React, { useState } from 'react';
import { useCart } from '../components/shared/CartContext';
import CartHeader from '../components/shared/CartHeader';
import CartItem from '../components/shared/CartItem';

const CartPage = () => {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    district: '',
    ward: '',
    address: '',
  });

  const handleIncreaseQuantity = (itemId) => {
    increaseQuantity(itemId);
  };

  const handleDecreaseQuantity = (itemId) => {
    decreaseQuantity(itemId);
  };

  const handleRemoveFromCart = (itemId) => {
    removeFromCart(itemId);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsOverlayVisible(false);
    alert('Đơn hàng của bạn đã được gửi thành công!');
    const selectedIds = Object.keys(selectedItems).filter((id) => selectedItems[id]);
    selectedIds.forEach((id) => removeFromCart(id));
  };

  const [selectedItems, setSelectedItems] = useState(() => {
    return cartItems.reduce((acc, item) => ({ ...acc, [item.id]: true }), {});
  });

  const allSelected = cartItems.length > 0 && cartItems.every((item) => selectedItems[item.id]);

  const toggleSelectAll = (selectAll) => {
    const updatedSelections = cartItems.reduce(
      (acc, item) => ({ ...acc, [item.id]: selectAll }),
      {}
    );
    setSelectedItems(updatedSelections);
  };

  const toggleSelection = (id) => {
    setSelectedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const calculateTotal = () => {
    return cartItems
      .filter((item) => selectedItems[item.id])
      .reduce((sum, item) => sum + item.donGia * item.quantity, 0);
  };

  const freeShippingThreshold = 300000;
  const shippingFee = calculateTotal() > freeShippingThreshold ? 0 : 30000;
  const totalPrice = calculateTotal() + shippingFee;

  return (
    <div className="w-full md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px] mx-auto px-4 pt-20">
      <h2 className="text-2xl md:text-3xl font-bold mb-4">Giỏ hàng</h2>

      {cartItems.length > 0 ? (
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Cart Items */}
          <div className="w-full lg:w-2/3 flex flex-col space-y-4">
            <CartHeader allSelected={allSelected} toggleSelectAll={toggleSelectAll} />

            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                selected={selectedItems[item.id]}
                toggleSelection={toggleSelection}
                handleIncreaseQuantity={handleIncreaseQuantity}
                handleDecreaseQuantity={handleDecreaseQuantity}
                handleRemoveFromCart={handleRemoveFromCart}
              />
            ))}
          </div>

          {/* Total Price Section */}
          <div className="w-full lg:w-1/3 md:mt-6">
            <div className="p-4 bg-white border rounded-md shadow-md">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600 text-sm">Thành tiền</span>
                <span className="text-gray-800 font-medium">
                  {calculateTotal().toLocaleString()} đ
                </span>
              </div>

              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600 text-sm">Phí Giao hàng</span>
                <span className="text-gray-800 font-medium">{shippingFee.toLocaleString()} đ</span>
              </div>
              <hr className="border-t my-2" />

              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-800 text-base font-semibold">Tổng Số Tiền</span>
                <span className="text-red-600 font-bold text-lg">
                  {totalPrice.toLocaleString()} đ
                </span>
              </div>

              <button
                className="w-full block bg-red-600 text-white py-2 px-4 text-center rounded-md hover:bg-red-700 transition font-semibold text-sm"
                onClick={() => setIsOverlayVisible(true)}
              >
                THANH TOÁN
              </button>

              <p className="mt-2 text-sm text-red-500">
                {totalPrice > freeShippingThreshold
                  ? '(Bạn được miễn phí giao hàng)'
                  : `(Miễn phí giao hàng cho đơn hàng trên ${freeShippingThreshold.toLocaleString()} đ)`}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p>Your cart is empty</p>
      )}

      {isOverlayVisible && (
        <div className="fixed inset-0 flex items-start justify-center bg-black bg-opacity-50 z-50 p-4 overflow-y-auto">
          <div className="h-fit w-full max-w-md md:max-w-2xl p-4 md:p-6 bg-white rounded-md shadow-md">
            <h3 className="text-lg font-semibold mb-2 md:mb-4">Thông tin giao hàng:</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { label: 'Họ và Tên', name: 'fullName' },
                { label: 'Email', name: 'email', type: 'email' },
                { label: 'Số điện thoại', name: 'phone' },
                { label: 'Tỉnh/Thành phố', name: 'city' },
                { label: 'Quận/Huyện', name: 'district' },
                { label: 'Phường/Xã', name: 'ward' },
                { label: 'Địa chỉ', name: 'address' },
              ].map(({ label, name, type = 'text' }) => (
                <div key={name} className="flex flex-row items-center gap-2 md:gap-4">
                  <label className="w-1/2 md:w-1/4 text-sm font-medium text-gray-700">
                    {label}
                  </label>
                  <input
                    type={type}
                    name={name}
                    value={shippingInfo[name]}
                    onChange={handleInputChange}
                    required
                    className="w-full md:w-2/3 p-2 border border-gray-300 rounded-md shadow-sm focus:border-red-500"
                  />
                </div>
              ))}
              <div className="flex flex-col md:flex-row md:justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setIsOverlayVisible(false)}
                  className="w-full md:w-auto bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="w-full md:w-auto bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition"
                >
                  Xác nhận
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
