import Skeleton from 'react-loading-skeleton'
interface LoadingShimmerProps{
    count:number
}

const LoadingShimmer:React.FC<LoadingShimmerProps> = ({count}) => {
  return (
    <section
    data-testid='loader'
    aria-label='loader'
    aria-busy={true}
    className="max-h-[75vh] flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 overflow-y-auto">
    {Array(count).fill(0).map((_, index) => (
      <div data-testid='skeleton-container' key={index} className="p-2 border rounded-md">
        <Skeleton height={160} />
        <Skeleton height={30} />
        <Skeleton width={100} />
        <Skeleton height={10} />
        <Skeleton height={10} />
        <Skeleton height={10} />
        <Skeleton width={50} />
      </div>
    ))}
  </section>
  )
}

export default LoadingShimmer
