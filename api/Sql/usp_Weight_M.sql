use Diet;
go
if (object_id('Diet.usp_Weight_M') is not null)
	drop procedure Diet.usp_Weight_M;
go
create procedure Diet.usp_Weight_M
(
	@userId int,
	@when char(10),
	@weightInPounds float
)
as
set nocount on;
set xact_abort on;
begin tran;

/*
begin tran;
exec Diet.Diet.usp_Weight_M 1, '2010-11-20', 300;
rollback;
*/

update	Diet.Diet.Weights
set	WeightInPounds = @weightInPounds
where	UserId = @userId
and	[When] = convert(date, @when);
if (@@rowcount = 0)
  begin
	insert into Diet.Diet.Weights (
		Id,
		UserId,
		[When],
		WeightInPounds
	) values (
		next value for Diet.Diet.WeightId,
		@userId,
		convert(date, @when),
		@weightInPounds
	);
  end;

commit;
go
