import { useEffect } from 'react';
import { NewsFilter } from '../..//components/NewsFilter/NewsFilter';
import { NewsList } from '../../components/NewsList/NewsList';
import { NewsHeader } from '../../components/NewsHeader/NewsHeader';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { fetchNewsByCategory } from '../../api/newsAPI';
import { newsCategories } from '../../assets/Constants/newsCategories';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setSearchQuery } from '../../store/features/newsSlice';


function Home() {
  const dispatch = useAppDispatch();
  const { selectedCategory} = useSelector((state: RootState) => state.news);


  useEffect(() => {
    dispatch(fetchNewsByCategory(selectedCategory || 'general'));
    dispatch(setSearchQuery(""))
  }, []);

  return (
    <div>
      <NewsHeader origin='home' title="News Time" />
      <NewsFilter newsCategories={newsCategories} />
      <NewsList origin='home'/>
    </div>
  );
}

export default Home;