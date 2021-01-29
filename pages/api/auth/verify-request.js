
export default async (req, res) => {
  res.redirect(`${req.headers.referer}?SendEmail=` + true);
}