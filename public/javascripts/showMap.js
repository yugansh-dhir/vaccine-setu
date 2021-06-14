/* <script>
    mapboxgl.accessToken = "<%- process.env.MAPBOX_TOKEN %>";
    var map = new mapboxgl.Map({
      container: "map", // container ID
      style: "mapbox://styles/mapbox/streets-v11", // style URL
      center: [79, 25], // starting position [lng, lat]
      zoom: 4, // starting zoom
    });
  </script> */



//   <div class="card-text text-right">
//           <p><%= center['lat'] %>, <%= center['long'] %></p>
//         </div>
//         <div id="map" style="width: 400px; height: 300px"></div>
//         <script>
//           mapboxgl.accessToken = "<%- process.env.MAPBOX_TOKEN %>";
//           var lat = "<%= center['lat'] %>";
//           var long = "<%= center['long'] %>";
//           var map = new mapboxgl.Map({
//             container: "map", // container ID
//             style: "mapbox://styles/mapbox/streets-v11", // style URL
//             center: [long, lat], // starting position [lng, lat]
//             zoom: 8, // starting zoom
//           });
//         </script>