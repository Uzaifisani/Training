function fetchData(callback) {
  setTimeout(() => {
    const isSuccess = true;
    if (isSuccess) {
      const data = ["Uzaif", "Isani", "Nihal", "Mahek"];
      callback(null, data);
    } else {
      const error = new Error("Failed to fetch data from the server.");
      callback(error, null);
    }
  }, 2000);
}

fetchData((error, data) => {
  if (error) {
    console.error("Error:", error.message);
  } else {
    console.log("Fetched data:", data);
  }
});

//Output:
// condition 1
// isSuccess = false;
// Error: Failed to fetch data from the server.
// condition 2
// isSuccess = true;
// Fetched data: [ 'Uzaif', 'Isani', 'Nihal', 'Mahek' ]
