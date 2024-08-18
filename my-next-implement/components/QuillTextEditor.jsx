import React, { useState } from "react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});
import "react-quill/dist/quill.snow.css"; // Import Quill's CSS for styling

const QuillTextEditor = ({ theme = "snow" }) => {
  const [value, setValue] = useState("");
  const quillRef = React.useRef(null);

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    ["link", "image", "video"],

    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    // [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ];

  const modules = {
    // imageResize: {
    //   modules: ["Resize", "DisplaySize", "Toolbar"],
    // },
    toolbar: toolbarOptions,
  };

  console.log("contents", value);

  return (
    <div>
      <ReactQuill
        ref={quillRef}
        theme={theme}
        value={value}
        onChange={setValue}
        placeholder="Write something..."
        modules={modules}
      />
    </div>
  );
};

export default QuillTextEditor;
