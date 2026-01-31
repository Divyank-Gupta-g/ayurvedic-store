import BottomBanner from "../components/banners/BottomBanner";
import MainBanner from "../components/banners/MainBanner";
import NewsLetter from "../components/common/NewsLetter";
import BestSeller from "../components/sections/BestSeller";
import Categories from "../components/sections/Categories";

const Home = () => {
  return (
    <div className="mt-4">
      <MainBanner />
      <Categories />
      <BestSeller />
      <BottomBanner />
      <NewsLetter />
    </div>
  );
};

export default Home;
