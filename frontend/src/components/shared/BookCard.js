import React from 'react';
import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {
  return (
    <Link to={`/store/product/${book.id}`}>
      <div className="h-full rounded-lg bg-white">
        <div className="flex flex-col gap-2">
          {/* Hình ảnh sách */}
          <div className="h-40 md:h-56 rounded-t-lg overflow-hidden">
            <img
              src={book.hinhAnh || 'https://via.placeholder.com/128x192'}
              alt={book.tenSach}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Thông tin sách */}
          <div className="flex flex-col p-3 md:p-4 gap-1">
            <p className="text-gray-400 text-xs">{book.theLoai}</p>
            <h3 className="font-semibold text-sm">{book.tenSach}</h3>
            <div className="flex items-center gap-1">
                {book.danhGia ? (
                  <>
                    <span className="text-lg font-bold text-[#ED8A19]">{book.danhGia}</span>
                    <img src="/star.svg" alt="star icon" className="w-4 h-auto text-yellow-600" />
                  </>
                ) : (
                  <span>Chưa có đánh giá</span>
                )}
              </div>
            <p className="text-blue-600 font-bold text-sm">{book.donGia.toLocaleString()}đ</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;
