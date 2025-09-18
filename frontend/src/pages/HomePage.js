import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import storeData from '../data/storeData';
import { bannerImages, featuredCategories, features } from '../data/homePageData';

// Banner
const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === bannerImages.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full overflow-hidden">
      {/* Carousel */}
      <div className="max-w-7xl mx-auto">
        <div className="relative h-[200px] md:h-[300px]">
          {bannerImages.map((image, index) => (
            <div
              key={index}
              className={`absolute w-full h-full transition-opacity duration-500 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {bannerImages.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'
                }`}
                onClick={() => setCurrentSlide(index)}
              ></button>
            ))}
          </div>
        </div>
      </div>

      {/* Features section */}
      <div className="mt-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex-shrink-0">{feature.svg}</div>
              <div>
                <h4 className="font-semibold text-lg">{feature.title}</h4>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// FeaturedCategories
const FeaturedCategories = () => {
  return (
    <div className="mt-12">
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold">Danh mục nổi bật</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {featuredCategories.map((category, index) => (
            <div
              key={index}
              className="text-center cursor-pointer hover:shadow-lg rounded-lg transition-shadow p-2"
            >
              <img
                src={category.img}
                alt={category.name}
                className="w-full h-auto rounded-lg mb-4"
                draggable="false"
              />
              <h4 className="text-sm md:text-base text-gray-600 font-semibold">{category.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// NewBookList
const NewBookList = () => {
  // Hiển thị 8 cuốn sách đầu tiên
  const books = storeData.slice(0, 8);

  return (
    <div className="mt-12">
      <div className="flex flex-col gap-6">
        <h2 className="text-2xl font-bold">Sách Mới Nhất</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {books.map((book) => (
            <Link to={`/store/product/${book.id}`} key={book.id}>
              <div className="rounded-lg h-full">
                <div className="flex flex-col gap-2">
                  {/* Hình ảnh sách */}
                  <div className="h-48 md:h-64 rounded-lg overflow-hidden">
                    <img
                      src={book.hinhAnh || 'https://via.placeholder.com/128x192'}
                      alt={book.tenSach}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Thông tin sách */}
                  <div className="p-4">
                    <p className="text-gray-400 text-xs">{book.theLoai}</p>
                    <h3 className="font-semibold text-sm">{book.tenSach}</h3>
                    <p className="text-gray-600 text-xs mt-1">
                      {book.danhGia > 0 ? `${book.danhGia} ⭐` : 'Chưa có đánh giá'}
                    </p>
                    <p className="text-blue-600 font-bold text-sm mt-1">
                      {book.donGia.toLocaleString()}đ
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/store"
            className="inline-block px-6 py-2 border-2 border-blue-500 text-blue-500 font-bold rounded-md hover:bg-blue-500 hover:text-white transition-colors"
          >
            Xem Thêm
          </Link>
        </div>
      </div>
    </div>
  );
};

function HomePage() {
  return (
    <div className="w-full md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px] mx-auto px-4 pt-20">
      <Banner />
      <FeaturedCategories />
      <NewBookList />
    </div>
  );
}

export default HomePage;
