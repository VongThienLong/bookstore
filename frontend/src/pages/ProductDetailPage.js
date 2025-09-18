import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCart } from '../components/shared/CartContext';
import { FaCartShopping } from 'react-icons/fa6';
import { MdOutlinePayment } from 'react-icons/md';
import storeData from '../data/storeData';
import ReviewModal from '../components/ReviewModal';

// Product Image
const ProductImage = ({ book, addToCart }) => {
  return (
    <div className="lg:w-1/3">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img
          src={book.hinhAnh}
          alt={book.tenSach}
          className="w-full h-auto object-cover mt-5 mb-0"
        />
        <div className="p-4 flex flex-col items-center gap-4">
          <Link
            className="flex items-center justify-center w-full h-12 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
            to={'/cart'}
            onClick={() => addToCart(book)}
          >
            <MdOutlinePayment className="mr-2" />
            Mua ngay
          </Link>
          <button
            onClick={() => addToCart(book)}
            className="flex items-center justify-center w-full h-12 bg-white border-2 border-red-600 text-red-600 py-2 px-4 rounded-md hover:bg-red-50"
          >
            <FaCartShopping className="mr-2" />
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </div>
  );
};

// ProductBasicInfo
const ProductBasicInfo = ({ book }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h1 className="text-3xl font-bold mb-4">{book.tenSach}</h1>
      <div className="flex items-center gap-1 mb-4">
        {book.danhGia ? (
          <>
            <span className="text-lg font-bold text-[#ED8A19]">{book.danhGia}</span>
            <img src="/star.svg" alt="star icon" className="w-4 h-auto text-yellow-600" />
          </>
        ) : (
          <span>Chưa có đánh giá</span>
        )}
      </div>
      <div className="text-3xl font-bold text-red-600 mb-4">{book.donGia.toLocaleString()} đ</div>
      <div className="text-gray-700">
        <p>Tác giả: {book.tacGia}</p>
        <p>Nhà xuất bản: {book.nhaXuatBan}</p>
        <p>Nhà cung cấp: {book.nhaCungCap}</p>
        <p>Số lượng còn lại: {book.soLuong}</p>
      </div>
    </div>
  );
};

// ProductDetails
const ProductDetails = ({ book }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Thông tin chi tiết</h2>
      <table className="w-full">
        <tbody>
          <tr className="border-b">
            <td className="py-2 w-1/3">Mã sản phẩm</td>
            <td>{book.maHang}</td>
          </tr>
          <tr className="border-b">
            <td className="py-2">Thể loại</td>
            <td>{book.theLoai}</td>
          </tr>
          <tr className="border-b">
            <td className="py-2">Ngày xuất bản</td>
            <td>{book.ngayXuatBan}</td>
          </tr>
          <tr className="border-b">
            <td className="py-2">Ngôn ngữ</td>
            <td>{book.ngonNgu}</td>
          </tr>
          <tr className="border-b">
            <td className="py-2">Số trang</td>
            <td>{book.soTrang}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

// ProductDescription
const ProductDescription = ({ book }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Mô tả sản phẩm</h2>
      <div className="text-gray-600">{book.moTaSach}</div>
    </div>
  );
};

// ProductComments
const ProductComments = ({ reviews, averageRating, ratingsCount, onOpenReviewModal }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 mt-6">
      <h2 className="text-lg font-semibold mb-4">Đánh giá & bình luận</h2>
      <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-4">
        {/* Điểm trung bình */}
        <div className="text-center w-full sm:w-auto">
          <div className="text-4xl font-bold">
            {averageRating}
            <span className="text-xl">/5</span>
          </div>
          <div className="flex justify-center items-center mt-2">
            {[...Array(5)].map((_, index) => {
              const fullStars = Math.floor(averageRating);
              const fractionalPart = averageRating % 1;
              const starIndex = index + 1;

              return (
                <div key={index} className="relative w-4 h-4">
                  {/* Ngôi sao rỗng (viền ngoài) */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute top-0 left-0 text-gray-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                    />
                  </svg>

                  {/* Ngôi sao vàng đầy */}
                  {starIndex <= fullStars && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute top-0 left-0 text-yellow-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  )}

                  {/* Ngôi sao với phần vàng */}
                  {starIndex === fullStars + 1 && fractionalPart > 0 && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute top-0 left-0 text-yellow-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      style={{ clipPath: `inset(0 ${100 - fractionalPart * 100}% 0 0)` }} // Tỷ lệ phần vàng
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  )}
                </div>
              );
            })}
          </div>
          <div className="text-sm text-gray-500 mt-1">({reviews.length} đánh giá)</div>
        </div>

        {/* Thanh tiến độ */}
        <div className="w-full sm:flex-1">
          {Array.from({ length: 5 }, (_, index) => {
            const star = 5 - index;
            const count = ratingsCount[star] || 0;
            const percentage = reviews.length ? ((count / reviews.length) * 100).toFixed(0) : 0;

            return (
              <div key={index} className="flex items-center mb-1 text-gray-600">
                <span className="w-16 text-sm">{star} sao</span>
                <div className="flex-1 bg-gray-200 h-2 rounded">
                  <div
                    className="h-2 bg-yellow-400 rounded"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <span className="ml-4 text-sm">{percentage}%</span>
              </div>
            );
          })}
        </div>

        {/* Nút viết đánh giá */}
        <div className="w-full sm:w-auto">
          <button
            onClick={() => onOpenReviewModal(true)}
            className="flex items-center justify-center px-4 py-2 w-full sm:w-auto border border-red-500 text-red-500 rounded hover:bg-red-100"
          >
            Viết đánh giá
          </button>
        </div>
      </div>

      {/* Danh sách đánh giá */}
      <div className="mt-4">
        {reviews.length ? (
          reviews.map((review, index) => (
            <div key={index} className="border-b py-4">
              <div className="flex flex-col sm:flex-row sm:items-center mb-2">
                <div className="font-medium">{review.name}</div>
                <div className="ml-0 sm:ml-2 text-yellow-500">
                  {'★'.repeat(review.rating)}
                  <span className="text-gray-300">{'★'.repeat(5 - review.rating)}</span>
                </div>
              </div>
              <div className="text-sm text-gray-600">{review.comment}</div>
            </div>
          ))
        ) : (
          <div className="text-gray-500">Chưa có đánh giá nào.</div>
        )}
      </div>
    </div>
  );
};

function ProductDetailPage() {
  const { id } = useParams();
  const book = storeData.find((b) => b.id === id);
  const { addToCart } = useCart();

  const [isReviewModalOpen, setReviewModalOpen] = useState(false); // Trạng thái mở modal
  const [reviews, setReviews] = useState([]); // Lấy đánh giá từ `storeData`

  useEffect(() => {
    // Lấy đánh giá từ localStorage khi trang được tải lại
    const storedReviews = localStorage.getItem(`reviews-${id}`);
    if (storedReviews) {
      setReviews(JSON.parse(storedReviews));
    } else {
      setReviews(book?.binhLuan || []); // Sử dụng đánh giá mặc định từ `storeData` nếu không có trong localStorage
    }
    // localStorage.clear();
  }, [id, book]);

  const handleAddReview = (review) => {
    // Cập nhật đánh giá
    const updatedReviews = [review, ...reviews];

    // Cập nhật localStorage
    localStorage.setItem(`reviews-${id}`, JSON.stringify(updatedReviews));

    // Cập nhật state reviews
    setReviews(updatedReviews);
  };

  const averageRating = reviews.length
    ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1)
    : 0;

  const ratingsCount = reviews.reduce((acc, curr) => {
    acc[curr.rating] = (acc[curr.rating] || 0) + 1;
    return acc;
  }, {});

  if (!book) {
    return (
      <div className="flex items-center justify-center h-screen text-center mt-8">
        Không tìm thấy sách.
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen pt-20 py-8 px-4">
      <div className="mx-auto px-0 md:px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          <ProductImage book={book} addToCart={addToCart} />

          <div className="lg:w-2/3">
            <ProductBasicInfo book={book} />
            <ProductDetails book={book} />
            <ProductDescription book={book} />
          </div>
        </div>
        <ProductComments
          reviews={reviews}
          averageRating={averageRating}
          ratingsCount={ratingsCount}
          onOpenReviewModal={() => setReviewModalOpen(true)}
        />
      </div>
      {/* Modal đánh giá */}
      {isReviewModalOpen && (
        <ReviewModal
          isOpen={isReviewModalOpen}
          onClose={() => setReviewModalOpen(false)} // Đóng modal
          onSubmit={handleAddReview} // Gửi dữ liệu đánh giá
        />
      )}
    </div>
  );
}

export default ProductDetailPage;
