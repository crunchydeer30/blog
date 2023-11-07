import { useQuery } from "@tanstack/react-query";
import apiTopics from "../../topics/api/apiTopics";
import { useEffect } from "react";
import { errorToats } from "../../../utils";
import { queryToQueryKey } from "../../../utils";
import { TopicQueryParams } from "../../topics/types";

const useSearchTopics = (query: TopicQueryParams = {}) => {
  const {isLoading, data: topics, error} = useQuery({
    queryKey: ['search', 'topics', ...queryToQueryKey(query)],
    queryFn: async () => await apiTopics.getAll(query),
  });

  useEffect(() => {
    if (error) errorToats(error);
  }, [error]);

  return {
    isLoading,
    error,
    topics,
  };
}

export default useSearchTopics;