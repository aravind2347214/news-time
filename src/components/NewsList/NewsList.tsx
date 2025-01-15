import { News } from "../../types/news"
import NewsCard from "../NewsCard/NewsCard"
interface NewsListProps{
    newsList:News[]
}

export const NewsList : React.FC<NewsListProps> = ({newsList})=>{
    return(
        <section className="scroll-mb-2 max-h-[75vh] flex-1 overflow-y-auto  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
        {/* Single News Card */}
        {newsList.map((news: News) => (
          <NewsCard key={news.id} news={news} />
        ))}
      </section>
    )
}