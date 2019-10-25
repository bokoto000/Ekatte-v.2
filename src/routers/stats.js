const express = require("express");
const router = express.Router();

module.exports = pool => {
  router.get("/", async function(req, res, next) {
    try {
      const selistaCountSql = `SELECT COUNT(selista.ekatte) as selista FROM selista`;
      const obstiniCountSql = `SELECT COUNT(obstini.id) as obstini FROM obstini`;
      const oblastiCountSql = `SELECT COUNT(oblasti.id) as oblasti FROM oblasti`;
      const selistaCount = (await pool.query(selistaCountSql)).rows[0].selista;
      const obstiniCount = (await pool.query(obstiniCountSql)).rows[0].obstini;
      const oblastiCount = (await pool.query(oblastiCountSql)).rows[0].oblasti;
      return res.render("stats", {
        selistaCount,
        obstiniCount,
        oblastiCount,
        layout: "default",
        template: "home-template"
      });
    } catch (e) {
      console.log(e);
      res.send(400);
    }
  });

  return router;
};
