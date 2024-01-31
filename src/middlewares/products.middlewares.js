export const getFindParameters = (req, res, next) => {
  const queryFindParameters = {};
  const limit = parseInt(req.query?.limit ?? 10);
  const page = parseInt(req.query?.page ?? 1);
  const title = req.query?.query || null;
  const optionsPaginate = { limit, page, lean: true };
  const sortOrder = req.query?.sort?.toLowerCase();
  const categoryFilter = req.query?.category;
  const stockFilter = parseInt(req.query?.stock);

  (sortOrder === "asc" && (optionsPaginate.sort = { price: 1 })) ||
    (sortOrder === "desc" && (optionsPaginate.sort = { price: -1 }));
  stockFilter && (queryFindParameters.stock = { $gte: stockFilter });
  categoryFilter && !title && (queryFindParameters.category = categoryFilter);
  title && ((queryFindParameters.title = title), (optionsPaginate.page = 1));

  req.queryFindParameters = queryFindParameters
  req.optionsPaginate = optionsPaginate

  next()
}