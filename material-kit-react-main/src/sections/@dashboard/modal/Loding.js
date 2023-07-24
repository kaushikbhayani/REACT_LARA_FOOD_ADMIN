import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { CircularProgress } from '@mui/material';

const style = {
  height: '100%',
  width: '100%',
  display: 'flex',
  textAlign: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
};

export default function BasicModal(prop) {


  return (
    <div>
      <Modal
        open={prop.lodding}

        // aria-labelledby="modal-modal-title"
        // aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="span">
            <CircularProgress />
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
