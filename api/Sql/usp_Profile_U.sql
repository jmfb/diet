use Diet;
go
if (object_id('Diet.usp_Profile_U') is not null)
	drop procedure Diet.usp_Profile_U;
go
create procedure Diet.usp_Profile_U
(
	@userId int,
	@genderId int,
	@bodyTypeId int,
	@heightInInches int,
	@birthYear int,
	@targetWeightInPounds int
)
as
set nocount on;

/*
begin tran;
exec Diet.Diet.usp_Profile_U 1, 1, 1, 60, 1979, 200;
rollback;
*/

update	Diet.Diet.Users
set	GenderId = @genderId,
	BodyTypeId = @bodyTypeId,
	HeightInInches = @heightInInches,
	BirthYear = @birthYear,
	TargetWeightInPounds = @targetWeightInPounds
where	Id = @userId;
go
