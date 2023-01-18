import Promise from 'bluebird';
import fetch, { Request, Headers, Response } from 'node-fetch';
import { host } from '../../config';

fetch.Promise = Promise;
Response.Promise = Promise;

function localUrl(url) {
  if (url.startsWith('//')) {
    return `https:${url}`;
  }

  if (url.startsWith('https')) {
    return url;
  }

  return `https://${host}${url}`;
}

function localFetch(url, options) {
  return fetch(localUrl(url), {...options, headers: {...options.headers, 'Authorization': 'Basic YWRtaW46c3VwZXJzZWNyZXQ='}});
}

export function noBasicAuthFetch(url, options) {
  return fetch(localUrl(url), options);
}

export { localFetch as default, Request, Headers, Response };
