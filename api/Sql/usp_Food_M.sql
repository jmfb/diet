use Diet;
go
if (object_id('Diet.usp_Food_M') is not null)
	drop procedure Diet.usp_Food_M;
go
create procedure Diet.usp_Food_M
(
	@userId int,
	@id int,
	@name varchar(30),
	@unitSize float,
	@unitMeasure varchar(30),
	@siteUrl varchar(max),
	@protein float,
	@fat float,
	@carbohydrates float
)
as
set nocount on;
set xact_abort on;
begin tran;

/*
begin tran;
exec Diet.Diet.usp_Food_M 1, 1, 'Foo', 1, 'ounce', '', 1, 2, 3;
rollback;
*/

if (exists(select 0 from Diet.Diet.Items where Id = @id and UserId <> @userId) or
	exists(select 0 from Diet.Diet.Ingredients where RecipeId = @id))
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

merge	into Diet.Diet.Foods as Foods_Merge
using	(	select	Id = @id,
			Protein = @protein,
			Fat = @fat,
			Carbohydrates = @carbohydrates
	) as SourceValues
	on	Foods_Merge.Id = SourceValues.Id
when	not matched by target
then	insert (
		Id,
		Protein,
		Fat,
		Carbohydrates
	) values (
		SourceValues.Id,
		SourceValues.Protein,
		SourceValues.Fat,
		SourceValues.Carbohydrates
	)
when	matched
then	update set
		Protein = SourceValues.Protein,
		Fat = SourceValues.Fat,
		Carbohydrates = SourceValues.Carbohydrates;

commit;
go
