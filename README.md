# Cadastro de carro

## Requisito Funcional

- Deve ser possível cadastrar um novo carro

## Regra de Negócios

- Não deve ser possível cadastrar um carro com uma placa já existente.
- Não deve ser possível alterar a placa de um carro já cadastrado.
- O carro deve ser cadastrado por padrao, com disponibilidade
- O usuário responsável pelo cadastro deve ter permissão de administrador do sistema

# Listagem de carros

## Requisito Funcional

- Deve ser possível listar todos os carros disponíveis
- Deve ser possível listar todos os carros disponíveis pelo nome da categoria
- Deve ser possível listar todos os carros disponíveis pelo nome da marca
- Deve ser possível listar todos os carros disponíveis pelo nome do carro

## Regra de Negócio

- O usuário não é preciso estar logado.

# Cadastro de Especificacão no carro

## Requisito Funcional

- Deve ser possível cadastrar uma especificacão para um carro
- Deve ser possível listar todas as especificacões
- Deve ser possível listar todas os carros

## Regra de Negócio

- Não deve ser possível cadastrar uma especificacão para um carro não cadastrado
- Não deve ser possível cadastrar uma especificacão já existente para o mesmo carro.
- O usuário responsável pelo cadastro deve ter permissão de administrador do sistema

# Cadastro de Imagens do carro

## Requisito Funcional

- Deve ser possível cadastrar a imagem do carro
- Deve ser possível listar todos os carros

## Requisito Não Funcional

- Utilizar o multer para upload dos arquivos

## Regra de Negócio

- O usuário deve poder cadastrar mais de uma imagem para o mesmo carro
- O usuário responsável pelo cadastro deve ser um usuário administrador.

# Aluguel de carro

## Requisito Funcional

- Deve ser possível cadastrar um aluguel

## Regra de Negócio

- O aluguel deve ter duracão mínima de 24 horas
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro
