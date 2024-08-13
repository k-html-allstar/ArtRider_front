import Header from "../../components/Header/Header";
import NavBar from "../../components/NavBar/NavBar";

const MainPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">
        {/* 여기에 메인 콘텐츠. */}
      </div>
      <NavBar />
    </div>
  );
}

export default MainPage;
