import { useSelector } from 'react-redux';
import { NewsHeader } from '../../components/NewsHeader/NewsHeader'
import { NewsList } from '../../components/NewsList/NewsList'
import { RootState } from '../../store/store';

const Search = () => {
    const {searchQuery } = useSelector(
        (state: RootState) => state.news
      );

  return (
        <div>
          <NewsHeader origin='search' title="News Time" />
          <div className={` flex max-w-full gap-2 p-4 overflow-x-auto sm:flex-wrap md:justify-start`}
          >
          {searchQuery.trim() !== "" && (
          <h2 className="text-xl font-semibold">
            Articles related to <strong>'{searchQuery}'</strong>{" "}
          </h2>
        )}
          </div>
          <NewsList origin='search'/>
        </div>
  )
}

export default Search
