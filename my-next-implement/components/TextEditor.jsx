import dynamic from "next/dynamic";
import React, { useMemo, useRef, useState } from "react";

const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
});

export const TextEditor = ({}) => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const placeholder = "Typing.............";
  console.log("content data", content);

  const initialValue = {
    // readonly: true,
    placeholder: placeholder || "Start typings...",
    toolbarAdaptive: false, // Ensure the toolbar doesn't collapse
    toolbarSticky: false, // Toolbar will stick to the top of the editor
    fullsize: true, // Start in full-screen mode
    uploader: {
      insertImageAsBase64URI: true, // This will insert the image as base64
      imagesExtensions: ["jpg", "png", "jpeg", "gif"], // Allowed extensions
      filesVariableName: "files",
      isSuccess(response) {
        return response && response.length > 0; // Handle the success response
      },
      process: (response) => {
        // Process the response and return it as base64 strings
        return {
          files: response.files.map((file) => file.base64), // Assuming response contains base64 strings
        };
      },
    },
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const config = useMemo(() => initialValue, [placeholder]);

  return (
    <JoditEditor
      ref={editor}
      value={content}
      config={config}
      // tabIndex={1} // tabIndex of textarea

      onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
      onChange={(newContent) => {}}
    />
  );
};
