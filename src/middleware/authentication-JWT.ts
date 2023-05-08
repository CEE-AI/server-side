// import express from 'express';
// import jwt from 'jsonwebtoken'

// // Middleware to verify JWT
// const secretKey = 'REPLAY';

// export const authenticateJWT = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
//   const authHeader = req.headers.authorization;

//   if (authHeader) {
//     const token = authHeader.split(' ')[1];

//     try {
    
//       const decoded = jwt.verify(token, secretKey);
//       req._Id = decoded._Id
      
//       res.json({accessToken: decoded})

//       next();
//     } catch (error) {
//       res.status(401).json({ message: 'Invalid token' });
//     }
//   } else {
//     res.status(401).json({ message: 'No token provided' });
//   }
// };

// export const generateToken = (id: number): string => {
//   // Generate JWT
//   const payload = { _id: id };
//   const options = { expiresIn: '1h' };
//   const token = jwt.sign(payload, secretKey, options);
  
//   return token;
// };

