use Diet;
go
if (object_id('Diet.usp_Plan_S') is not null)
	drop procedure Diet.usp_Plan_S;
go
create procedure Diet.usp_Plan_S
(
	@userId int,
	@id int
)
as
set nocount on;

/*
exec Diet.Diet.usp_Plan_S 1, 1;
*/

select	Id,
	Name,
	TargetProtein,
	TargetFat,
	TargetCarbohydrates
from	Diet.Diet.Plans
where	Id = @id
and	UserId = @userId;

select	Id = Meals.ItemId,
	Meals.Quantity
from	Diet.Diet.Meals as Meals
	inner join Diet.Diet.Items as Items
	on	Items.Id = Meals.ItemId
where	Meals.PlanId = @id
order by Items.Name asc;
go
