import { useRef } from "react";
import styles from "./Writing.module.scss";
import { formats } from "utils/quillEditor";
import useQuill from "hooks/useQuill";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const UpdateContent = ({ contentProps }) => {
  const {
    originalDetail,
    setOriginalDetail,
    editTitleValue,
    setEditTitleValue,
    editContentValue,
    setEditContentValue,
  } = contentProps;

  const updateQuillRef = useRef(null);
  const { modules } = useQuill(updateQuillRef);

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
  );
};

export default UpdateContent;
