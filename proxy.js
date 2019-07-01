const path = require('path');
const express = require('express');
const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer({
	target: 'http://LightWeight.azurewebsites.net',
	changeOrigin: true
});

const app = express();
app.all('/api/*', (req, res) => {
	proxy.web(req, res);
});
app.get('/images/:name.:ext', (req, res) => {
	const { name, ext } = req.params;
	res.sendFile(`${name}.${ext}`, { root: path.resolve(__dirname, 'web/images') });
});
app.get('/:name.:ext', (req, res) => {
	const { name, ext } = req.params;
	res.sendFile(`${name}.${ext}`, { root: path.resolve(__dirname, 'web') });
});
app.get('*', (req, res) => {
	res.sendFile('index.html', { root: path.resolve(__dirname, 'web') });
})
app.listen(3000);
console.log('Listening at localhost:3000');
