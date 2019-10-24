const express = require("express");
const router = express.Router();

module.exports = ormModels => {

    router.get("/", async (req, res) => {
        try {
            return res.send(200);
        } catch (e) {
            return res.send(400);
        }
    });

    return router;
};