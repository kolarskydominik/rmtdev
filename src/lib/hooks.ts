import {useEffect, useState} from 'react';
import {JobItemType} from './types';

export function useJobItems(searchText: string) {
  const [jobItems, setJobItems] = useState<JobItemType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!searchText) return;
    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetch(`https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=${searchText}`);
      const data = await response.json();

      setJobItems(data.jobItems);
      setIsLoading(false);
    };

    fetchData();
  }, [searchText]);

  return {jobItems, isLoading};
}
