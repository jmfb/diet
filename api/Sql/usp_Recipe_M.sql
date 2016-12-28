use Diet;
go
if (object_id('Diet.usp_Recipe_M') is not null)
	drop procedure Diet.usp_Recipe_M;
if (type_id('Diet.udt_Ingredients') is not null)
	drop type Diet.udt_Ingredients;
go
create type Diet.udt_Ingredients as table
(
	Id int not null,
	Quantity float not null
);
go
create procedure Diet.usp_Recipe_M
(
	@userId int,
	@id int,
	@name varchar(30),
	@unitSize float,
	@unitMeasure varchar(30),
	@siteUrl varchar(max),
	@ingredients Diet.udt_Ingredients readonly
)
as
set nocount on;
set xact_abort on;
begin tran;

/*
use Diet;
begin tran;
declare @ingredients Diet.udt_Ingredients;
exec Diet.Diet.usp_Recipe_M 1, 1, 'Foo', 1, 'ounce', '', @ingredients;
rollback;
*/

if (exists(select 0 from Diet.Diet.Items where Id = @id and UserId <> @userId) or
	exists(select 0 from Diet.Diet.Foods where Id = @id))
  begin
	raiserror('Cannot update item.', 16, 1);
  end;

if (@id = 0)
  begin
	set @id = next value for Diet.Diet.ItemId;
  end;

merge	into Diet.Diet.Items as Items_Merge
using	(	select	UserId = @userId,
			Id = @id,
			Name = @name,
			UnitSize = @unitSize,
			UnitMeasure = @unitMeasure,
			SiteUrl = @siteUrl
	) as SourceValues
	on	Items_Merge.Id = SourceValues.Id
when	not matched by target
then	insert (
		Id,
		UserId,
		Name,
		UnitSize,
		UnitMeasure,
		SiteUrl
	) values (
		SourceValues.Id,
		SourceValues.UserId,
		SourceValues.Name,
		SourceValues.UnitSize,
		SourceValues.UnitMeasure,
		SourceValues.SiteUrl
	)
when	matched
then	update set
		Name = SourceValues.Name,
		UnitSize = SourceValues.UnitSize,
		UnitMeasure = SourceValues.UnitMeasure,
		SiteUrl = SourceValues.SiteUrl;

with ItemIngredients as (
	select	RecipeId,
		IngredientId,
		Quantity
	from	Diet.Diet.Ingredients
	where	RecipeId = @id
)
merge	into ItemIngredients as ItemIngredients_Merge
using	(	select	RecipeId = @id,
			IngredientId = Id,
			Quantity
		from	@ingredients
	) as SourceValues
	on	ItemIngredients_Merge.RecipeId = SourceValues.RecipeId
	and	ItemIngredients_Merge.IngredientId = SourceValues.IngredientId
when	not matched by target
then	insert (
		RecipeId,
		IngredientId,
		Quantity
	) values (
		SourceValues.RecipeId,
		SourceValues.IngredientId,
		SourceValues.Quantity
	)
when	not matched by source
then	delete
when	matched and ItemIngredients_Merge.Quantity <> SourceValues.Quantity
then	update set Quantity = SourceValues.Quantity;

commit;
go
