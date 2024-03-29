<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Aurelia Bakery</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />
        <link href="{{ mix('css/app.css')}}" rel="stylesheet"/>

        <!-- Styles -->
        <style>
            body {
                font-family: 'Nunito', sans-serif
            };
        </style>
    </head>
    <body class="antialiased">
        <div id="app">
            <router-view></router-view>
        </div>

        <script src="{{mix('js/app.js')}}" type="text/javascript">

        </script>
    </body>
</html>
