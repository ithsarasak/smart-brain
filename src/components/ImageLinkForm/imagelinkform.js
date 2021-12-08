import React from "react";
import "./imagelinkform.css";

const ImageLinkForm = ({onChange, onSubmit}) => {
  return (
    <form onSubmit={onSubmit}>
      <p className="f3 white">
        {`This Magic Brain will detect faces in your pictures. Give it a try`}
      </p>
      <div className="center">
        <div className="form center pa4 br3 shadow-5">
          <input
            className="f4 pa2 w-70 center"
            type="text"
            onChange={onChange}
          />
          <button
            className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
            type="submit"
          >
            Detect
          </button>
        </div>
      </div>
    </form>
  );
};

export default ImageLinkForm;
