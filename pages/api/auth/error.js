
export default async (req, res) => {
    res.redirect(`${req.cookies[`next-auth.callback-url`]}?error=` + req.query.error);
  }