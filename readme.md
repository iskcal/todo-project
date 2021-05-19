# Todo Application

A mini project for learning ASP.NET Core and React based on microservices.

## Backend

| Techniques | Description |
| ---------- | ----------- |
| ASP.NET Core | microservices |
| EntityFramework Core | ORM |

## Frontend

| Techniques | Description |
| ---------- | ----------- |
| React | Front framework |
| Chakra | UI components |
| react-icons | Icon components |
| react-query | Data querying framework |

## Requirements

+ [dotnet](https://dotnet.microsoft.com/)(5.0.201)
+ [sqlite](https://www.sqlite.org/)(3.35.3)
+ [nodeJs](https://nodejs.org/)(14.17.0)

## Steps

1. Clone the project

```bash
git clone https://github.com/iskcal/todo-project.git
```

2. Launch the backend project

```bash
cd ./server
dotnet restore
dotnet run
```

3. Launch the front project

```bash
cd ../client
npm install
npm start
```

## Application Interface

![Application Interface](https://github.com/iskcal/todo-project/blob/master/screen.PNG)