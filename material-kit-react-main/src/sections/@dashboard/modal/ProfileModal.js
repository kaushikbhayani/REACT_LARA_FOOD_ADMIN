import * as React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Modal from '@mui/material/Modal';

import CloseIcon from '@mui/icons-material/Close';
import { AppBar, Avatar, Grid, Stack, TextField, Typography } from '@mui/material';
import UploadButtons from '../../../components/btn/UploadButtons';

const style = {
  position: 'relative',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  overflow: 'auto',
  '&::-webkit-scrollbar': { display: 'none' },
  p: 4,
};

export default function ProfileModal(prop) {
  const [imageFile, setImageFile] = React.useState();
  // const [textValue, setTextValue] = React.useState();

  // const onTextChange = (e) => setTextValue(e.target.value);
  // const handleSubmit = () => prop.handleClose();
  // const handleReset = () => setTextValue('');

  const SendImageData = (e) => {
    setImageFile(e);
  };
  const HandleUpdate = () => {
    console.log('=======emage data==========>', imageFile);
  };

  return (
    <>
      <Modal
        sx={{ display: 'flex', py: '5vh' }}
        open={prop.modalOpen}
        onClose={() => prop.handleClose()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ marginTop: '10vh', justifyContent: 'center', textAlign: 'center' }}>
            <AppBar sx={{ justifyContent: 'center', textAlign: 'center', position: 'fixed' }}>
              <Grid container p={1} m={0}>
                <Grid item xs={6} display="flex" justifyContent="left">
                  <Avatar sx={{ backgroundColor: 'transparent' }}>
                    <UploadButtons SendImageData={SendImageData} />
                  </Avatar>
                </Grid>
                <Grid item xs={6} display="flex" justifyContent="right">
                  <Avatar sx={{ backgroundColor: 'transparent' }}>
                    <Button
                      onClick={() => prop.handleClose()}
                      variant="contained"
                      sx={{ width: '100%', height: '100%', color: '#fff' }}
                    >
                      <CloseIcon />
                    </Button>
                  </Avatar>
                </Grid>
              </Grid>
            </AppBar>

            <Stack direction="row" justifyContent="center">
              <Avatar src={`http://127.0.0.1:8000/images/${prop.userdetail.image}`} alt="photoURL" />
            </Stack>

            <Typography my="10vh" variant="subtitle1">
              CREATE NEW USER
            </Typography>
            <div>
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={12} sm={6}>
                  <TextField type="text" label="Name:" variant="outlined" value={prop.userdetail.name} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField type="text" label="Company:" variant="outlined" value={prop.userdetail.email} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField type="text" label="Role:" variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField type="text" label="veryfied:" variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField type="text" label="Status:" variant="outlined" />
                </Grid>
              </Grid>
              <Button variant="contained" color="primary" sx={{ marginTop: '5vh' }} onClick={() => HandleUpdate()}>
                Submit
              </Button>
            </div>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
