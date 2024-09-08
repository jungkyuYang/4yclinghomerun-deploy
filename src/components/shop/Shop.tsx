import { items, mainItem } from '@/mocks/home/ShopItem';

const Shop = () => {
  return (
    <>
      {/* <div className="h-screen w-full bg-black px-48 py-16 text-white"> */}
        <div className="mb-6 flex justify-between">
          <h2 className="text-4xl">Shop</h2>
          {/* 공통스타일 추후 합쳐서 빼기 - transition 효과 */}
          <button className="w-32 border py-3 transition-colors duration-300 hover:bg-white hover:text-black">
            더보기
          </button>
        </div>
        <div className="m-auto max-w-[1500px]">
          {/* 추후 반응형 논의 - xl */}
          <ul className="flex justify-between gap-4 xl:gap-8">
            {/* 메인 아이템 */}
            <li className="relative w-1/2">
              <img
                className="h-full w-full object-cover"
                src={mainItem.src}
                alt="shop item"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70 opacity-0 transition-opacity duration-300 hover:cursor-pointer hover:opacity-100">
                <h3 className="text-2xl">{mainItem.title}</h3>
                <h4 className="text-md">{mainItem.price}</h4>
              </div>
            </li>

            {/* 나머지 */}
            <li className="flex w-1/2">
              <ul className="flex w-full flex-wrap gap-4 xl:gap-8">
                {items.map((item, index) => (
                  <li
                    className="relative aspect-square flex-[1_1_40%]"
                    key={index}
                  >
                    <img
                      className="h-full w-full object-cover"
                      src={item.src}
                      alt={`shop item ${index + 2}`}
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 hover:cursor-pointer hover:opacity-100">
                      <h3 className="text-2xl">{item.title}</h3>
                      <h4 className="text-md">{item.price}</h4>
                    </div>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      {/* </div> */}
    </>
  );
};

export default Shop;
