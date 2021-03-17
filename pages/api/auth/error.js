
export default async (req, res) => {
  if (process.env.NEXTAUTH_URL === 'http://localhost:3000') {
    res.redirect(`${req.cookies[`next-auth.callback-url`]}?error=` + req.query.error);
  } else {
    res.redirect(`${req.cookies[`__Secure-next-auth.callback-url`]}?error=` + req.query.error);
  }
    
  }
