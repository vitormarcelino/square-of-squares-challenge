# Square of Squares - Challenge
**Version:** `2.0`

[**Challenge description**](https://github.com/vitta-hiring/case-back-end/tree/master/challenges/2-SquareOfSquares)

**Author:** Vitor Marcelino

**Technologies Used:** Adonis Framework, NodeJs

## Running
```
cp docker.env .env
docker-compose up -d
```

## Live Demo
You can try a live demo [here](http://square-of-squares.vitormarcelino.com.br/dashboard)

## Requests
The insomnia-workspace.json file can be imported with all the requisitions for the api. Alternatively we have the requests in CURL:

### Create Territory (POST)
```
curl --request POST \
  --url http://square-of-squares.vitta.localhost/territories \
  --header 'content-type: application/json' \
  --data '{
  "name": "A",
  "start": { "x": 30, "y": 30 },
  "end": { "x": 40, "y": 40 }
}'
```

### Territory List (GET)
```
curl --request GET \
  --url http://square-of-squares.vitta.localhost/territories
```

### Territory Show (GET)
Optional parameter **withpainted** can be set to true
```
curl --request GET \
  --url http://square-of-squares.vitta.localhost/territories/1?withpainted=true
```

### Territory Delete (DELETE)
```
curl --request DELETE \
  --url http://square-of-squares.vitta.localhost/territories/2
```

### Squares Show by Position (GET)
```
curl --request GET \
  --url http://square-of-squares.vitta.localhost/squares/20/50
```

### Squares Paint by Position (PATCH)
```
curl --request PATCH \
  --url http://square-of-squares.vitta.localhost/squares/30/31/paint
```

## Dashboard
To access the dashboad access the url: http://square-of-squares.vitta.localhost/dashboard

Features in dashboard:

- Most Painted Area
- Most Proportional Painted Area
- Last 5 Painted Squares
- Last 5 Errors
- Total Area
- Total Painted Area
- Percentage Painted Area:

## Scaling 
To scaling our project, we need to run docker command with a --scale parameter, like a example:
```
docker-compose up --scale app=3 -d
```