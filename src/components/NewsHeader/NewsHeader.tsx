import NewsSearch from "../NewsSearch/NewsSearch";

interface NewsHeaderProps {
  title: string;
}

export const NewsHeader: React.FC<NewsHeaderProps> = ({ title }) => {
  return (
    <header
      aria-label="app header"
      className=" flex flex-row items-center justify-center sm:justify-between p-5 bg-[#171717]"
    >
      <h1
        aria-label="app title"
        className="text-2xl sm:text-3xl font-bold text-white "
      >
        {title}
      </h1>
      <NewsSearch origin="news-header" />
    </header>
  );
};
