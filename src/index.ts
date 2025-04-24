console.log('hello typescript!');

import express, { Request, Response, NextFunction } from 'express';
import basicAuth from 'basic-auth';

const app = express();
const port = 3000;

// Basic Auth Middleware
const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const user = basicAuth(req);

  const validUser = 'admin';
  const validPassword = 'secret';

  if (user && user.name === validUser && user.pass === validPassword) {
    next();
  } else {
    res.set('WWW-Authenticate', 'Basic realm="example"');
    res.status(401).send('Authentication required.');
  }
};


// Protected route
app.post('/api/secure-data', authenticate, (req: Request, res: Response) => {
  res.json({ message: 'This is secured data' });
});

// Public route
app.get('/api/public', (req: Request, res: Response) => {
  res.json({ message: 'This is public data' });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
