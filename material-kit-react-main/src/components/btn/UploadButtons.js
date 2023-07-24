import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

// const initialvalues = {
//   images: '',
//   imagesName: '',
// };

export default function UploadButtons({ SendImageData }) {
  // const [imageFile, setImageFile] = useState(initialvalues);

  const onChangeImage = (e) => {
    // console.log(e.target.files[0].name);
    // setImageFile({
    //   ...imageFile,
    //   images: e.target.files[0],
    //   imagesName: e.target.files[0].name,
    // });

    SendImageData(e.target.files[0]);
  };

  // console.log('===================files===================>', imageFile);
  return (
    <Button variant="contained" component="label" sx={{ width: '100%', height: '100%' }}>
      <CameraAltIcon />
      <input type="file" hidden onChange={onChangeImage} />
    </Button>
  );
}
