 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a//dev/null b/markers.js
index 0000000000000000000000000000000000000000..f4c8d43f9be2b22884fce0c843a77f7b92cff1ad 100644
--- a//dev/null
+++ b/markers.js
@@ -0,0 +1,14 @@
+const markersData = [
+  {
+    name: "Central Park",
+    lat: 40.7829,
+    lng: -73.9654,
+    description: "A large public park in New York City."
+  },
+  {
+    name: "Eiffel Tower",
+    lat: 48.8584,
+    lng: 2.2945,
+    description: "Iconic Parisian landmark."
+  }
+];
 
EOF
)
