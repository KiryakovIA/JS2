const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('.'));

app.get('/catalogData', (req, res) => {
	fs.readFile('catalog.json', 'utf8', (err, data) => {
		res.send(data);
	});
});

app.post('/addToCart', (req, res) => {
	fs.readFile('cart.json', 'utf8', (err, data) => {
		if (err) {
			res.send('{"result": 0}');
		} else {
			const cart = JSON.parse(data);
			const item = req.body;

			cart.push(item);

			fs.writeFile('cart.json', JSON.stringify(cart), (err) => {
				if (err) {
					res.send('{"result": 0}');
				} else {
					res.send('{"result": 1}');
				}
			});
		}
	});
});

app.post('/deleteFromCart', (req, res) => {
	fs.readFile('cart.json', 'utf8', (err, data) => {
		if (err) {
			res.send('{"result": 0}');
		} else {
			let cart = JSON.parse(data);
			const item = req.body;

			let index = cart.findIndex(it => it.id_product == item.id_product);
			if (index >= 0) {
				cart = cart.splice(index, 1);
			}
			fs.writeFile('cart.json', JSON.stringify(cart), (err) => {
				if (err) {
					res.send('{"result": 0}');
				} else {
					res.send('{"result": 1}');
				}
			});
		}
	});
});

app.listen(3000, function () {
	console.log('server is running on port 3000!');
});
