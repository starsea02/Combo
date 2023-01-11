import express from express;

const app = express();

app.get('/', (req, res) => {
  console.log('Received a get request on the path /');
  res.send('Hello World!')
});

app.listen(8000, () => {
  console.log('示例程序正在监听 8000 端口！')
});