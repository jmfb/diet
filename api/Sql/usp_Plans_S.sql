use Diet;
go
if (object_id('Diet.usp_Plans_S') is not null)
	drop procedure Diet.usp_Plans_S;
go
create procedure Diet.usp_Plans_S
(
	@userId int
)
as
set nocount on;

/*
exec Diet.Diet.usp_Plans_S 1;
*/

select	Plans.Id,
	Plans.Name,
	Plans.TargetProtein,
	Plans.TargetFat,
	Plans.TargetCarbohydrates,
	ActualProtein = Actual.Protein,
	ActualFat = Actual.Fat,
	ActualCarbohydrates = Actual.Carbohydrates
from	Diet.Diet.Plans as Plans
	cross apply (
		select	Protein = sum(Meals.Quantity * Nutrition.Protein),
			Carbohydrates = sum(Meals.Quantity * Nutrition.Carbohydrates),
			Fat = sum(Meals.Quantity * Nutrition.Fat)
		from	Diet.Diet.Meals as Meals
			cross apply Diet.Diet.tfn_Nutrition(Meals.ItemId) as Nutrition
		where	Meals.PlanId = Plans.Id
	) as Actual
where	Plans.UserId = @userId
order by Plans.Name asc;
go
