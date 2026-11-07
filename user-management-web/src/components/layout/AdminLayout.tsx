import { Box, Drawer } from '@mui/material';
import Sidebar from './Sidebar';
import Header from './Header';
import { useState } from 'react';
import { Outlet } from 'react-router';

const AdminLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebar = <Sidebar onNavigate={() => setMobileOpen(false)} />;

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Desktop sidebar */}
      <Drawer
        variant='permanent'
        sx={{
          display: { xs: 'none', md: 'block' },
          width: 238,
          flexShrink: 0,
          '&.MuiDrawer-paper': {
            width: 238,
            boxSizing: 'border-box',
            border: 0,
          },
        }}
      >
        {sidebar}
      </Drawer>

      {/* Mobile sidebar */}
      <Drawer
        variant='temporary'
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '&.MuiDrawer-paper': {
            width: 238,
            boxSizing: 'border-box',
          },
        }}
      >
        {sidebar}
      </Drawer>

      {/* Main content */}
      <Box
        sx={{
          flexGrow: 1,
          minWidth: 0,
          minHeight: '100vh',
          bgcolor: '#f6f7f9',
        }}
      >
        <Header onMenuClick={() => setMobileOpen(true)} />

        <Box component='main' sx={{ p: { xs: 2, sm: 3, md: 3.5 } }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;
