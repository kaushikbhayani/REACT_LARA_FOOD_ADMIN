import { useState } from 'react';

// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// components

import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const initialState = {
  email: '',
  password: '',
  name: '',
};

export default function RegisterForm(prop) {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState(initialState);

  const handleClick = () => {
    console.log('=========>', data);
    prop.submitForm(data);
    // navigate('/dashboard', { replace: true });
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField name="name" label="Name" onChange={handleChange} />

        <TextField name="email" label="Email address" onChange={handleChange} />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
     Register
      </LoadingButton>
    </>
  );
}
