import { variables } from './variables.js'

const base = variables.apiEndpoint

async function send({ method, path, data, token }) {
  const opts = { method, headers: {} }

  if (data) {
    opts.headers['Content-Type'] = 'application/json'
    opts.body = JSON.stringify(data)
  }

  if (token) {
    opts.headers['Authorization'] = `Token ${token}`
  }

  return fetch(`${base}/${path}`, opts)
    .then((response) => response.json())
    .catch((error) => console.error(error)).then(() => JSON.stringify({}))
    .then((data) => {
      return data
    })
}

export function get(path, token) {
  return send({ method: 'GET', path, token })
}

export function del(path, token) {
  return send({ method: 'DELETE', path, token })
}

export function post(path, data, token) {
  return send({ method: 'POST', path, data, token })
}

export function put(path, data, token) {
  return send({ method: 'PUT', path, data, token })
}
