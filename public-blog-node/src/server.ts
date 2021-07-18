require('dotenv').config()
import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors())

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'blog_node'
});


// CREATE 
app.post('/', (req, res) => {

  // data from body post 
  const postObject = [
    req.body.title,
    req.body.content,
    req.body.authorName,
  ];

  if (!postObject[0] || !postObject[1] || !postObject[2]) {
    return res.status(404).json({ error: { hasError: true, message: "Invalid request params" } })
  }



  connection.query("INSERT INTO `post` (`id`, `title`, `content`, `likes`, `authorName`) VALUES (NULL, ?, ?, 0 , ?)",
    postObject, (errorQuery, rows) => {

      if (errorQuery) {
        console.log(errorQuery)
        res.status(402).json({ error: { hasErrors: true, message: errorQuery.message } });
      }

      return res.status(201).json({ error: { hasErrors: false, message: null }, message: "sucessfully created" });

    });

});



// READ BY ID
app.get('/:id', (req, res) => {

  // data from body post 
  const postId = req.params.id;


  connection.query("SELECT * FROM post WHERE id = ?",
    postId, (errorQuery, rows) => {

      if (errorQuery) {
        console.log(errorQuery)
        res.status(402).json({ error: { hasErrors: true, message: errorQuery.message } });
      }

      return res.status(201).json({ error: { hasErrors: false, message: null }, data: rows[0] });

    });

});

// READ ALL
app.get('/', (req, res) => {




  connection.query("SELECT * FROM post", (errorQuery, rows) => {

    if (errorQuery) {
      console.log(errorQuery)
      res.status(402).json({ error: { hasErrors: true, message: errorQuery.message } });
    }

    return res.status(201).json({ error: { hasErrors: false, message: null }, data: rows });

  });

});

// Update by ID
app.put('/:id', (req, res) => {
  return res.status(301).json({ msg: 'this route dont works yet' })
  // data from body post 
  const postObject = [
    req.body.title,
    req.body.content,
    req.params.id
  ];



  connection.query("UPDATE `post` SET title = ?, content = ? WHERE `post`. `id` = ?", postObject, (errorQuery, rows) => {

    if (errorQuery) {
      console.log(errorQuery)
      res.status(402).json({ error: { hasErrors: true, message: errorQuery.message } });
    }

    return res.status(201).json({ error: { hasErrors: false, message: null }, data: rows });

  });

});

// Delete by ID
app.delete('/:id', (req, res) => {
  return res.status(301).json({ msg: 'this route dont works yet' })


  connection.query("DELETE FROM `post` WHERE `post`.`id` = 4", req.params.id, (errorQuery, rows) => {

    if (errorQuery) {
      console.log(errorQuery)
      res.status(402).json({ error: { hasErrors: true, message: errorQuery.message } });
    }

    return res.status(201).json({ error: { hasErrors: false, message: null }, message: "successfuly deleted" });

  });

});


// Process port test
const PORT = 3333
app.listen(process.env.PORT || PORT, () => console.log(`server running at http://localhost:${PORT}`))

