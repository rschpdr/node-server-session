const Usuario = require('../models').Usuario;
const { check, validationResult } = require('express-validator/check');

const regexNomes = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ '\/]+$/g;

module.exports = {
  validate(method) {
    switch (method) {
      case 'create':
        return [
          check('nome')
            .exists()
            .withMessage('Nome não deve ficar em branco')
            .matches(regexNomes)
            .withMessage('O campo contém caracteres inválidos')
            .trim()
            .escape(),
          check('cargo')
            .exists()
            .withMessage('Cargo não deve ficar em branco')
            .matches(regexNomes)
            .withMessage('O campo contém caracteres inválidos')
            .trim()
            .escape(),
          check('email')
            .exists()
            .isEmail()
            .withMessage('E-mail inválido')
            .normalizeEmail(),
          check('senha')
            .isLength({ min: 12 })
            .withMessage('Senha deve conter pelo menos 12 caracteres')
        ];
    }
  },

  create(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json(errors.array());
    } else {
      return Usuario.create({
        nome: req.body.nome,
        cargo: req.body.cargo,
        email: req.body.email,
        senha: req.body.senha
      })
        .then(usuario => res.status(201).json(usuario))
        .catch(err => res.status(401).json(err));
    }
  },

  list(req, res) {
    return Usuario.all()
      .then(usuarios => res.status(200).json(usuarios))
      .catch(err => res.status(400).json(err));
  }
};
