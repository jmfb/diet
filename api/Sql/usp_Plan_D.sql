use Diet;
go
if (object_id('Diet.usp_Plan_D') is not null)
	drop procedure Diet.usp_Plan_D;
go
create procedure Diet.usp_Plan_D
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
exec Diet.Diet.usp_Plan_D 1, 1;
rollback;
*/

if (exists(select 0 from Diet.Diet.Plans where Id = @id and UserId <> @userId))
  begin
	raiserror('Cannot delete plan.', 16, 1);
  end;

delete from Diet.Diet.Meals where PlanId = @id;
delete from Diet.Diet.Plans where Id = @id;

commit;
go
