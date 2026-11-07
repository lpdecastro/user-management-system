import { Alert, Box, Grid, Paper, Skeleton, Typography } from '@mui/material';
import useUserSummary from '../hooks/useUserSummary';

const UserSummary = () => {
  const { data, isPending, isError } = useUserSummary();

  if (isError) {
    return (
      <Alert
        severity='error'
        sx={{ mb: 3 }}
      >
        Failed to load user summary
      </Alert>
    );
  }

  const summary = [
    { label: 'Total Users', value: data?.totalUsers },
    { label: 'Engineering', value: data?.engineering },
    { label: 'Marketing', value: data?.marketing },
    { label: 'Design', value: data?.design },
  ];

  return (
    <Grid
      container
      spacing={2}
      sx={{ mb: 3 }}
    >
      {summary.map((item) => (
        <Grid
          key={item.label}
          size={{ xs: 12, sm: 6, md: 3 }}
        >
          <Paper
            variant='outlined'
            sx={{ p: 3 }}
          >
            <Box>
              <Typography
                variant='body2'
                color='text.secondary'
              >
                {item.label}
              </Typography>

              {isPending ? (
                <Skeleton
                  variant='text'
                  width={80}
                  height={48}
                  sx={{ mx: 'auto' }}
                />
              ) : (
                <Typography variant='h4'>{item.value}</Typography>
              )}
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default UserSummary;
