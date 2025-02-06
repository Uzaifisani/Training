let memoryLeakArray = [];

function simulateMemoryLeak() {
  setInterval(() => {
    memoryLeakArray.push({ data: new Array(100000).fill("Memory Leak!") });
    console.log(`Current array length: ${memoryLeakArray.length}`);
  }, 100);
}

function cleanup() {
  memoryLeakArray = [];
  console.log("Memory cleaned up!");
}

simulateMemoryLeak();

setInterval(() => {
  cleanup();
}, 2000);

//Output:
// PS C:\Users\uzaif\OneDrive\Desktop\CompanyAssignment\Training\06Feb2025\AssignmentNo3> node .\memoryLeak.js
// Current array length: 1
// Current array length: 2
// Current array length: 3
// Current array length: 4
// Current array length: 5
// Current array length: 6
// Current array length: 7
// Current array length: 8
// Current array length: 9
// Current array length: 10
// Current array length: 11
// Current array length: 12
// Current array length: 13
// Current array length: 14
// Current array length: 15
// Current array length: 16
// Current array length: 17
// Current array length: 18
// Memory cleaned up!
// Current array length: 1
// Current array length: 2
// Current array length: 3
// Current array length: 4
// Current array length: 5
// Current array length: 6
// Current array length: 7
// Current array length: 8
// Current array length: 9
// Current array length: 10
// Current array length: 11
