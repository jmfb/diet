# Weight Tracking and Meal Planning Tool

## Local Machine Requirements

- IIS 10
- URL Rewrite 2.1
- SQL Server 2017 Developer Edition
- SSMS 18.1
- Visual Studio 2017
- Node v12.5.0
- NPM v6.9.0
- WinSCP

## Local Development Steps - Full Stack

- Install development version of SQL Server and SSMS and run all SQL scripts manually locally.
- Run `LocalIisSetup.ps1` from powershell to configure IIS (only need to run once).
- Build latest version of DietApi.sln to (this will build the /api endpoints).
- Run `npm install` and `npm run start` or `npm run build` to compile latest version of static website.
- Navigate to http://localdiet.directs.com to begin testing.

## Local Development Steps - Client Only

- Run `npm install` and `npm run start` or `npm run build` to compile the latest version of static website.
- Run `npm run proxy` to start a local node express server.
- Navigate to http://localhost:3000 to begin testing.
	- NOTE: `/api` calls will be routed to http://lightweight.azurewebsites.net/api` (live backend).
	- NOTE: This appears to be broken due to login redirection validation.

## Deployment Steps

### SQL

- Log in to the Azure console and manually deploys SQL schema and stored procedure changes.
	- NOTE: The SQL password for the DietApi user is changed manually before going to production.

### API and Web

- Run `build.cmd` passing in the SQL password, FTP password, and JWT secret.
- Test the cold website.
- Log in to the Azure console and swap the cold and hot instances.

### Web-only

- Run `build.cmd` passing in the FTP password.
- Test the cold website.
- Log in to the Azure console and swap the cold and hot instances.
