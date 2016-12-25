use Diet;
go
if (object_id('Diet.usp_Weights_S') is not null)
	drop procedure Diet.usp_Weights_S;
go
create procedure Diet.usp_Weights_S
(
	@userId int,
	@startDate char(10),
	@endDateExclusive char(10)
)
as
set nocount on;

/*
exec Diet.Diet.usp_Weights_S 1, '2010-11-20', '2016-01-01';
*/

select	[When],
	WeightInPounds
from	Diet.Diet.Weights
where	UserId = @userId
and	[When] >= convert(date, @startDate)
and	[When] < convert(date, @endDateExclusive)
order by [When] asc;
go
