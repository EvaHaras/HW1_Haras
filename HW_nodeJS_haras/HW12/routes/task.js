var express = require('express');
var router = express.Router();
const fs = require('fs')
const z = require('zod')
const { randomUUID } = require("crypto");

router.get('/:idTask', function (req, res, next) {
  const { idTask } = req.params;
  fs.readFile("data/task.json", "utf8", (error, response) => {
    if (error) {
      console.log({ error })
    } else {
      console.log({ response })
      const filterData = JSON.parse(response).data.find((elementData) => elementData.id === idTask)
      console.log({ filterData }, '1')
      if(filterData){
        res.send(filterData)
      }else{
        res.status(404).send('Таску не знайдено')
      }
    }
  })
});

router.post('/', function (req, res, next) {
  const body = req.body;
  const task = z.object({
    id: z.string(),
    title: z.string().min(3),
    discription: z.string().optional(),
    status: z.string().refine(val =>
      ["todo", "in-progress", "done"].includes(val),
      { message: "має бути один з вище зазначених варіантів" }),
    date: z.string()
  });
  const now = new Date().toISOString()
  const dataTask = { ...body, id: randomUUID(), date: now }
  const test = async (requestBody) => {
    try {
      const result = await task.parseAsync(requestBody);
      console.log({ result });

      fs.readFile("data/task.json", "utf8", (error, response) => {
        if (error) {
          console.log({ error });
          res.status(500).send("Помилка при зчитуванні файлу");
        } else {
          const json = JSON.parse(response);
          json.data.push(result);
          const newData = { data: json.data };

          fs.writeFile("data/task.json", JSON.stringify(newData, null, 2), (errorWrite) => {
            if (errorWrite) {
              res.status(500).send("Помилка при запису файлу");
            } else {
              res.status(200).send("Дані успішно прийняті");
            }
          });
        }
      });
    } catch (error) {
      console.log({ error });
      res.status(400).send('Не вірні дані');
    }

  }
  test(dataTask)

})

router.delete('/:idTask', function (req, res, next) {
  const { idTask } = req.params

  fs.readFile("data/task.json", "utf8", (error, response) => {
    if (error) {
      console.log({ error })
      res.status(500).send("Помилка при видалені таски");
    } else {
      console.log({ response })
      const filterData = { data: JSON.parse(response).data.filter((elementData) => elementData.id !== idTask) }
      fs.writeFile("data/task.json", JSON.stringify(filterData, null, 2), (errorWrite) => {
        if (errorWrite) {
          res.status(500).send("Помилка при запису файлу");
        } else {
          res.status(200).send("Таска успішно видалена");
        }
      });
      console.log({ filterData }, '2')
    }
  })
})

router.patch('/:idTask', function (req, res, next) {
  const { idTask } = req.params
  const body = req.body;
  const status = z.object({
    status: z.string().refine(val =>
      ["todo", "in-progress", "done"].includes(val),
      { message: "має бути оди з вище зазначених варіантів" })
  })
  const test = async (requestBody) => {

    try {
      const result = await status.parseAsync(requestBody);
      console.log({ result });
      const now = new Date().toISOString()
      fs.readFile("data/task.json", "utf8", (error, response) => {
        if (error) {
          console.log({ error })
          res.status(500).send("Помилка при зміні статусу таски");
        } else {
          console.log({ response })
          const newData = {
            data: JSON.parse(response).data.map((elementData) => {
              if (elementData.id === idTask) {
                elementData.status = result.status
                dateUpdate = now
              }
              return elementData
            })
          }
          console.log({ newData })

          fs.writeFile("data/task.json", JSON.stringify(newData, null, 2), (errorWrite) => {
            if (errorWrite) {
              res.status(500).send("Помилка при запису файлу");
            } else {
              res.status(200).send("Таска успішно оновлена");
            }
          });
        }
      })
    } catch (error) {
      console.log({ error });
      res.status(400).send('Не вірні дані');
    }
  }
  test(body)
})

router.put('/:idTask', function (req, res, next) {
  const { idTask } = req.params
  const body = req.body;
  const now = new Date().toISOString()
  const task = z.object({
    title: z.string().min(3),
    discription: z.string().optional(),
    status: z.string().refine(val =>
      ["todo", "in-progress", "done"].includes(val),
      { message: "має бути один з вище зазначених варіантів" }),
  });
  const test = async (requestBody) => {

    try {
      const result = await task.parseAsync(requestBody);
      console.log({ result });
      fs.readFile("data/task.json", "utf8", (error, response) => {
        if (error) {
          console.log({ error })
          res.status(500).send("Помилка при зміні статусу таски");
        } else {
          console.log({ response })
          const newData = {
            data: JSON.parse(response).data.map((elementData) => {
              if (elementData.id === idTask) {
                  elementData.title = result.title;
                  elementData.discription = result.discription ?? elementData.discription;
                  elementData.status = result.status;
                  elementData.data = elementData.date;
                  elementData.dateUpdate = now;
              }
              return elementData
            })
          }
          console.log({ newData })

          fs.writeFile("data/task.json", JSON.stringify(newData, null, 2), (errorWrite) => {
            if (errorWrite) {
              res.status(500).send("Помилка при запису файлу");
            } else {
              res.status(200).send("Таска успішно оновлена");
            }
          });
        }
      })
    } catch (error) {
      console.log({ error });
      res.status(400).send('Не вірні дані');
    }
  }
  test(body)
})


router.get('/', function (req, res, next) {
  const { by } = req.query;
  const {status} = req.query;
  console.log({status})

  fs.readFile("data/task.json", "utf8", (error, response) => {
    if (error) {
      console.log({ error })
    } else {
      if(by === 'date'){
        const sortedData = JSON.parse(response).data.sort((a, b) => new Date(a.date) - new Date(b.date))
        console.log({ sortedData }, '3')
        res.send(sortedData)
      }else if(status){
        console.log(status)
        const filterData = JSON.parse(response).data.filter((filterElem)=> filterElem.status === status)
        console.log({ filterData }, '4')
        res.send(filterData)
      }else{
        console.log({ response })
        res.send(JSON.parse(response).data)
      }
    }
  })
});
module.exports = router;
