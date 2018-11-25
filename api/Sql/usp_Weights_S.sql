use Diet;
go
if (object_id('Diet.usp_Weights_S') is not null)
	drop procedure Diet.usp_Weights_S;
go
create procedure Diet.usp_Weights_S
(
	@userId int,
	@startDate char(10),
	@endDateExclusive char(10),
	@average bit = 0
)
as
set nocount on;

/*
exec Diet.Diet.usp_Weights_S 1, '2010-11-20', '2016-01-01';
exec Diet.Diet.usp_Weights_S 1, '2010-11-20', '2016-01-01', 1;
*/

select	Weights.[When],
	case when @average = 1
		then round(avg(WeightsDaysBack.WeightInPounds), 1)
		else Weights.WeightInPounds
	end as WeightInPounds
from	Diet.Diet.Weights as Weights
	cross apply (
		select 0 as [Value]
		union all select 1 as [Value]
		union all select 2 as [Value]
		union all select 3 as [Value]
		union all select 4 as [Value]
		union all select 5 as [Value]
		union all select 6 as [Value]
	) as DaysBack
	inner join Diet.Diet.Weights as WeightsDaysBack
	on	WeightsDaysBack.UserId = Weights.UserId
	and	WeightsDaysBack.[When] = dateadd(day, -DaysBack.[Value], Weights.[When])
where	Weights.UserId = @userId
and	Weights.[When] >= convert(date, @startDate)
and	Weights.[When] < convert(date, @endDateExclusive)
group by Weights.[When],
	Weights.WeightInPounds
order by Weights.[When] asc;
go
