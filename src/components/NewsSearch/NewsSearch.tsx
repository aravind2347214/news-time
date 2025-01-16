import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { useSelector } from "react-redux";
import { setSearchQuery } from "../../store/features/newsSlice";
import { fetchNewsByCategory, searchNews } from "../../api/newsAPI";
import { Search } from "lucide-react";
import { RootState } from "../../store/store";
import { Button } from "../Button/Button";

interface NewsSearchProps {
  origin: string;
}

const NewsSearch: React.FC<NewsSearchProps> = ({ origin }) => {
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const { loading, selectedCategory } = useSelector(
    (state: RootState) => state.news
  );

  const handleSearch = () => {
    if (searchTerm.trim()) {
      dispatch(setSearchQuery(searchTerm));
      dispatch(searchNews(searchTerm));
    } else {
      alert("Please enter a topic");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    if (searchTerm === "") {
      dispatch(setSearchQuery(""));
      dispatch(fetchNewsByCategory(selectedCategory));
    }
  }, [searchTerm]);

  return (
    <div
      aria-label="search container"
      className={`${
        origin === "news-header" ? "hidden sm:flex" : "flex sm:hidden w-full"
      } flex-row justify-between items-center p-2 pl-6 bg-[#bababa3d] rounded-full w-3/5 lg:w-4/6`}
    >
      <input
        aria-label="search input"
        className="text-black sm:text-white bg-transparent outline-none w-full"
        placeholder="Search news..."
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={loading}
      />
      <Button
        label="search button"
        className=" p-2 disabled:cursor-not-allowed rounded-full hover:bg-[#ffffff26] cursor-pointer transition duration-100 disabled:opacity-50"
        onClick={handleSearch}
        variant="icon"
        disabled={loading || !searchTerm.trim()}
      >
        <Search
          strokeWidth={3}
          aria-label="search icon"
          className=" text-black sm:text-white "
          width={20}
          height={20}
        />
      </Button>
    </div>
  );
};

export default NewsSearch;
