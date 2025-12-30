// // 这里的js通过minify后直接给到index.astro

// /// 按需加载地图
// let isLoaded = false;
// let scriptElement = null;

// function loadScript() {
//   if (!isLoaded && window.innerWidth > 768) {
//     scriptElement = document.createElement("script");
//     scriptElement.src = "https://webapi.amap.com/maps?v=1.4.15";
//     document.head.appendChild(scriptElement);
//     scriptElement.onload = function () {
//       const element = document.querySelector(".map");
//       element.style.display = "block";
//       var map = new AMap.Map("map-container", {
//         center: [116.397428, 39.90923],
//         zoom: 10,
//       });
//     };
//     isLoaded = true;
//     return;
//   }

//   if (isLoaded) {
//     if (window.innerWidth <= 768) {
//       const element = document.querySelector(".map");
//       element.style.display = "none";
//     } else {
//       const element = document.querySelector(".map");
//       element.style.display = "block";
//     }
//   }
// }

// // 初始检查
// loadScript();

// // 监听窗口大小变化
// window.addEventListener("resize", loadScript);




