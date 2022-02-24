import jwt from "jsonwebtoken";

// middleware for protected routes
export const authenticate = (handler) => async (...args) => {
  const isApi = args.length > 1;

  const req = isApi ? args[0] : args[0].req;
  const res = isApi ? args[1] : args[0].res;

  try {
    const accessToken = req.cookies.accessToken;
    
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    req.cookieUserId = decoded.sub;
    
    return isApi ? handler(req, res) : handler(args[0]);
  } catch(e) {
    if(isApi) {
      res.statusCode = 401;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ message: e.message }));
      return;
    }

    //getServerSideProps
    // req.cookieUserId = JSON.stringify({ cookieUserId: null });
    req.cookieUserId = null;
    return handler(args[0]);
  }
};