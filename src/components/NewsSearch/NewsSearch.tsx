import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { useSelector } from "react-redux";
import { setSearchQuery, setSearchResults } from "../../store/features/newsSlice";
import { searchNews } from "../../api/newsAPI";
import { Search } from "lucide-react";
import { RootState } from "../../store/store";
import { Button } from "../Button/Button";
import { useNavigate } from "react-router";

interface NewsSearchProps {
  origin: string;
}

const NewsSearch: React.FC<NewsSearchProps> = () => {
  const dispatch = useAppDispatch();

  const { loading,searchQuery} = useSelector(
    (state: RootState) => state.news
  );

  const [searchTerm, setSearchTerm] = useState(searchQuery);

  const navigate= useNavigate()
  const handleSearch = () => {
    if (searchTerm.trim()) {
      dispatch(setSearchQuery(searchTerm));
      dispatch(searchNews(searchTerm));
      navigate('/search')
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
    setSearchTerm(searchQuery); // Update input when searchQuery changes
  }, [searchQuery]);

  useEffect(() => {
    if (searchTerm === "") {
      dispatch(setSearchQuery(""));
      dispatch(setSearchResults([]));
      navigate("/")
    }
  }, [searchTerm]);

  return (
    <div
      aria-label="search container"
      className={` flex flex-row justify-between items-center p-2 pl-6 bg-[#bababa3d] rounded-full w-full lg:w-4/6`}
    >
      <input
        aria-label="search input"
        className="text-white bg-transparent outline-none w-full"
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
          className="text-white "
          width={20}
          height={20}
        />
      </Button>
    </div>
  );
};

export default NewsSearch;
