use Diet;
go
if (object_id('Diet.usp_Plan_M') is not null)
	drop procedure Diet.usp_Plan_M;
if (type_id('Diet.udt_Meals') is not null)
	drop type Diet.udt_Meals;
go
create type Diet.udt_Meals as table
(
	Id int not null,
	Quantity float not null
);
go
create procedure Diet.usp_Plan_M
(
	@userId int,
	@id int,
	@name varchar(30),
	@targetProtein float,
	@targetFat float,
	@targetCarbohydrates float,
	@meals Diet.udt_Meals readonly
)
as
set nocount on;
set xact_abort on;
begin tran;

/*
use Diet;
begin tran;
declare @meals Diet.udt_Meals;
exec Diet.Diet.usp_Plan_M 1, 1, 'Foo', 10, 10, 5, @meals;
rollback;
*/

if (@id = 0)
  begin
	set @id = next value for Diet.Diet.PlanId;
  end;

merge	into Diet.Diet.Plans as Plans_Merge
using	(	select	UserId = @userId,
			Id = @id,
			Name = @name,
			TargetProtein = @targetProtein,
			TargetFat = @targetFat,
			TargetCarbohydrates = @targetCarbohydrates
	) as SourceValues
	on	Plans_Merge.Id = SourceValues.Id
when	not matched by target
then	insert (
		Id,
		UserId,
		Name,
		TargetProtein,
		TargetFat,
		TargetCarbohydrates
	) values (
		SourceValues.Id,
		SourceValues.UserId,
		SourceValues.Name,
		SourceValues.TargetProtein,
		SourceValues.TargetFat,
		SourceValues.TargetCarbohydrates
	)
when	matched and Plans_Merge.UserId = SourceValues.UserId
then	update set
		Name = SourceValues.Name,
		TargetProtein = SourceValues.TargetProtein,
		TargetFat = SourceValues.TargetFat,
		TargetCarbohydrates = SourceValues.TargetCarbohydrates;

if (exists(select 0 from Diet.Diet.Plans where Id = @id and UserId <> @userId))
  begin
	raiserror('Attempting to update invalid plan.', 16, 1);
  end;

with PlanMeals as (
	select	PlanId,
		ItemId,
		Quantity
	from	Diet.Diet.Meals
	where	PlanId = @id
)
merge	into PlanMeals as PlanMeals_Merge
using	(	select	PlanId = @id,
			ItemId = Meals.Id,
			Meals.Quantity
		from	@meals as Meals
	) as SourceValues
	on	PlanMeals_Merge.PlanId = SourceValues.PlanId
	and	PlanMeals_Merge.ItemId = SourceValues.ItemId
when	not matched by target
then	insert (
		PlanId,
		ItemId,
		Quantity
	) values (
		SourceValues.PlanId,
		SourceValues.ItemId,
		SourceValues.Quantity
	)
when	not matched by source
then	delete
when	matched and PlanMeals_Merge.Quantity <> SourceValues.Quantity
then	update set Quantity = SourceValues.Quantity;

commit;
go
