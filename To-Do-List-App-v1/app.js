import express from 'express';
import bodyParser from 'body-parser';
import date from './date.cjs';
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

const items = [];
const dateTimes = [];
const workItems = [];
app.get('/', (req, res) => {
  const day = date.getDate()
  res.render('list', {listTitle: day, newListItems: items, dateTimes: dateTimes});
});

app.post('/', (req, res) => {
  const item = req.body.newItem;
  const dateTime = req.body.dateTime;
  if(req.body.list === 'Work'){
    workItems.push(item);
    dateTimes.push(dateTime)
    res.redirect('/work')
  }else{
    items.push(item);
    dateTimes.push(dateTime);
    res.redirect('/');
  }
});

app.get('/work', (req,res) => {
  res.render("list", {listTitle: "Work List", newListItems: workItems, dateTimes: dateTimes })
});

app.post('/work', (req, res) =>{
  let item = req.body.newItem
  let dateTime = req.body.dateTime
  items.push(item)
  dateTimes.push(dateTime)
  res.redirect('/work')
})
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
