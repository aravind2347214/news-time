import { newsCategories, newsList } from "../data/newsData";
import { NewsList } from "../components/NewsList/NewsList";
import { NewsFilter } from "../components/NewsFilter/NewsFilter";
import { NewsHeader } from "../components/NewsHeader/NewsHeader";

function Home() {
  return (
    <div>
      {/* Header section */}
      <NewsHeader title="News Title"/>

      {/* Filter Section */}
      <NewsFilter newsCategories={newsCategories}/>

      {/* News Catalogue Section */}
      <NewsList newsList={newsList}/>
    </div>
  );
}

export default Home;
