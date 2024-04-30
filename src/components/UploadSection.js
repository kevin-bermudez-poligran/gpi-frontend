/* eslint-disable react/prop-types*/
import React, { useState } from 'react';

const UploadSection = props => {
  const [file, setFile] = useState(props.defaultPreview || null);

  const handleOnChange = event => {
    if (event.target.files[0]) {
      setFile(URL.createObjectURL(event.target.files[0]));
      if (props.onChange) {
        props.onChange(event);
      }
      return;
    }
    setFile(null);
    props.onChange(null);
  };

  return (
    <div className="row m-0 upload-section" style={{ width: '100%' }}>
      <figure
        className="upload-section__preview-container col-12  text-center"
        style={{ width: '100%' }}
      >
        {file ? (
          <img src={file} className="upload-section__preview" alt="" style={{ maxWidth: '100%' }} />
        ) : (
          ''
        )}
      </figure>
      <div className="col-12 text-center">
        <input type="file" onChange={handleOnChange} />
      </div>
    </div>
  );
};

export default UploadSection;
