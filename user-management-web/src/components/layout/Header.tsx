import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useLocation, useNavigate } from 'react-router';
import { useLogout } from '../../hooks/useAuth';
import LogoutIcon from '@mui/icons-material/Logout';

type Props = {
  onMenuClick: () => void;
};

const breadcrumbs: Record<string, { section: string; page: string }> = {
  '/dashboard': { section: 'Overview', page: 'Dashboard' },
  '/users': { section: 'Management', page: 'Users' },
  '/roles': { section: 'Management', page: 'Roles & Permissions' },
  '/teams': { section: 'Management', page: 'Teams' },
  '/audit-logs': { section: 'Management', page: 'Audit Logs' },
  '/settings': { section: 'System', page: 'Settings' },
};

const Header = ({ onMenuClick }: Props) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        navigate('/login', { replace: true });
      },
    });
  };

  const breadcrumb = breadcrumbs[pathname] ?? {
    section: 'Error',
    page: 'Page Not Found',
  };

  return (
    <AppBar
      position='static'
      elevation={0}
      sx={{
        bgcolor: '#fff',
        color: '#111827',
        borderBottom: '1px solid #e5e7eb',
      }}
    >
      <Toolbar sx={{ minHeight: '60 !important', px: 3 }}>
        <IconButton
          edge='start'
          onClick={onMenuClick}
          aria-label='Open navigation menu'
          sx={{ display: { xs: 'inline-flex', md: 'none' }, mr: 1 }}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant='body2' color='text.secondary' sx={{ flexGrow: 1 }}>
          {breadcrumb.section} /{' '}
          <Box component='span' sx={{ color: '#111827', fontWeight: 600 }}>
            {breadcrumb.page}
          </Box>
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Avatar
            sx={{
              width: 32,
              height: 32,
              bgcolor: '#dbeafe',
              color: '#2563eb',
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            AD
          </Avatar>
          <Typography variant='body2' sx={{ fontWeight: 600 }}>
            Admin
          </Typography>

          <Button
            color='inherit'
            size='small'
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            loading={logoutMutation.isPending}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
