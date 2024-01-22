/* eslint-disable */

module.exports = async function () {
  // Put clean up logic here (e.g. stopping services, docker-compose, etc.).
  // Hint: `globalThis` is shared between setup and teardown.

  // Stop the process with the pid at globalThis.pid
  if (globalThis.pid) {
    console.log(`\nKILLING API SERVER: ${globalThis.pid}\n`)
    process.kill(globalThis.pid)
  }

  console.log(globalThis.__TEARDOWN_MESSAGE__)
}
