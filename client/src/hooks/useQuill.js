import { useMemo } from "react";
import { imageHandler, toolbarOptions } from "utils/quillEditor";

const useQuill = quillRef => {
  const modules = useMemo(() => {
    return {
      toolbar: {
        container: toolbarOptions,
        handlers: {
          image: () => imageHandler(quillRef),
        },
      },
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { modules };
};

export default useQuill;
