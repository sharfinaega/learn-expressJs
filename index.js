require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");

let listBarang = [
  {
    id: 1,
    nama: "komputer",
    terjual: false
  },
  {
    id: 2,
    nama: "printer",
    terjual: false
  },
  {
    id: 3,
    nama: "kulkas",
    terjual: true
  }
];

app.use(bodyParser.urlencoded({ extended: true }));

// parse json
app.use(bodyParser.json());

// get all data
app.get("/", (req, res) => {
  res.send(listBarang);
});

// get data berdasarkan id
app.get("/list-barang/:id", (req, res) => {
  console.log(req.params.id);
  //   try {
  const filteredBarang = listBarang.find(item => item.id == req.params.id);
  // console.log(filteredBarang);
  res.send({
    message: "Here is what you looking for",
    filteredBarang
  });
  //   } catch (error) {
  //     res.send(error);
  //   }
});

// add new data
app.post("/list-barang", (req, res) => {
  try {
    let newId = listBarang.length + 1;
    let newData = {
      id: newId,
      name: req.body.name,
      terjual: false
    };

    listBarang.push(newData);
    res.status(200).send({
      message: "data successfully added",
      listBarang
    });
  } catch (error) {
    res.send(error);
  }
});

// delete barang
app.delete("/list-barang/:id", (req, res) => {
  try {
    const idDelete = req.params.id;
    let newData = listBarang.filter(item => item.id !== parseInt(idDelete));

    listBarang = newData;
    res.status(200).send(listBarang);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

// update list barang

app.put("/list-barang/:id", (req, res) => {
  try {
    let getListBarangToUpdate = listBarang.findIndex(data => data.id == req.params.id);
    console.log(req.body);

    listBarang.map((data, i) => {
      if (data.id == req.params.id) {
        listBarang[getListBarangToUpdate].nama = req.body.nama;
        // listBarang[i].nama = req.body.nama;
      }
    });
    res.send({
      message: "data successfully updated",
      listBarang
    });
  } catch (error) {
    res.send(error);
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Your server is running on PORT " + process.env.PORT);
});
