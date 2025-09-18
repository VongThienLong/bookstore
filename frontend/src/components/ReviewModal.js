import React, { useState } from 'react';

const ReviewModal = ({ isOpen, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0); // Số sao
  const [hoverRating, setHoverRating] = useState(0); // Số sao khi hover
  const [name, setName] = useState(''); // Tên người dùng
  const [comment, setComment] = useState(''); // Nội dung nhận xét
  const [isAnonymous, setAnonymous] = useState(false); // Đánh giá ẩn danh

  if (!isOpen) return null;

  const handleStarClick = (star) => setRating(star);
  const handleStarHover = (star) => setHoverRating(star);
  const handleStarLeave = () => setHoverRating(0);

  const handleSubmit = () => {
    if (rating === 0 || (!isAnonymous && name.trim() === '') || comment.trim() === '') {
      alert('Vui lòng điền đầy đủ thông tin và chọn số sao!');
      return;
    }

    const review = {
      rating,
      name: isAnonymous ? 'Ẩn danh' : name.trim(),
      comment: comment.trim(),
    };

    onSubmit(review); // Gửi dữ liệu về parent component
    onClose(); // Đóng modal
    // Reset state
    setRating(0);
    setHoverRating(0);
    setName('');
    setComment('');
    setAnonymous(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-96">
        {/* Header */}
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-lg font-semibold">Viết đánh giá sản phẩm</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-red-500">
            ✕
          </button>
        </div>

        {/* Nội dung form */}
        <div className="p-4">
          

          {/* Đánh giá sao */}
          <div className="text-center mb-4">
            <p className="text-sm font-medium mb-2">Đánh giá của bạn</p>
            <div className="flex justify-center">
              {[...Array(5)].map((_, index) => {
                const star = index + 1; // Giá trị sao
                return (
                  <span
                    key={index}
                    className={`text-xl cursor-pointer ${
                      (hoverRating || rating) >= star
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                    onClick={() => handleStarClick(star)}
                    onMouseEnter={() => handleStarHover(star)}
                    onMouseLeave={handleStarLeave}
                  >
                    ★
                  </span>
                );
              })}
            </div>
          </div>

          {/* Nhập tên và nội dung */}
          <div className="space-y-4">
            {!isAnonymous && (
              <input
                type="text"
                placeholder="Nhập tên sẽ hiển thị khi đánh giá"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
            <textarea
              placeholder="Nhập nhận xét của bạn về sản phẩm"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-2 border rounded h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="anonymous"
                checked={isAnonymous}
                onChange={(e) => setAnonymous(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="anonymous" className="text-sm">
                Đánh giá ẩn danh
              </label>
            </div>
          </div>
        </div>

        {/* Nút hành động */}
        <div className="flex justify-end p-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 mr-2"
          >
            Hủy
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Gửi nhận xét
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
