import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import apiBookmarks from "../api/apiBookmarks";
import { errorToats } from "../../../utils";

const useCreateBookmark = () => {
  const queryClient = useQueryClient();
  
  const { mutate: createBookmark, isPending: isLoading, error} = useMutation({
    mutationFn: apiBookmarks.create,
    onSuccess: () => {
      toast.success('Bookmark added');
      queryClient.invalidateQueries({queryKey: ['bookmarks']});
      queryClient.invalidateQueries({queryKey: ['bookmarksIDs']});
    },
    onError: (e) => {
      errorToats(e);
    }
  });

  return {createBookmark, error, isLoading};
}

export default useCreateBookmark;
