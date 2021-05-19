FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /web

# copy the files and restore the package
COPY *.csproj .
RUN dotnet restore

# copy other files and build the web
COPY . .
RUN dotnet publish -c release -o /TodoAPI --no-restore

# move build files into new image
FROM mcr.microsoft.com/dotnet/aspnet:5.0
WORKDIR /Server
COPY --from=build /TodoAPI ./

# add sqlite database
RUN apt-get -y update
RUN apt-get -y upgrade
RUN apt-get install -y sqlite3 libsqlite3-dev

# start the web api project
ENTRYPOINT ["dotnet", "TodoApi.dll"]
