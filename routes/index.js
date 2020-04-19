const { Router } = require("express");
const welcome = require("../controllers");
const { statusCodes } = require("../constants");
const router = Router();
router.get("/", welcome);
// Put any routes down here, make sure to put them above {NOT_FOUND} handler

router.use((req, res) => {
  return res.status(statusCodes.NOT_FOUND).json({
    message: `Invalid url: ${req.url}`,
  });
});

module.exports = router;
