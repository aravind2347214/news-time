// import NewsSearch from "../NewsSearch/NewsSearch";

import { ArrowLeft } from "lucide-react";
import { Button } from "../Button/Button";
import NewsSearch from "../NewsSearch/NewsSearch";
import { useNavigate } from "react-router";
import { setSearchQuery } from "../../store/features/newsSlice";
import { useAppDispatch } from "../../hooks/reduxHooks";
import appLogo from "../../assets/Images/app-logo.png"

interface NewsHeaderProps {
  title: string;
  origin: string;
}



export const NewsHeader: React.FC<NewsHeaderProps> = ({ title,origin }) => {
  const navigate= useNavigate()
  const dispatch = useAppDispatch();
  const handleBackNavigation=()=>{
    dispatch(setSearchQuery(""))
    navigate("/")
  

  }
  return (
    <header
      aria-label="app header"
      className={` flex ${origin==="search"?"flex-col md:flex-row":"flex-row"} gap-2 items-center justify-center sm:justify-between p-5 bg-[#171717]`}
    >

      <div className="flex flex-row gap-3 items-center w-full md:w-fit justify-between sm:justify-left">
      {origin==="search"&&
      <Button
          label="back button"
          className=" p-2 disabled:cursor-not-allowed rounded-full hover:bg-[#ffffff26] cursor-pointer transition duration-100 disabled:opacity-50"
          onClick={() => handleBackNavigation()}
          variant="icon"
        >
          <ArrowLeft
            strokeWidth={3}
            aria-label="back icon"
            className=" text-white"
            width={20}
            height={20}
          />
        </Button>
      }
      
      <div className="flex flex-row gap-2 ">
      <img width={30} src={appLogo} height={30} className="text-white"/>
      <h1
        aria-label="app title"
        className="text-2xl sm:text-3xl font-bold text-white "
      >
        {title}
      </h1>
      </div>
      {origin==="search"&&
       <div className="w-5 h-5">

       </div>
      }


      </div>
        <NewsSearch origin="search" />
    </header>
  );
};
