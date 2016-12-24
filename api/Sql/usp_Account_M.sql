use Diet;
go
if (object_id('Diet.usp_Account_M') is not null)
	drop procedure Diet.usp_Account_M;
go
create procedure Diet.usp_Account_M
(
	@account varchar(100),
	@name varchar(30)
)
as
set nocount on;

/*
begin tran;
exec Diet.Diet.usp_Account_M 'foo', 'Foo Bar';
rollback;
*/

declare @id int = (
	select	Id
	from	Diet.Diet.Users
	where	Account = @account);
if (@id is null)
  begin
	set @id = next value for Diet.Diet.UserId;
	insert into Diet.Diet.Users (
		Id,
		Name,
		Account,
		GenderId,
		BodyTypeId,
		HeightInInches,
		BirthYear,
		TargetWeightInPounds
	) values (
		@id,
		@name,
		@account,
		null,
		null,
		null,
		null,
		null
	);
  end;
else
  begin
	update	Diet.Diet.Users
	set	Name = @name
	where	Account = @account
	and	Name <> @name;
  end;

select	Id = @id;
go
