import Header from "../../components/Header/Header";
import NaverMap from "../../components/Biking/NaverMap";
import NavBar from "../../components/NavBar/NavBar";
import { useLocation } from "react-router-dom";
import Created from "../../components/Main/Created";
import Creating from "../../components/Main/Creating";
import Backdrop from "../../components/Utils/Backdrop";
import RemainingDistance from "../../components/Biking/RemainingDistance";
import { username } from "../../data/dummy";
import useLocationTracker from "../../hooks/custom/useLocationTracker";
import useMission from "../../hooks/queries/useMission";

const BikePage = () => {
  const { state: level } = useLocation();
  const { location, historyCoords } = useLocationTracker();
  const { isLoading, showCreatedModal, coords } = useMission(location, level);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {isLoading && (
        <Backdrop>
          <Creating />
        </Backdrop>
      )}
      {coords && showCreatedModal && (
        <Backdrop>
          <Created />
        </Backdrop>
      )}
      <div className="flex-grow">
        {location && coords.length !== 0 && (
          <NaverMap location={location} coords={coords} historyCoords={historyCoords} />
        )}
        <div className="absolute top-[80px] w-full px-20 overflow-hidden">
          <RemainingDistance username={username} distance={1} />
        </div>
      </div>
      <NavBar />
    </div>
  );
};

export default BikePage;
