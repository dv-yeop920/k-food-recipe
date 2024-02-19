import React, { useRef, useMemo } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styles from "./Writing.module.css";
import { formats, toolbarOptions, imageHandler } from "../../utils/quillEditor";

const UpdateContent = ({
  originalDetail,
  setOriginalDetail,
  editTitleValue,
  setEditTitleValue,
  editContentValue,
  setEditContentValue,
  resizeFile,
}) => {
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

  const handelChangeTitle = e => {
    setEditTitleValue(e.target.value);

    return setOriginalDetail({
      ...originalDetail,
      title: e.target.value,
    });
  };

  const handleChangeContent = e => {
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
            onChange={handelChangeTitle}
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
            onChange={handleChangeContent}
          />
        </div>
      </div>
    </>
  );
};

export default UpdateContent;
