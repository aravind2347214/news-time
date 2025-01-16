import { useEffect } from 'react';
import { NewsFilter } from '../components/NewsFilter/NewsFilter';
import { NewsList } from '../components/NewsList/NewsList';
import { NewsHeader } from '../components/NewsHeader/NewsHeader';
import { useAppDispatch } from '../hooks/reduxHooks';
import { fetchNewsByCategory } from '../api/newsAPI';
import { newsCategories } from '../assets/Constants/newsCategories';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';


function Home() {
  const dispatch = useAppDispatch();
  const { selectedCategory} = useSelector((state: RootState) => state.news);


  useEffect(() => {
    dispatch(fetchNewsByCategory(selectedCategory || 'general'));
  }, []);

  return (
    <div>
      <NewsHeader title="News App" />
      <NewsFilter newsCategories={newsCategories} />
      <NewsList />
    </div>
  );
}

export default Home;