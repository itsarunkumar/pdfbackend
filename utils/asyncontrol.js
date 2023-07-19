const handleAsync = (asyncFn) => {
  return async (req, res, next) => {
    try {
      await asyncFn(req, res, next);
    } catch (error) {
      // You can customize error handling here, e.g., logging the error
      console.error("An error occurred:", error);

      // Send a standard error response to the client
      res.status(500).json({ error: "Something went wrong" });
    }
  };
};

module.exports = handleAsync;
