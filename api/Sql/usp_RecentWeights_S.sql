use Diet;
go
if (object_id('Diet.usp_RecentWeights_S') is not null)
	drop procedure Diet.usp_RecentWeights_S;
go
create procedure Diet.usp_RecentWeights_S
(
	@userId int,
	@skip int,
	@take int
)
as
set nocount on;

/*
exec Diet.Diet.usp_RecentWeights_S 1, 0, 10;
*/

select	top (@take)
	SortedWeights.[When],
	SortedWeights.WeightInPounds
from	(	select	RowNumber = row_number() over (order by [When] desc),
			[When],
			WeightInPounds
		from	Diet.Diet.Weights
		where	UserId = @userId
	) as SortedWeights
where	SortedWeights.RowNumber > @skip
order by SortedWeights.RowNumber asc;
go
