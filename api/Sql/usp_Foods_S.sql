use Diet;
go
if (object_id('Diet.usp_Foods_S') is not null)
	drop procedure Diet.usp_Foods_S;
go
create procedure Diet.usp_Foods_S
(
	@userId int
)
as
set nocount on;

/*
exec Diet.Diet.usp_Foods_S 1;
*/

select	Items.Id,
	Items.Name,
	Items.UnitSize,
	Items.UnitMeasure,
	Items.SiteUrl,
	Nutrition.Protein,
	Nutrition.Carbohydrates,
	Nutrition.Fat
from	Diet.Diet.Items as Items
	cross apply Diet.Diet.tfn_Nutrition(Items.Id) as Nutrition
where	Items.UserId = @userId
order by Items.Name asc;
go
