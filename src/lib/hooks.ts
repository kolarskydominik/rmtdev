import {useEffect, useState} from 'react';
import {JobItemType, JobItemTypeExpanded} from './types';
import {BASE_API_URL} from './constants';
import {useQuery} from '@tanstack/react-query';

export function useJobItems(searchText: string) {
  const [jobItems, setJobItems] = useState<JobItemType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const totalNumberOfResults = jobItems.length;
  const jobItemsSliced = jobItems.slice(0, 7);

  useEffect(() => {
    if (!searchText) return;
    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetch(`${BASE_API_URL}?search=${searchText}`);
      const data = await response.json();

      setJobItems(data.jobItems);
      setIsLoading(false);
    };

    fetchData();
  }, [searchText]);

  return {jobItemsSliced, isLoading, totalNumberOfResults};
}
type JobItemApiResponse = {
  public: boolean;
  jobItem: JobItemTypeExpanded;
};
const fetchJobItem = async (id: number): Promise<JobItemApiResponse> => {
  const response = await fetch(`${BASE_API_URL}/${id}`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.description);
  }

  return await response.json();
};
export function useJobItem(id: number | null) {
  const {data, isInitialLoading} = useQuery(['job-item', id], () => (id ? fetchJobItem(id) : null), {
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!id,
    onError: (error) => {
      console.log(error);
    },
  });
  return {jobItem: data?.jobItem, isLoading: isInitialLoading};
}

export function useActiveId() {
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    const handleHashchange = () => {
      const id = window.location.hash.slice(1);
      setActiveId(+id);
    };
    handleHashchange();

    window.addEventListener('hashchange', () => handleHashchange());

    return () => window.removeEventListener('hashchange', () => handleHashchange());
  }, []);

  return activeId;
}

export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(timerId);
  }, [value, delay]);

  return debouncedValue;
}
