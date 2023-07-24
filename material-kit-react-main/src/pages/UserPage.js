import { Helmet } from 'react-helmet-async';
import { filter, reduce, sample, set } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';

// import { useDispatch, useSelector } from 'react-redux';

// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  TextField,
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CircularProgress from '@mui/material/CircularProgress';
import BasicModal from '../sections/@dashboard/modal/BasicModal';

// components
import AuthUser from '../layouts/AuthUser';
// import { getDataUsersStart } from '../Redux/actions';
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
import Loding from '../sections/@dashboard/modal/Loding';
// mock

import UploadButtons from '../components/btn/UploadButtons';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  // { id: 'isVerified', label: 'Verified', alignRight: false },
  // { id: 'status', label: 'Status', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

const initialState = {
  name: '',
  email: '',
  image:''
};

export default function UserPage() {
  const [userDetails, setUserdetail] = useState([]);

  const USERLIST = userDetails.map((data, index) => ({
    id: data.id,
    avatarUrl: `http://127.0.0.1:8000/images/${data.image}`,
    name: data.name,
    email: data.email,
    // isVerified: data.datatype,
    status: sample(['active', 'banned']),
    role: sample([
      'Leader',
      'Hr Manager',
      'UI Designer',
      'UX Designer',
      'UI/UX Designer',
      'Project Manager',
      'Backend Developer',
      'Full Stack Designer',
      'Front End Developer',
      'Full Stack Developer',
    ]),
  }));

  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');
  const [userEditMode, setUserEditMode] = useState();

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [modalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState(initialState);
  const [lodding, setLodding] = useState(true);

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const [userId, setUserId] = useState();

  const handleOpenMenu = (event, id) => {
    setOpen(event.currentTarget);
    setUserId(id);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };
  // console.log('=============selected=====================>',selected)
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  // ==========================Login Detai start===============================

  const { http, token, logout } = AuthUser();

  const fetchUserDetail = () => {
    http.get('/user').then((res) => {
      if (res) {
        setLodding(false);
        setUserdetail(res.data);
      }
    });
  };

  useEffect(() => {
    fetchUserDetail();
  }, []);

  // const dispatch = useDispatch();
  // const { users, images, loading } = useSelector((state) => state.data);

  // console.log('===========users===============>', userDetails);

  // ============================edit crud================================

  const HandelUpdate = (id) => {
    setUserEditMode(id);
    const filteredUsers = userDetails.find((item) => item.id === id);
    if (filteredUsers) {
      console.log('=========sdsadsaadsad==============>', filteredUsers);
      setData(filteredUsers);
    }
  };

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const HandelEditUpdate = () => {
    console.log('===============daTA===================>', data);
    setUserEditMode(null);
    handleCloseMenu();
  };

  // ==========================Login Detai ===============================
  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      <Container sx={{ my: 15 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            User
          </Typography>
          <Button onClick={() => handleOpen()} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            New User
          </Button>
        </Stack>

        <Card>
          <UserListToolbar
            selectedId={selected}
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, name, role, email, status, avatarUrl } = row;
                    const selectedUser = selected.indexOf(id) !== -1;

                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                        <TableCell padding="checkbox">
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, id)} />
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            {id === userEditMode ? (
                              <Avatar>
                                <UploadButtons />
                              </Avatar>
                            ) : (
                              <Avatar alt={name} src={avatarUrl} />
                            )}
                            {id === userEditMode ? (
                              <Typography variant="subtitle2" noWrap>
                                <TextField
                                  name="name"
                                  label="Standard"
                                  variant="standard"
                                  value={data.name}
                                  onChange={changeHandler}
                                />
                              </Typography>
                            ) : (
                              <Typography variant="subtitle2" noWrap>
                                {name}
                              </Typography>
                            )}
                          </Stack>
                        </TableCell>

                        {id === userEditMode ? (
                          <TableCell align="left">
                            <TextField
                              label="Standard"
                              variant="standard"
                              name="email"
                              value={data.email}
                              onChange={changeHandler}
                            />
                          </TableCell>
                        ) : (
                          <TableCell align="left">{email}</TableCell>
                        )}

                        {id === userEditMode ? (
                          <TableCell align="left">
                            <TextField id="standard-basic" label="Standard" variant="standard" value={role} />
                          </TableCell>
                        ) : (
                          <TableCell align="left"> {role} </TableCell>
                        )}

                        {/* {id === userEditMode ? (
                          <TableCell align="left">
                            <TextField id="standard-basic" label="Standard" variant="standard" value={isVerified} />
                          </TableCell>
                        ) : (
                          <TableCell align="left">{isVerified ? 'Yes' : 'No'}</TableCell>
                        )} */}
                        {/* {id === userEditMode ? (
                          <TableCell align="left">
                            <TextField id="standard-basic" label="Standard" variant="standard" value={status} />
                          </TableCell>
                        ) : (
                          <TableCell align="left">
                            <Label color={(status === 'banned' && 'error') || 'success'}>{sentenceCase(status)}</Label>
                          </TableCell>
                        )} */}
                        {id === userEditMode ? (
                          <TableCell align="left">
                            <CircularProgress size={30} />
                          </TableCell>
                        ) : null}

                        <TableCell align="right">
                          <IconButton size="large" color="inherit" onClick={(event) => handleOpenMenu(event, id)}>
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
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
        <MenuItem onClick={() => HandelUpdate(userId) || handleCloseMenu()}>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }} onClick={() => alert(userId) || handleCloseMenu()}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
        <MenuItem sx={{ color: 'success.main' }} onClick={() => HandelEditUpdate()}>
          <ArrowUpwardIcon sx={{ mr: 2 }} />
          {/* <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} /> */}
          Submit
        </MenuItem>
      </Popover>
      <BasicModal modalOpen={modalOpen} handleClose={handleClose} />
      <Loding lodding={lodding} />
    </>
  );
}
