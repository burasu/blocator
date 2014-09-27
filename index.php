<!DOCTYPE html>
<html lang="en" class="no-js">
<head>
	<meta charset="UTF-8">

	<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />

	<title>bLocator - a simple position locator</title>

	<link rel="stylesheet" href="css/normalize.css">
	<link rel="stylesheet" href="css/style.css">
    <script src="js/modernizr.js"></script>
</head>
<body>

    <section id="baenne-map">
        <div id="map-container"></div>
        <div id="baenne-zoom-in"></div>
        <div id="baenne-zoom-out"></div>
    </section>

    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <script src="https://maps.googleapis.com/maps/api/js?v=3.exp"></script>
    <script src="js/blocator.js"></script>

    <script>
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

        ga('create', 'UA-782583-9', 'auto');
        ga('send', 'pageview');

    </script>

</body>
</html>