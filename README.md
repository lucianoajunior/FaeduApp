# API FAEDU
A API foi construia seguindos os padrões REST e usando Node.js/Express.\
A autenticação é feita através do JWT, que deve ser gerado no login e passado nas requisições posteriores.\
Para requisitar os endpoints protegidos você deve passar o cabeçalho **x-access-token**, seguido do token fornecido pela API.

### Endpoints
Abaixo estão todos os endpoints que são escutados pela a API.

##### 1. Login
* **POST /api/login**: Realiza o login e retorna um token JWT.
 
##### 2. Usuários
* **POST /api/users**: Cadastra um novo usuário.
* **GET /api/users**: Retorna todos os usuários ou, caso passado algum filtro, retorna os que encaixam **(protegida)**.
* **GET /api/users/:id**: Retorna os dados do usuário **(protegida)**.
* **PUT /api/users/:id**: Atualiza os dados do usuário **(protegida)**.
* **DELETE /api/users/:id**: Deleta o usuário do banco **(protegida)**.

##### 3. Exercícios
* **GET /api/exercises**: Retorna todos os exercícios **(protegida)**.
* **GET /api/exercises/:id**: Retorna um exercício específico **(protegida)**.
* **POST /api/exercises**: Cadastra um novo exercício **(protegida)**.
* **PUT /api/exercises/:id**: Atualiza os dados do exercício **(protegida)**.
* **DELETE /api/exercises/:id**: Deleta o exercício em questão **(protegida)**.