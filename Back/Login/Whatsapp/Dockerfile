# Build stage
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build

WORKDIR /app

COPY *.csproj ./
RUN dotnet restore

COPY . ./
RUN dotnet publish -c Release -o out

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:9.0

WORKDIR /app

COPY --from=build /app/out ./

# Si necesitas .env en el contenedor:
COPY .env ./

EXPOSE 4002

ENTRYPOINT ["dotnet", "Whatsapp.dll"]

