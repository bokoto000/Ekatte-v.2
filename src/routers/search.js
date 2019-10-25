const express = require("express");
const router = express.Router();

module.exports = pool => {
  router.get("/", function(req, res, next) {
    res.render("results", { layout: "default", template: "home-template" });
  });

  router.get("/view-data/:selo", async function(req, res, next) {
    try {
      const selo = req.params.selo;
      console.log(selo);
      const sql = `SELECT selista.name,selista.t_v_m,selista.oblast_id,selista.obstina_id,
        obstini.name as obstina_name, oblasti.name as oblast_name
      FROM selista LEFT OUTER JOIN oblasti as "oblasti" ON selista.oblast_id="oblasti"."id" 
      LEFT OUTER JOIN obstini ON selista.obstina_id=obstini.id  WHERE selista.name='${selo}'`;
      let results = [];
      pool.query(sql, (error, sqlResults) => {
        if (error) {
          console.error(error);
        } else {
          const data = sqlResults.rows;
          data.forEach(row => {
            results.push(
              row.t_v_m +
                " " +
                row.name +
                " общ. " +
                row.obstina_name +
                " обл. " +
                row.oblast_name
            );
            
          });
          if(results.length==0)results.push("Няма намерени резултати");
          return res.render("results", {
            results: results,
            layout: "default",
            template: "home-template"
          });
        }
      });
    } catch (e) {
      console.log(e);
      res.send(400);
    }
  });

  return router;
};
