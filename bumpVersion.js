const { version } = require("./frontend/src/lib/version.json");
console.log("version", version);
console.log("Updating git commit ....: ");

const assert = require("assert");
const fs = require("fs");
const path = require("path");


const pathVersionFile = path.join(__dirname, "./frontend/src/lib/version.json");
let versionNumber = version;
const tmp = versionNumber.split(".");
tmp[2] = parseInt(tmp[2]) + 1;

versionNumber = `${tmp[0]}.${tmp[1]}.${tmp[2]}`;

fs.readFile(pathVersionFile, (err, buffer) => {
  assert.equal(err, null);

  const data = buffer.toString("utf-8");
  const updatedData = data.replace(/"version"\s*:.*/gim, `"version": "${versionNumber}"`);

  fs.writeFile(pathVersionFile, updatedData, (err) => {
    assert.equal(err, null);
    console.log(`Updating git commit done: ${versionNumber}`);
  });
});

// // Get the current commit date
// let gitCommitDate = ""
// const execGitDate = spawn("git", [
//   "show",
//   "--date=local",
//   "--no-patch",
//   "--no-notes",
//   "--pretty='%cd'",
//   "HEAD"
// ])
// execGitDate.stdout.on("data", chunk => {
//   try {
//     gitCommitDate = chunk.toString("utf-8")
//     gitCommitDate.substring(1, 16)

//     // Update git date
//     fs.readFile(pathVersionFile, (err, buffer) => {
//       assert.equal(err, null)

//       const data = buffer.toString("utf-8")
//       const updatedData = data.replace(
//         /MET_SERVICES_SELF_LASTCHANGEDATE=.*/gm,
//         `MET_SERVICES_SELF_LASTCHANGEDATE=${gitCommitDate}`
//       )

//       fs.writeFile(pathVersionFile, updatedData, err => {
//         assert.equal(err, null)
//         console.log(`Updating git commit date done: 👍🆗 ${gitCommitDate}`)
//       })
//     })
//   } catch (error) {
//     console.error(error)
//   }
// })
