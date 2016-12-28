use Diet;
go
if (object_id('Diet.usp_Food_D') is not null)
	drop procedure Diet.usp_Food_D;
go
create procedure Diet.usp_Food_D
(
	@userId int,
	@id int
)
as
set nocount on;
set xact_abort on;
begin tran;

/*
begin tran;
exec Diet.Diet.usp_Food_D 1;
rollback;
*/

if (exists(select 0 from Diet.Diet.Items where Id = @id and UserId <> @userId))
  begin
	raiserror('Cannot delete food.', 16, 1);
  end;

delete from Diet.Diet.Foods where Id = @id;
delete from Diet.Diet.Ingredients where RecipeId = @id;
delete from Diet.Diet.Items where Id = @id;

commit;
go
