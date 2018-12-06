# API FAEDU
A API foi construia seguindos os padrões REST e usando Node.js/Express.\
A autenticação é feita através do JWT, que deve ser gerado no login e passado nas requisições posteriores.\
Para requisitar os endpoints protegidos você deve passar o cabeçalho **x-access-token**, seguido do token fornecido pela API.

### Endpoints
Abaixo estão todos os endpoints que são escutados pela a API.

#### 1. Login
* **POST /api/login**: Realiza o login e retorna um token JWT.
 
#### 2. Usuários
Campos: ```name```, ```organization```, ```email```, ```password```, ```level``` e ```created_at```.
* **POST /api/users**: Cadastra um novo usuário.
* **GET /api/users**: Retorna todos os usuários. **(protegida)**.
    * Sempre retornará apenas ```level: 2```, pois só não há listagem de alunos na ferramenta.
    * Passando o parâmetro ```?s=Luciano``` você filtra campos que contenham a string nos campos ```name```, ```organization``` e ```email```.
* **GET /api/users/:id**: Retorna os dados do usuário **(protegida)**.
* **PUT /api/users/:id**: Atualiza os dados do usuário **(protegida)**.
* **DELETE /api/users/:id**: Deleta o usuário do banco **(protegida)**.

#### 3. Exercícios
Campos: ```title```, ```author```, ```type```, ```description``` e ```json```.
* **GET /api/exercises**: Retorna todos os exercícios **(protegida)**.
    *  Passando o parâmetro ```?s=Faculdade``` você filtra campos que contenham a string nos campos ```title``` e ```description```.
* **GET /api/exercises/:id**: Retorna um exercício específico **(protegida)**.
* **GET /api/exercises/author/:id**: Retorna uma lista de exercícios de um determinado autor **(protegida)**.
* **POST /api/exercises**: Cadastra um novo exercício **(protegida)**.
* **PUT /api/exercises/:id**: Atualiza os dados do exercício **(protegida)**.
* **DELETE /api/exercises/:id**: Deleta o exercício em questão **(protegida)**.

#### 4. Submissões
Campos: ```author```, ```exercise```, ```json``` e ```date``` (o campo data é registrado automaticamente pela API).
* **GET /api/submissions**: Retorna todas as submissões **(protegida)**.
* **GET /api/submissions/:id**: Retorna todos os dados de uma determinada submissão **(protegida)**.
* **GET /api/submissions/author/:id**: Retorna todas as submissões realizadas por um aluno **(protegida)**.
* **POST /api/submissions**: Cadastra uma nova submissão **(protegida)**.