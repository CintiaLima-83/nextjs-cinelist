import '@testing-library/jest-dom';

jest.mock("swiper/react", () => ({
  Swiper: ({ children }) => <div className="mock-swiper">{children}</div>,
  SwiperSlide: ({ children }) => <div className="mock-swiper-slide">{children}</div>,
}));

jest.mock("swiper/modules", () => ({
  Autoplay: {},
}));
