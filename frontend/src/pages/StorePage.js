import React, { useState } from 'react';
import storeData from '../data/storeData';
import BookCard from '../components/shared/BookCard';
import { FiFilter } from 'react-icons/fi';

const StorePage = () => {
  const [displayedBooks, setDisplayedBooks] = useState(storeData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [sortOrder, setSortOrder] = useState('default');
  const [isFilterVisible, setFilterVisible] = useState(false); // Trạng thái hiển thị bộ lọc
  const handleFilterToggle = () => setFilterVisible((prev) => !prev);

  const genres = [...new Set(storeData.map((book) => book.theLoai))]; // Tạo danh sách các thể loại sách duy nhất từ dữ liệu storeData

  // Xử lý tìm kiếm
  const handleSearch = (e) => {
    // 1. Lấy từ khóa từ input
    const term = e.target.value.toLowerCase();

    // 2. Cập nhật state searchTerm
    setSearchTerm(term);

    // 3. Lọc kết quả và lưu vào biến results
    const results = storeData.filter(
      (book) =>
        book.tenSach.toLowerCase().includes(term) || book.tacGia.toLowerCase().includes(term)
    );

    // 4. Cập nhật state displayedBooks với kết quả mới
    setDisplayedBooks(results);
  };

  // Hàm xử lý lọc theo đánh giá
  const handleRatingFilter = (rating) => {
    setSelectedRatings((prev) => {
      const newRatings = prev.includes(rating)
        ? prev.filter((r) => r !== rating) // Nếu đã chọn, bỏ chọn
        : [...prev, rating]; // Nếu chưa chọn, thêm vào mảng chọn

      // Lọc sách dựa trên đánh giá (từ rating trở lên)
      const filteredBooks = storeData.filter((book) => {
        const ratingMatch =
          newRatings.length > 0 ? newRatings.some((r) => book.danhGia >= r) : true;
        const priceMatch =
          selectedPriceRanges.length > 0
            ? selectedPriceRanges.some((r) => {
                switch (r) {
                  case '0-100k':
                    return book.donGia <= 100000;
                  case '100k-200k':
                    return book.donGia > 100000 && book.donGia <= 200000;
                  case '200k+':
                    return book.donGia > 200000;
                  default:
                    return true;
                }
              })
            : true;
        const genreMatch = selectedGenres.length > 0 ? selectedGenres.includes(book.theLoai) : true;
        const searchMatch = book.tenSach.toLowerCase().includes(searchTerm.toLowerCase());

        return ratingMatch && priceMatch && genreMatch && searchMatch; // Lọc sách thỏa mãn tất cả điều kiện
      });

      setDisplayedBooks(filteredBooks); // Cập nhật danh sách sách hiển thị
      return newRatings;
    });
  };

  // Hàm xử lý lọc theo giá
  const handlePriceFilter = (range) => {
    setSelectedPriceRanges((prev) => {
      const newRanges = prev.includes(range) ? prev.filter((r) => r !== range) : [...prev, range];

      // Filter books based on price and other filters (rating, genre, searchTerm)
      const filteredBooks = storeData.filter((book) => {
        const priceMatch =
          newRanges.length > 0
            ? newRanges.some((r) => {
                switch (r) {
                  case '0-100k':
                    return book.donGia <= 100000;
                  case '100k-200k':
                    return book.donGia > 100000 && book.donGia <= 200000;
                  case '200k+':
                    return book.donGia > 200000;
                  default:
                    return true;
                }
              })
            : true;
        const ratingMatch =
          selectedRatings.length > 0 ? selectedRatings.some((r) => book.danhGia >= r) : true;
        const genreMatch = selectedGenres.length > 0 ? selectedGenres.includes(book.theLoai) : true;
        const searchMatch = book.tenSach.toLowerCase().includes(searchTerm.toLowerCase());

        return priceMatch && ratingMatch && genreMatch && searchMatch;
      });

      setDisplayedBooks(filteredBooks);

      return newRanges;
    });
  };

  // Hàm xử lý lọc theo thể loại
  const handleGenreFilter = (genre) => {
    setSelectedGenres((prev) => {
      const newGenres = prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre];

      // Filter books based on genre and other filters (rating, price, searchTerm)
      const filteredBooks = storeData.filter((book) => {
        const genreMatch = newGenres.length > 0 ? newGenres.includes(book.theLoai) : true;
        const priceMatch =
          selectedPriceRanges.length > 0
            ? selectedPriceRanges.some((r) => {
                switch (r) {
                  case '0-100k':
                    return book.donGia <= 100000;
                  case '100k-200k':
                    return book.donGia > 100000 && book.donGia <= 200000;
                  case '200k+':
                    return book.donGia > 200000;
                  default:
                    return true;
                }
              })
            : true;
        const ratingMatch =
          selectedRatings.length > 0 ? selectedRatings.some((r) => book.danhGia >= r) : true;
        const searchMatch = book.tenSach.toLowerCase().includes(searchTerm.toLowerCase());

        return genreMatch && priceMatch && ratingMatch && searchMatch;
      });

      setDisplayedBooks(filteredBooks);

      return newGenres;
    });
  };

  // Hàm xử lý thay đổi thứ tự sắp xếp
  const handleSortOrderChange = (e) => {
    const newSortOrder = e.target.value;
    setSortOrder(newSortOrder); // Cập nhật thứ tự sắp xếp

    let sortedBooks = [...displayedBooks]; // Tạo bản sao danh sách sách hiển thị

    // Sắp xếp sách theo tên (A-Z hoặc Z-A)
    if (newSortOrder === 'nameAsc') {
      sortedBooks.sort((a, b) => a.tenSach.localeCompare(b.tenSach));
    } else if (newSortOrder === 'nameDesc') {
      sortedBooks.sort((a, b) => b.tenSach.localeCompare(a.tenSach));
    } else {
      sortedBooks = [...storeData]; // Nếu không sắp xếp, trả lại danh sách gốc
    }

    //Áp dụng lại các bộ lọc sau khi sắp xếp
    const filteredBooks = sortedBooks.filter((book) => {
      const ratingMatch =
        selectedRatings.length > 0 ? selectedRatings.some((r) => book.danhGia >= r) : true;
      const priceMatch =
        selectedPriceRanges.length > 0
          ? selectedPriceRanges.some((r) => {
              switch (r) {
                case '0-100k':
                  return book.donGia <= 100000;
                case '100k-200k':
                  return book.donGia > 100000 && book.donGia <= 200000;
                case '200k+':
                  return book.donGia > 200000;
                default:
                  return true;
              }
            })
          : true;
      const genreMatch = selectedGenres.length > 0 ? selectedGenres.includes(book.theLoai) : true;
      const searchMatch = book.tenSach.toLowerCase().includes(searchTerm.toLowerCase());

      return ratingMatch && priceMatch && genreMatch && searchMatch;
    });

    setDisplayedBooks(filteredBooks);
  };

  return (
    <div className="w-full md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px] mx-auto px-4 pt-20">
      <div className="flex flex-row md:flex-row gap-8">
        {/* Sidebar Filters */}
        <div
          className={`fixed text-lg top-0 left-0 h-full bg-white w-[200px] z-50 p-4 shadow-lg transition-transform transform ${
            isFilterVisible ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 md:static md:w-1/4`}
        >
          <div className="mb-4">
            <h3 className="font-bold mb-2">Đánh giá</h3>
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center">
                <input
                  type="checkbox"
                  id={`rating-${rating}`}
                  checked={selectedRatings.includes(rating)}
                  onChange={() => handleRatingFilter(rating)}
                  className="mr-2 h-4 w-4"
                />
                <label htmlFor={`rating-${rating}`} className="flex items-center">
                  {Array.from({ length: rating }).map((_, index) => (
                    <img
                      key={index}
                      src="/star.svg"
                      alt="star icon"
                      className="w-4 h-auto text-yellow-600 mr-1"
                    />
                  ))}
                  {rating !== 5 && <span className="ml-1">trở lên</span>}
                </label>
              </div>
            ))}
          </div>

          <div className="mb-4">
            <h3 className="font-bold mb-2">Giá</h3>
            {['0-100k', '100k-200k', '200k+'].map((range) => (
              <div key={range} className="flex items-center">
                <input
                  type="checkbox"
                  id={`price-${range}`}
                  checked={selectedPriceRanges.includes(range)}
                  onChange={() => handlePriceFilter(range)}
                  className="mr-2 h-4 w-4"
                />
                <label htmlFor={`price-${range}`}>{range}</label>
              </div>
            ))}
          </div>

          <div className="mb-4">
            <h3 className="font-bold mb-2">Thể loại</h3>
            {genres.map((genre) => (
              <div key={genre} className="flex items-center">
                <input
                  type="checkbox"
                  id={`genre-${genre}`}
                  checked={selectedGenres.includes(genre)}
                  onChange={() => handleGenreFilter(genre)}
                  className="mr-2 h-4 w-4"
                />
                <label htmlFor={`genre-${genre}`}>{genre}</label>
              </div>
            ))}
          </div>

          <div>
            <h3 className="font-bold mb-2">Sắp xếp</h3>
            <select
              value={sortOrder}
              onChange={handleSortOrderChange}
              className="w-full p-2 border rounded"
            >
              <option value="default">Mặc định</option>
              <option value="nameAsc">Tên A-Z</option>
              <option value="nameDesc">Tên Z-A</option>
            </select>
          </div>
          <button
            onClick={handleFilterToggle}
            className="w-full block mt-4 bg-red-500 text-white p-2 rounded md:hidden"
          >
            Đóng
          </button>
        </div>

        {/* Main Content */}
        <div className="w-full md:w-3/4">
          {/* Search Bar */}
          <div className="flex items-center gap-2 mb-4">
            <button
              onClick={handleFilterToggle}
              aria-label="Open Filters"
              className="p-2 mb-4 bg-gray-100 rounded-full flex items-center justify-center md:hidden"
            >
              <FiFilter size={24} />
            </button>
            <input
              type="text"
              placeholder="Tìm kiếm sách..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full px-4 py-2 border border-gray-300
              rounded-lg focus:outline-none focus:border-blue-500 mb-4"
            />
          </div>

          {displayedBooks.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {displayedBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">Không tìm thấy sách phù hợp.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StorePage;
