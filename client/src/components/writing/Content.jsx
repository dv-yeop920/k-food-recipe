import React, { useMemo } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { uploadContentImageToS3 } from "../../utils/awsS3Setting";
import styles from "./Writing.module.css";

const Content = ({
  quillRef,
  setTitle,
  content,
  setContent,
  resizeFile,
}) => {
  const imageHandler = async () => {
    const input = document.createElement("input");

    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.addEventListener("change", async () => {
      //이미지를 담아 전송할 file을 만든다
      const file = input.files?.[0];

      try {
        const compressedFile = await resizeFile(file);

        if (compressedFile) {
          const imageUrl = await uploadContentImageToS3(
            compressedFile
          );
          //이미지 업로드 후
          //곧바로 업로드 된 이미지 url을 가져오기
          //useRef를 사용해 에디터에 접근한 후
          //에디터의 현재 커서 위치에 이미지 삽입
          const editor = quillRef.current.getEditor();
          const range = editor.getSelection();
          // 가져온 위치에 이미지를 삽입한다
          editor.insertEmbed(
            range.index,
            "image",
            imageUrl
          );
        }
      } catch (error) {
        console.log(error);
      }
    });
  };

  const formats = [
    "image",
    "video",
    "header",
    "align",
    "bold",
    "size",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "ordered",
    "color",
    "background",
  ];

  const toolbarOptions = [
    ["image"],
    ["video"],
    ["bold"],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ align: [] }],
    [{ size: ["small", false, "large", "huge"] }],
    ["underline"],
    ["strike"],
    ["blockquote"],
    [{ list: "ordered" }],
    [{ list: "bullet" }],
    [{ color: [] }],
    [{ background: [] }],
  ];

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: toolbarOptions,
        handlers: {
          image: imageHandler,
        },
      },
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={styles.writingContainer}>
        <div className="writing-container__column">
          <input
            className={styles.title}
            type="text"
            maxLength="30"
            onChange={e => setTitle(e.target.value)}
            placeholder="제목"
          />
        </div>

        <div className="writing-container__column">
          <ReactQuill
            className="content"
            placeholder="레시피를 공유해 주세요!"
            theme="snow"
            ref={quillRef}
            value={content}
            formats={formats}
            onChange={e => setContent(e)}
            modules={modules}
          />
        </div>
      </div>
    </>
  );
};

export default Content;
