export async function get() {
  return {
    body: {
      "process.env": process.env,
      "import.meta.env": import.meta.env
    } 
  }
}