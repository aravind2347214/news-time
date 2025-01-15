import { News } from "../../types/news";

interface NewsCardProps {
    news: News;
  }
  const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
    return (
      <a
        href={news.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex border flex-col rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300 max-w-full h-auto"
      >
        <img
          src={news.urlToImage}
          alt="News Image"
          className="rounded-t-lg w-full h-40 object-cover"
        />
        <div className="p-4 flex flex-col justify-between flex-grow">
          <h1 className="font-bold text-lg mb-2 text-gray-800">{news.title}</h1>
          <div className="text-sm font-medium text-gray-600 mb-4">{news.publisher}</div>
          <p className="max-w-fit  flex-1 text-sm text-gray-700">{news.description}</p>
        </div>
      </a>
    );
  };

export default NewsCard;
