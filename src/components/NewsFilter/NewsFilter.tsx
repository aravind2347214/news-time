import { useSelector } from "react-redux";
import { setCategory } from "../../store/features/newsSlice";
import { RootState } from "../../store/store";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { fetchNewsByCategory } from "../../api/newsAPI";
import { Button } from "../Button/Button";

interface NewsFilterProps {
  newsCategories: Array<string>;
}

export const NewsFilter: React.FC<NewsFilterProps> = ({ newsCategories }) => {
  const dispatch = useAppDispatch();
  const { selectedCategory, searchQuery } = useSelector(
    (state: RootState) => state.news
  );

  const handleCategoryClick = (category: string) => {
    dispatch(setCategory(category));
    dispatch(fetchNewsByCategory(category));
  };

  return (
    <section className="flex flex-col p-2 ">
      <div
        className={` flex max-w-full gap-2 p-4 overflow-x-auto sm:flex-wrap md:justify-start`}
      >
        {searchQuery.trim() === "" &&
          newsCategories.map((category: string) =>
            selectedCategory === category ? (
              <Button
                variant="primary"
                key={category}
                // onClick={() => handleCategoryClick(category)}
                className=" "
              >
                {category}
              </Button>
            ) : (
              <Button
                variant="outline"
                key={category}
                onClick={() => handleCategoryClick(category)}
                className="px-6 py-2 capitalize border text-xs md:text-sm rounded-full transition duration-100 disabled:opacity-50"
              >
                {category}
              </Button>
            )
          )}

      </div>
    </section>
  );
};
