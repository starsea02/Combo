import express from 'express';
import fileRenameRoutes from './routes/fileRenameRoutes';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api', fileRenameRoutes);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
