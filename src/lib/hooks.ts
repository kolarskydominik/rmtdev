import {useEffect, useState} from 'react';
import {JobItemType, JobItemTypeExpanded} from './types';
import {BASE_API_URL} from './constants';

export function useJobItems(searchText: string) {
  const [jobItems, setJobItems] = useState<JobItemType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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

  return {jobItemsSliced, isLoading};
}

export function useJobItem(id: number | null) {
  const [jobItem, setJobItem] = useState<JobItemTypeExpanded | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetch(`${BASE_API_URL}/${id}`);
      const data = await response.json();
      setJobItem(data.jobItem);
      setIsLoading(false);
    };

    fetchData();
  }, [id]);
  
  return {jobItem, isLoading};
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
