# Projeto 03 API - SOLID - CHECK-IN-ACADEMY

## App: "CHECK-IN-ACADEMY"

## RF Requisitos Funcionais

- [x] Deve ser possivel se cadastrar - It should be possible to register;
- [x] Deve ser possivel se autenticar - It must be possible to authenticate;
- [x] Deve ser possivel obter o perfil de um usuario logado - It should be possible to get the profile of a logged in user;
- [ ] Deve ser possivel obter o numero de check-ins realizados pelo usuario logado - It must be possible to obtain the number of check-ins performed by the logged in user;
- [ ] Deve ser possivel o usuario obter seu historico de check-ins - It must be possible for the user to obtain their check-in history;
- [ ] Deve ser possivel o usuario buscar academia próxima - It should be possible for the user to search for a nearby gym;
- [ ] Deve ser possivel o usuario buscar academias pelo nome - It should be possible for the user to search for gyms by name;
- [x] Deve ser possivel o usuario realizar check-in em uma academia - It must be possible for the user to check-in at a gym;
- [ ] Deve ser possivel validar o check-in de um usuario - It must be possible to validate a user's check-in;
- [x] Deve ser possivel cadastrar uma academia - It should be possible to register an academy;

## RN Regras de Negocio

- [x] O usuario não deve poder se cadastrar com e-mail duplicado - User should not be able to register with duplicate email;
- [x] O usuario não pode fazer 2 check-in no mesmo dia - User cannot check-in twice on the same day;
- [x] O usuario não pode fazer check-in se não estiver perto (100m) da academia - The user cannot check-in if he is not close (100m) to the gym;
- [ ] O check-in só pode ser realizar ate 20 minutos após criados - Check-in can only be done up to 20 minutes after created;
- [ ] O check-in só pode ser validados por administradores - Check-in can only be validated by administrators;
- [ ] A academia só pode ser cadastrada por administradores - The academy can only be registered by administrators;

## RNFs Requisitos não-funcionais

- [x] A senha do usuario precisa estar criptografada - User password must be encrypted;
- [x] Os dados da aplicação precisam estar persistido em um banco PostgreSQL - Application data must be persisted in a PostgreSQL database;
- [ ] Toda Lista de dados precisam estar paginadas com 20 itens por pagina - Every Data List must be paginated with 20 items per page;
- [ ] O usuario deve ser identificado por um JWT (JSON Web Token) - The user must be identified by a JWT (JSON Web Token);
