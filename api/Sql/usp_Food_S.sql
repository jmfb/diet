use Diet;
go
if (object_id('Diet.usp_Food_S') is not null)
	drop procedure Diet.usp_Food_S;
go
create procedure Diet.usp_Food_S
(
	@userId int,
	@id int
)
as
set nocount on;

/*
exec Diet.Diet.usp_Food_S 1, 1;
*/

select	Id,
	Name,
	UnitSize,
	UnitMeasure,
	SiteUrl
from	Diet.Diet.Items
where	Id = @id
and	UserId = @userId;

select	Protein,
	Fat,
	Carbohydrates
from	Diet.Diet.Foods
where	Id = @id;

select	Id = IngredientId,
	Quantity
from	Diet.Diet.Ingredients
where	RecipeId = @id;

with Recipes as (
	select	RecipeId = @id
	union all
	select	Ingredients.RecipeId
	from	Recipes as Recipes
		inner join Diet.Diet.Ingredients as Ingredients
		on	Ingredients.IngredientId = Recipes.RecipeId
)
select	distinct RecipeId
from	Recipes
order by RecipeId asc;
go
