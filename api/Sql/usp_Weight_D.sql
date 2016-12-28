use Diet;
go
if (object_id('Diet.usp_Weight_D') is not null)
	drop procedure Diet.usp_Weight_D;
go
create procedure Diet.usp_Weight_D
(
	@userId int,
	@when char(10)
)
as
set nocount on;

/*
begin tran;
exec Diet.Diet.usp_Weight_D 1, '2010-11-20';
rollback;
*/

delete	from Diet.Diet.Weights
where	UserId = @userId
and	[When] = convert(date, @when);
go
