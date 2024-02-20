import React, { useRef, useMemo } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styles from "./Writing.module.css";
import { formats, toolbarOptions, imageHandler } from "../../utils/quillEditor";

const UpdateContent = ({ contentProps }) => {
  const {
    originalDetail,
    setOriginalDetail,
    editTitleValue,
    setEditTitleValue,
    editContentValue,
    setEditContentValue,
    resizeFile,
  } = contentProps;

  const updateQuillRef = useRef(null);

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: toolbarOptions,
        handlers: {
          image: () => imageHandler(resizeFile, updateQuillRef),
        },
      },
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeTitle = e => {
    setEditTitleValue(e.target.value);

    return setOriginalDetail({
      ...originalDetail,
      title: e.target.value,
    });
  };

  const onChangeContent = e => {
    setEditContentValue(e);

    return setOriginalDetail({
      ...originalDetail,
      content: e,
    });
  };

  return (
    <>
      <div className={styles.writingContainer}>
        <div className="writing-container__column">
          <input
            className={styles.title}
            type="text"
            value={editTitleValue}
            name={editTitleValue}
            maxLength="20"
            onChange={onChangeTitle}
          />
        </div>

        <div className="writing-container__column">
          <ReactQuill
            className="content"
            ref={updateQuillRef}
            theme="snow"
            value={editContentValue}
            modules={modules}
            formats={formats}
            onChange={onChangeContent}
          />
        </div>
      </div>
    </>
  );
};

export default UpdateContent;
