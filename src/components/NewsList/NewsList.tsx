import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import NewsCard from "../NewsCard/NewsCard";
import "react-loading-skeleton/dist/skeleton.css";
import LoadingShimmer from "../LoadingShimmer/LoadingShimmer";
import { PackageOpen } from "lucide-react";

interface NewsListProps{
  origin:string
}

export const NewsList: React.FC<NewsListProps> = ({origin}) => {
  const { articles, loading, error, searchQuery,searchResults } = useSelector(
    (state: RootState) => state.news
  );

  if (loading) {
    return <LoadingShimmer count={20} />;
  }

  if (error && searchQuery.trim() !== "" && origin ==="search") {
    return (
      <div
        aria-label="search result failed"
        className="flex items-center justify-center h-[50vh]"
      >
        <div className="p-4 text-center  ">
          <PackageOpen
            strokeWidth={1}
            className="mx-auto text-gray-300"
            width={100}
            height={100}
          />
          {searchQuery && (
            <p
              aria-label="search result failed message"
              className="text-gray-300 mt-2 font-semibold"
            >
              No Articles on "{searchQuery}"
            </p>
          )}
        </div>
      </div>
    );
  }


  if(origin==="home"){
    return (
      <section
        aria-label="news list"
        className="max-h-[75vh] flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 overflow-y-auto"
      >
        {articles.map((news, index) => (
          <NewsCard key={index} news={news} />
        ))}
      </section>
    );
  }

  if(origin==="search"){
    return (
      <section
        aria-label="news list"
        className="max-h-[75vh] flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 overflow-y-auto"
      >
        {searchResults.map((news, index) => (
          <NewsCard key={index} news={news} />
        ))}
      </section>
    );
  }
};
