import {
  ApartmentOutlined,
  DashboardOutlined,
  DescriptionOutlined,
  PeopleOutlined,
  SettingsOutlined,
  ShieldOutlined,
} from '@mui/icons-material';
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { NavLink } from 'react-router';

type Props = {
  onNavigate?: () => void;
};

const managementItems = [
  { label: 'Users', path: '/users', icon: <PeopleOutlined /> },
  { label: 'Roles & Permissions', path: '/roles', icon: <ShieldOutlined /> },
  { label: 'Teams', path: '/teams', icon: <ApartmentOutlined /> },
  { label: 'Audit Logs', path: '/audit-logs', icon: <DescriptionOutlined /> },
];

const Sidebar = ({ onNavigate }: Props) => {
  const renderNavItem = (
    label: string,
    path: string,
    icon: React.ReactNode
  ) => (
    <NavLink
      key={path}
      to={path}
      end
      onClick={onNavigate}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      {({ isActive }) => (
        <ListItemButton
          selected={isActive}
          sx={{
            borderRadius: 1.5,
            mb: 0.5,
            color: isActive ? '#2563eb' : '#64748b',
            '&.Mui-selected': {
              bgcolor: '#eff6ff',
            },
            '&.Mui-selected:hover': {
              bgcolor: '#dbeafe',
            },
          }}
        >
          <ListItemIcon
            sx={{ minWidth: 38, color: isActive ? '#2563eb' : '#64748b' }}
          >
            {icon}
          </ListItemIcon>
          <ListItemText primary={label} />
        </ListItemButton>
      )}
    </NavLink>
  );

  return (
    <Box
      sx={{
        width: 238,
        height: '100%',
        bgcolor: '#fff',
        borderRight: '1px solid #e5e7eb',
        boxSizing: 'border-box',
      }}
    >
      {/* Brand */}
      <Box
        sx={{
          height: 60,
          px: 2.5,
          display: 'flex',
          alignItems: 'center',
          gap: 1.25,
        }}
      >
        <Box
          sx={{
            width: 30,
            height: 30,
            bgcolor: '#2563eb',
            borderRadius: 1.5,
            display: 'grid',
            placeItems: 'center',
            color: '#fff',
            fontWeight: 700,
          }}
        >
          A
        </Box>
        <Typography sx={{ fontWeight: 700, fontSize: 15 }}>
          Admin Console
        </Typography>
      </Box>

      {/* Navigation */}
      <Box sx={{ px: 1.5, py: 2 }}>
        <List disablePadding>
          {renderNavItem('Dashboard', '/dashboard', <DashboardOutlined />)}
        </List>

        <Typography
          sx={{
            px: 1,
            mt: 2,
            mb: 1,
            fontSize: 11,
            fontWeight: 700,
            color: '#94a3b8',
          }}
        >
          MANAGEMENT
        </Typography>

        <List disablePadding>
          {managementItems.map((item) =>
            renderNavItem(item.label, item.path, item.icon)
          )}
        </List>

        <Typography
          sx={{
            px: 1,
            mt: 2,
            mb: 1,
            fontSize: 11,
            fontWeight: 700,
            color: '#94a3b8',
          }}
        >
          SYSTEM
        </Typography>

        <List disablePadding>
          {renderNavItem('Settings', '/settings', <SettingsOutlined />)}
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;
