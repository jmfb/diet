use Diet;
go
create sequence Diet.UserId as int start with 1 increment by 1;
go
create sequence Diet.ItemId as int start with 1 increment by 1;
go
create sequence Diet.WeightId as int start with 1 increment by 1;
go
create sequence Diet.PlanId as int start with 1 increment by 1;
go
create table Diet.Users
(
	Id int not null,
	Name varchar(30) not null,
	Account varchar(100) not null,
	GenderId int null,
	BodyTypeId int null,
	HeightInInches int null,
	BirthYear int null,
	TargetWeightInPounds int null,	
	constraint PK_Diet_Users_Id primary key clustered (Id)
);
go
create unique index U_Diet_Users_Account on Diet.Users (Account);
go
create table Diet.Items
(
	Id int not null,
	UserId int not null,
	Name varchar(30) not null,
	UnitSize float not null,
	UnitMeasure varchar(30) not null,
	SiteUrl varchar(max) not null,
	constraint PK_Diet_Items_Id primary key clustered (Id),
	constraint FK_Diet_Items_UserId foreign key (UserId) references Diet.Users (Id)
);
go
create unique index U_Diet_Items_UserId_Name on Diet.Items (UserId, Name);
go
create table Diet.Foods
(
	Id int not null,
	Protein float not null,
	Fat float not null,
	Carbohydrates float not null,
	constraint PK_Diet_Foods_Id primary key clustered (Id),
	constraint FK_Diet_Foods_Id foreign key (Id) references Diet.Items (Id)
);
go
create table Diet.Ingredients
(
	RecipeId int not null,
	IngredientId int not null,
	Quantity float not null,
	constraint PK_Diet_Ingredients_RecipeId_IngredientId primary key clustered (RecipeId, IngredientId),
	constraint FK_Diet_Ingredients_RecipeId foreign key (RecipeId) references Diet.Items (Id),
	constraint FK_Diet_Ingredients_IngredientId foreign key (IngredientId) references Diet.Items (Id)
);
go
create table Diet.Plans
(
	Id int not null,
	UserId int not null,
	Name varchar(30) not null,
	TargetProtein float not null,
	TargetFat float not null,
	TargetCarbohydrates float not null,
	constraint PK_Diet_Plans_Id primary key clustered (Id),
	constraint FK_Diet_Plans_UserId foreign key (UserId) references Diet.Users (Id)
);
go
create unique index U_Diet_Plans_UserId_Name on Diet.Plans (UserId, Name);
go
create table Diet.Meals
(
	PlanId int not null,
	ItemId int not null,
	Quantity float not null,
	constraint PK_Diet_Meals_PlanId_ItemId primary key clustered (PlanId, ItemId),
	constraint FK_Diet_Meals_PlanId foreign key (PlanId) references Diet.Plans (Id),
	constraint FK_Diet_Meals_ItemId foreign key (ItemId) references Diet.Items (Id)
);
go
create table Diet.Weights
(
	Id int not null,
	UserId int not null,
	[When] date not null,
	WeightInPounds float not null,
	constraint PK_Diet_Weights_Id primary key clustered (Id),
	constraint FK_Diet_Weights_UserId foreign key (UserId) references Diet.Users (Id)
);
go
create unique index U_Diet_Weights_UserId_When on Diet.Weights (UserId, [When]);
go
