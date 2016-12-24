create login DietApi with password = 'loseweight';
go
create database Diet;
go
use Diet;
go
create schema Diet;
go
create user DietApi;
go
grant select, execute on schema::Diet to DietApi;
go
