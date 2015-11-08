var express = require('express');
var router = express.Router();

router.get('/handymans', function(req, res, next) {
  var handymanList = [
    { name: 'Seu Zé Mane', rating: 70, skills: ['painter', 'masom'] },
    { name: 'Gogó encanador', rating: 70, skills: ['painter'] },
    { name: 'Milfont Faz tudo', rating: 20, skills: ['painter', 'masom', 'brogramer'] }
  ];

  res.json(handymanList);
});

router.post('/rating', function(req, res) {
  res.send('Created');
});

module.exports = router;
