const express = require('express');
const server = require('../api/server');

const db = require ('../data/dbConfig');

const router = express.Router();

router.get('/', (req,res)=>{
   db.select('*')
     .from('accounts')
     .then(accounts => {
         res.status(200).json({data: accounts})
     })
     .catch(error => {
         console.log(error)
     })
})

router.get('/:id', (req,res)=> {
    const { id } = req.params;
    console.log(id)
    db.select('*')
      .from ('accounts')
      .where({id})
      .first()
      .then(accounts => {
          res.status(200).json({data: accounts})
      })
      .catch(error=> {
          console.log(error)
      })

})

router.post("/", (req, res) => {
    const accountsData = req.body;

    // validate the data

    db("accounts")
        .insert(accountsData, "id")
        .then(ids => {
            db("accounts")
                .where({ id: ids[0] })
                .first()
                .then(accounts => {
                    res.status(200).json({ data: accounts });
                });
        })
        .catch(error => {
            handleError(error, res);
        });
});

router.put("/:id", (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    db("accounts")
        .where({ id })
        .update(changes) // don't forget to have a WHERE
        .then(count => {
            // count is the number of records updated
            if (count > 0) {
                res.status(200).json({ data: count });
            } else {
                res.status(404).json({ message: "there was no record to update" });
            }
        })
        .catch(error => {
            handleError(error, res);
        });
});

router.delete("/:id", (req, res) => {
    const { id } = req.params;

    db("accounts")
        .where({ id })
        .del() // don't forget to have a where
        .then(count => {
            // count is the number of records deleted
            if (count > 0) {
                res.status(200).json({ data: count });
            } else {
                res.status(404).json({ message: "there was no record to delete" });
            }
        })
        .catch(error => {
            handleError(error, res);
        });
});

module.exports = router;