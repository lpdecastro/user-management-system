import { Box, Paper, Typography } from '@mui/material';

type Props = {
  title: string;
};

const PlaceholderPage = ({ title }: Props) => {
  return (
    <Box>
      <Typography variant='h4' sx={{ fontWeight: 700 }} gutterBottom>
        {title}
      </Typography>

      <Paper variant='outlined' sx={{ p: 4, mt: 3 }}>
        <Typography variant='h6'>Coming Soon</Typography>

        <Typography color='text.secondary' sx={{ mt: 1 }}>
          The {title} is under development.
        </Typography>
      </Paper>
    </Box>
  );
};

export default PlaceholderPage;
