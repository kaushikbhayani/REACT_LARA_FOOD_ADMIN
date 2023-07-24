import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  IconButton,
  MenuItem,
  Popover,
  Stack,
  Typography,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { styled } from '@mui/material/styles';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import { imageGetStart } from '../Redux/actions';
import Iconify from '../components/iconify/Iconify';
import ProductModal from '../sections/@dashboard/modal/ProductModal';

// ----------------------------------------------------------------------
const Data = [
  {
    id: 1,
    name: 'pizza',
    discount: '10%',
  },
  {
    id: 2,
    name: 'pasta',
    discount: '10%',
  },
  {
    id: 3,
    name: 'magii',
    discount: '10%',
  },
  {
    id: 4,
    name: 'nudels',
    discount: '80%',
  },
  {
    id: 5,
    name: 'margerita',
    discount: '30%',
  },
  {
    id: 6,
    name: 'italian',
    discount: '20%',
  },
  {
    id: 7,
    name: 'pizza',
    discount: '50%',
  },
  {
    id: 8,
    name: 'garlic',
    discount: '10%',
  },
];

const cardHeader = {
  margin: 1,
  marginTop: -2,

  display: 'flex',

  justifyContent: 'space-between',
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(0),
  marginBottom: '10px',
  color: theme.palette.text.secondary,
  borderRadius: '10px',
}));

export default function ProductsPage() {
  // ===========redux===================
  const dispatch = useDispatch();
  const { images, users, loading } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(imageGetStart());
  }, []);

  // ===========redux===================

  const [open, setOpen] = useState(null);
  const [userid, setUserid] = useState();
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const handleOpenMenu = (event, id) => {
    setOpen(event.currentTarget);
    setUserid(id);
  };

  const handleCloseMenu = (id) => {
    alert(id);
    setOpen(null);
    console.log('=========imagefile========>', images);
  };

  return (
    <Container sx={{ marginTop: '15vh', width: '100%' }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Offer Manu
        </Typography>
        <Button onClick={() => handleOpen()} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
          Add Product
        </Button>
      </Stack>

      <Box sx={{ width: '100%' }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {Data.map((item, index) => {
            return (
              <Grid sx={{ display: 'flex', justifyContent: 'center' }} item xs={12} sm={6} md={3}>
                <Item>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardHeader
                      sx={cardHeader}
                      action={
                        <IconButton
                          aria-label="settings"
                          sx={{ marginRight: '-20px' }}
                          onClick={(event) => handleOpenMenu(event, item.id)}
                        >
                          <MoreVertIcon />
                        </IconButton>
                      }
                    />

                    <CardActionArea>
                      <CardMedia component="img" src={require('../Image/product_24.jpg')} alt="green iguana" />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {item.name}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div">
                          Discounte : {item.discount}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Item>
              </Grid>
            );
          })}
        </Grid>
      </Box>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem sx={{ color: 'error.main' }} onClick={() => handleCloseMenu(userid)}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
      <ProductModal modalOpen={modalOpen} handleClose={handleClose} />
    </Container>
  );
}
