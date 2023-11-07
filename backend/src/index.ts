import app from './app';
import config from './utils/config';


app.listen(config.PORT, () => {
  console.log('Listening on port 8000');
});
