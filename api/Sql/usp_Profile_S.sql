use Diet;
go
if (object_id('Diet.usp_Profile_S') is not null)
	drop procedure Diet.usp_Profile_S;
go
create procedure Diet.usp_Profile_S
(
	@userId int
)
as
set nocount on;

/*
exec Diet.Diet.usp_Profile_S 1;
*/

select	GenderId,
	BodyTypeId,
	HeightInInches,
	BirthYear,
	TargetWeightInPounds
from	Diet.Diet.Users
where	Id = @userId;
go
