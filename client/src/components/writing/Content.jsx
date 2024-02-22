import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styles from "./Writing.module.css";
import { formats } from "../../utils/quillEditor";
import useQuill from "../../hooks/useQuill";

const Content = ({ titleRef, quillRef }) => {
  const { modules } = useQuill(quillRef);

  return (
    <div className={styles.writingContainer}>
      <div className="writing-container__column">
        <input
          className={styles.title}
          type="text"
          maxLength="30"
          ref={titleRef}
          placeholder="제목"
        />
      </div>

      <div className="writing-container__column">
        <ReactQuill
          placeholder="레시피를 공유해 주세요!"
          theme="snow"
          className="content"
          ref={quillRef}
          formats={formats}
          modules={modules}
        />
      </div>
    </div>
  );
};

export default Content;
