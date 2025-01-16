import moment from "moment";
import { News } from "../../types/news";
import { Clock, Image } from "lucide-react";
import { useState, useEffect } from "react";

interface NewsCardProps {
  news: News;
}

// Cache object to store image load status
const imageCache = new Map<string, boolean>();

const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
  const [imageError, setImageError] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    // Reset states when news changes
    setImageError(false);
    setIsImageLoaded(false);

    // Check if image is already cached
    if (news.urlToImage) {
      if (imageCache.has(news.urlToImage)) {
        setIsImageLoaded(true);
      } else {
        // Preload image
        const img = new window.Image();
        img.src = news.urlToImage;
        img.onload = () => {
          imageCache.set(news.urlToImage!, true);
          setIsImageLoaded(true);
        };
        img.onerror = () => {
          setImageError(true);
        };
      }
    }
  }, [news.urlToImage]);

  const shouldHideCard =
    news.title === "[Removed]" &&
    news.source.name === "[Removed]" &&
    news.description === "[Removed]";

  const ImageFallback = () => (
    <div className="w-full bg-gray-100 text-gray-300 flex-col gap-2 flex justify-center items-center h-44 rounded-t-lg">
      <Image width={50} height={50} />
      Image not available
    </div>
  );

  return (
    <a
      href={news.url === "https://removed.com" ? "" : news.url}
      target="_blank"
      aria-label="news article"
      title="Read More"
      rel="noopener noreferrer"
      className={`
        ${shouldHideCard ? "hidden" : "flex"}
        flex-col h-auto max-w-full transition-all duration-300 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl hover:scale-[101%]`}
    >
      {news.urlToImage && !imageError ? (
        <div className="relative w-full h-44">
          <img
            src={news.urlToImage}
            alt="News Image"
            aria-label="news thumbnail image"
            loading="lazy"
            decoding="async"
            onError={() => setImageError(true)}
            className={`
              object-cover w-full rounded-t-lg h-44 mx-auto
              ${isImageLoaded ? "opacity-100" : "opacity-0"}
              transition-opacity duration-300
            `}
          />
          {!isImageLoaded && (
            <div className="absolute inset-0 bg-gray-100 animate-pulse rounded-t-lg" />
          )}
        </div>
      ) : (
        <ImageFallback />
      )}

      <div className="flex flex-col justify-between flex-grow p-4">
        <h1
          aria-label="news title"
          className="mb-2 text-lg font-bold text-gray-800"
        >
          {!news.title || news.title.trim() === ""
            ? "Title not Available"
            : news.title}
        </h1>
        <div
          aria-label="publisher name"
          className="mb-4 text-sm font-bold text-gray-400"
        >
          {!news.source.name || news.source.name.trim() === ""
            ? "Source not Available"
            : news.source.name}
        </div>
        <p
          aria-label="news description"
          className="flex-1 text-sm text-gray-700 max-w-fit line-clamp-5"
        >
          {!news.description || news.description.trim() === ""
            ? "Description not Available"
            : news.description}
        </p>
        <div
          aria-label="published date"
          className="flex flex-row items-center gap-2 mt-3 text-gray-500"
        >
          <Clock aria-hidden="true" width={15} height={15} />
          <div className="text-xs capitalize">
            {moment(news.publishedAt).fromNow()}
          </div>
        </div>
      </div>
    </a>
  );
};

export default NewsCard;
